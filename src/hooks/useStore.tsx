import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Address } from "wagmi";
import { useChain } from "./useChain";

export function useStore() {
  const { chainId } = useChain();

  return { storeContract: ChainIdToStoreContract[chainId] as Address };
}
