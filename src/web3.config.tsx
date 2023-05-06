import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { mainnet, sepolia, localhost } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { CONFIG, isDevelopment, isProduction, isStaging } from "@common/config";
import { QueryClient } from "react-query";

const chain = isProduction ? mainnet : isStaging ? sepolia : localhost;

const providers = [publicProvider({ priority: 0 })];
const { chains, provider } = configureChains([chain], providers as any);

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
