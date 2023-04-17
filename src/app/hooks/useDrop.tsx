import { CONFIG } from "@common/config";
import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Drop__factory, Store__factory } from "@premier-typechain";
import { Drop, DropMetadata } from "@premier-types";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Address, useContractEvent, useNetwork } from "wagmi";
import { useContractRead } from "wagmi";
import { useChain } from "./useChain";

export const IPFS_GATEWAY = CONFIG.ipfs_provider_url + "/ipfs/";
const IPFS_EXP = "ipfs://";

export const normalizeIPFSUrl = (address: string) => {
  address = address.replace(IPFS_EXP, IPFS_GATEWAY);
  return address;
};

export default function useDrop(dropId: number, options: { skip?: boolean }) {
  const { chainId } = useChain();

  const [isDropLoading, setLoading] = useState(true);
  const [isDropError, setError] = useState(false);
  const [isDropDone, setDone] = useState(false);
  const [dropData, setData] = useState<Drop>();

  const {
    data: dropContract,
    isError: isStoreDropError,
    isLoading: isStoreDropLoading,
    isSuccess: isStoreDropSucess,
    error: storeDropError,
  } = useContractRead({
    address: ChainIdToStoreContract[chainId] as Address,
    abi: Store__factory.abi,
    functionName: "drop",
    args: [BigNumber.from(dropId)],
  });

  const {
    data: _dropData,
    isError: isDropDataError,
    isLoading: isDropDataLoading,
    isSuccess: isDropDataSucess,
    error: dropDataError,
  } = useContractRead({
    address: dropContract,
    abi: Drop__factory.abi,
    functionName: "drop",
  });

  const isDropLoaded = isStoreDropSucess && isDropDataSucess && _dropData != undefined;

  useEffect(() => {
    (async function () {
      if (isDropLoaded) {
        try {
          const ipfsUrl = normalizeIPFSUrl(_dropData?.dropURI as string);

          const data = await (await fetch(ipfsUrl)).json();

          const metadata = data as DropMetadata;

          for (const version of metadata.versions) {
            version.texture = normalizeIPFSUrl(version.texture);
          }
          metadata.model = normalizeIPFSUrl(metadata.model);

          setData({
            address: _dropData?._contract as string,
            symbol: _dropData?.symbol as string,
            id: _dropData?.id.toNumber() as number,
            maxSupply: _dropData?.maxSupply.toNumber() as number,
            price: _dropData?.price.toString() as string,
            currentSupply: _dropData?.currentSupply.toNumber() as number,
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
      }
    })();
  }, [_dropData, isStoreDropError]);

  useContractEvent({
    address: dropContract as Address,
    abi: Drop__factory.abi,
    eventName: "Minted",

    listener(dripId) {
      if (dropData) {
        if (dripId >= BigNumber.from(dropData.currentSupply)) {
          setData({ ...dropData, currentSupply: dropData.currentSupply + 1 });
        }
      }
    },
  });

  return {
    isDropLoading,
    isDropDone,
    isDropError,
    dropData,
  };
}
