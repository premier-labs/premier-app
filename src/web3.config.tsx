import { CONFIG, isProduction, isStaging } from "@common/config";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { QueryClient } from "react-query";
import { configureChains, createClient } from "wagmi";
import { localhost, mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const providers = [publicProvider({ priority: 0 })];
const { chains, provider } = configureChains([CONFIG.chain], providers as any);

const { connectors } = getDefaultWallets({
  appName: "premierstudio.xyz",
  projectId: "xxx",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export { queryClient, wagmiClient, chains };
