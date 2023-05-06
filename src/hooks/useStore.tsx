import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Address } from "wagmi";
import { CONFIG } from "@app/_common/config";

export function useStore() {
  return { storeContract: ChainIdToStoreContract[CONFIG.chain.id] as Address };
}
