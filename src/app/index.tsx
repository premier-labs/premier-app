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
import { CONFIG } from "@common/config";

const { chains, provider } = configureChains(
  [localhost, mainnet, goerli],
  [alchemyProvider({ apiKey: CONFIG.network.web3_provider_url }), publicProvider()]
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
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={lightTheme({ accentColor: "black" })}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
};

const App: FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(init());
    // dispatch(login());
  }, []);

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
