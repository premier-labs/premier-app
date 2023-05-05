import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { mainnet, sepolia, localhost } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { CONFIG, isDevelopment, isProduction, isStaging } from "@common/config";
import { QueryClient } from "react-query";

const chain = isProduction ? mainnet : isStaging ? sepolia : localhost;

const providers = isDevelopment
  ? [
      jsonRpcProvider({
        rpc: () => ({
          http: "http://localhost:8545",
        }),
      }),
    ]
  : [
      publicProvider({ priority: 0 }),
      alchemyProvider({ apiKey: CONFIG.web3_provider_apiKey, priority: 1 }),
    ];

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
