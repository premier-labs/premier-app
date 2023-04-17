import { isDevelopment, isProduction, isStaging } from "@common/config";
import { goerli, localhost, mainnet } from "@wagmi/chains";
import { useNetwork } from "wagmi";

export function useChain() {
  const { chain } = useNetwork();
  const chainId = chain?.id as number;

  if (chainId === undefined) {
    if (isDevelopment) return { chainId: localhost.id };
    if (isStaging) return { chainId: goerli.id };
    if (isProduction) return { chainId: mainnet.id };
    else return { chainId: -1 };
  }
  return { chainId };
}
