import Announcement from "@app/components/announcement";
import FooterComponent from "@app/components/footer";
import Navbar from "@app/components/navbar";
import DropRoutes from "@app/routes/drop";
import { chains, queryClient, wagmiClient } from "@app/web3.config";
import { theme } from "@common/theme";
import { Grid, ThemeProvider, useTheme } from "@mui/material";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import React, { FC } from "react";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import Box from "./_common/components/box";
import "./index.css";
import { createRoot } from "react-dom/client";
import ErrorComponent from "./components/error";

import { register } from "swiper/element/bundle";
register();

const App: FC = () => {
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Announcement />
        <Navbar />

        <Routes>
          <Route path="/drop/*" element={<DropRoutes />} />
          <Route path="/" element={<></>} />
        </Routes>

        <FooterComponent />
      </Box>

      {/* TODO, temporary while working on mobile version */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <ErrorComponent
          text={
            "We are currently working on the mobile version of our app. Please use your computer in the meantime."
          }
        />
      </Box>
    </>
  );
};

const Index: FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains} theme={lightTheme({ accentColor: "black" })}>
                <App />
              </RainbowKitProvider>
            </WagmiConfig>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Index />);
