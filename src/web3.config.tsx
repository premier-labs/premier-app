import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { mainnet, goerli, localhost } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { CONFIG, isDevelopment, isProduction, isStaging } from "@common/config";
import { QueryClient } from "react-query";

const chain = isProduction ? mainnet : isStaging ? goerli : localhost;

const providers = isDevelopment
  ? [
      jsonRpcProvider({
        rpc: () => ({
          http: "http://192.168.2.1:8545",
        }),
      }),
    ]
  : [
      publicProvider({ priority: 0 }),
      alchemyProvider({ apiKey: CONFIG.web3_provider_apiKey, priority: 1 }),
    ];

const { chains, provider } = configureChains([chain], providers as any);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient();

export { queryClient, wagmiClient, chains };
