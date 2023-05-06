import { CONFIG } from "@common/config";
import { NFTsByCollection } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { useQuery } from "react-query";
import { Address } from "wagmi";

export default function useNfts(
  address: string | Address | undefined,
  options = { enabled: true }
) {
  const queryKey = `nfts_${address}`;

  const {
    isLoading: isNftsLoading,
    error: isNftsError,
    data: nfts,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      axios.get(CONFIG.server_url + `/nfts?address=${address}`).then((res) => res.data),
    enabled: options.enabled && address !== undefined,
    staleTime: Infinity,
    retry: false,
  });

  return {
    isNftsLoading,
    isNftsError,
    nfts: nfts as NFTsByCollection,
  };
}
