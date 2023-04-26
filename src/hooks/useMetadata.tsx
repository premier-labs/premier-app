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

export const IPFS_GATEWAY = CONFIG.ipfs_provider_url + "/ipfs/";
const IPFS_EXP = "ipfs://";

const normalizeIPFSUrl = (address: string) => {
  address = address.replace(IPFS_EXP, IPFS_GATEWAY);
  return address;
};

export const fetchMetadata = async (ipfsCID?: string) => {
  if (!ipfsCID) return undefined;

  const ipfsUrl = normalizeIPFSUrl(ipfsCID);

  const data = await (await fetch(ipfsUrl)).json();

  const metadata = data as DropMetadata;

  for (const version of metadata.versions) {
    version.texture = normalizeIPFSUrl(version.texture);
  }
  metadata.model = normalizeIPFSUrl(metadata.model);

  return metadata;
};

export default function useMetadata(ipfsCID?: string, options = { skip: false }) {
  const [isMetadataLoading, setLoading] = useState(true);
  const [isMetadataError, setError] = useState(false);
  const [isMetadataDone, setDone] = useState(false);
  const [metadataData, setData] = useState<DropMetadata>();

  const { data } = useQuery(["metadata", ipfsCID], { queryFn: () => fetchMetadata(ipfsCID) });

  useEffect(() => {
    (async function () {
      try {
        if (data != undefined) {
          setData(data);
          setLoading(false);
          setDone(true);
        }
      } catch (e) {
        console.log("Error: useMetadata: ", e);

        setLoading(false);
        setError(true);
        setDone(true);
      }
    })();
  }, [data]);

  return {
    isMetadataLoading,
    isMetadataDone,
    isMetadataError,
    metadataData,
  };
}
