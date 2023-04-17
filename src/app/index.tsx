import React, { FC, useEffect } from "react";

import Navbar from "./navbar";

import { store } from "./store";

import { Provider } from "react-redux";
import { useDispatch } from "./store/hooks";

import { Route, Routes } from "react-router-dom";

import DropRoutes from "./routes/drop";
import Style from "./style";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli, localhost } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CONFIG, isDevelopment, isProduction, isStaging } from "@common/config";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const chain = isProduction ? mainnet : isStaging ? goerli : localhost;

const { chains, provider } = configureChains(
  [chain],
  [alchemyProvider({ apiKey: CONFIG.web3_provider_apiKey }), publicProvider()]
);

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

const AppWrapper: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={lightTheme({ accentColor: "black" })}>
            <App />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </Provider>
  );
};

const App: FC = ({ children }) => {
  return (
    <Style.RootApp>
      <Navbar />

      <Routes>
        <Route path="/drop/*" element={<DropRoutes />} />
      </Routes>
    </Style.RootApp>
  );
};

export default AppWrapper;
