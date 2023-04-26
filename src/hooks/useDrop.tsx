import { CONFIG } from "@common/config";
import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Drop__factory, Store__factory } from "@premier-typechain";
import { Drop, DropMetadata } from "@premier-types";
import { readContract, watchContractEvent } from "@wagmi/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Address, useContractEvent, useNetwork } from "wagmi";
import { useContractRead } from "wagmi";
import { useChain } from "./useChain";
import { fetchMetadata } from "./utils";

export default function useDrop(dropId: number, options = { skip: false }) {
  const [isDropLoading, setLoading] = useState(true);
  const [isDropError, setError] = useState(false);
  const [isDropDone, setDone] = useState(false);
  const [dropData, setData] = useState<Drop>();

  const { chainId } = useChain();

  useEffect(() => {
    (async function () {
      try {
        if (options.skip) return;

        if (isNaN(dropId)) {
          throw "Incorrect DropId";
        }

        const storeContract = ChainIdToStoreContract[chainId] as Address;

        const dropInfo = await readContract({
          address: storeContract,
          abi: Store__factory.abi,
          functionName: "dropInfo",
          args: [BigNumber.from(dropId)],
        });

        const metadata = await fetchMetadata(dropInfo.dropURI);

        //
        // Setup event listeners
        //
        watchContractEvent(
          {
            address: storeContract,
            abi: Store__factory.abi,
            eventName: "Minted",
          },
          (dripId) => {
            if (dropData) {
              if (dripId >= BigNumber.from(dropData.currentSupply)) {
                setData({ ...dropData, currentSupply: dropData.currentSupply + 1 });
              }
            }
          }
        );

        setData({
          address: dropInfo._contract as string,
          symbol: dropInfo.symbol as string,
          id: dropInfo.id.toNumber() as number,
          maxSupply: dropInfo.maxSupply.toNumber() as number,
          price: dropInfo.price.toString() as string,
          currentSupply: dropInfo.currentSupply.toNumber() as number,
          metadata: metadata,
        });

        setLoading(false);
        setError(false);
        setDone(true);
      } catch (e) {
        console.log("Error: useDrop: ", e);

        setLoading(false);
        setError(true);
        setDone(true);
      }
    })();
  }, []);

  return {
    isDropLoading,
    isDropDone,
    isDropError,
    dropData,
  };
}
