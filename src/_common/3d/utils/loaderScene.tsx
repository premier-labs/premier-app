import { ThemeProvider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { FC } from "react";

const LoaderScene: FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <Canvas
      gl={{ antialias: false }}
      dpr={Math.max(window.devicePixelRatio, 2)}
      flat
      linear
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <Preload all />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Canvas>
  );
};

export default LoaderScene;
