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

export default function useDrop(dropId: number, options: { skip?: boolean }) {
  const [isDropLoading, setLoading] = useState(true);
  const [isDropError, setError] = useState(false);
  const [isDropDone, setDone] = useState(false);
  const [dropData, setData] = useState<Drop>();

  const { chainId } = useChain();

  useEffect(() => {
    if (options.skip) return;

    (async function () {
      try {
        const dropContract = await readContract({
          address: ChainIdToStoreContract[chainId] as Address,
          abi: Store__factory.abi,
          functionName: "drop",
          args: [BigNumber.from(dropId)],
        });

        const _dropData = await readContract({
          address: dropContract,
          abi: Drop__factory.abi,
          functionName: "drop",
        });

        const metadata = await fetchMetadata(_dropData.dropURI);

        //
        // Setup event listeners
        //
        watchContractEvent(
          {
            address: dropContract,
            abi: Drop__factory.abi,
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
          address: _dropData._contract as string,
          symbol: _dropData.symbol as string,
          id: _dropData.id.toNumber() as number,
          maxSupply: _dropData.maxSupply.toNumber() as number,
          price: _dropData.price.toString() as string,
          currentSupply: _dropData.currentSupply.toNumber() as number,
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
