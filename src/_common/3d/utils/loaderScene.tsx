import { ThemeProvider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";

const LoaderScene: FC = ({ children }) => {
  const theme = useTheme();

  const mq_md = useMediaQuery(theme.breakpoints.down("md"));
  if (mq_md) {
    console.log("Mobile in canvas");
  }

  return (
    <div
      style={{
        height: mq_md ? "calc(100% - 100px)" : "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false }}
        dpr={Math.max(window.devicePixelRatio, 2)}
        flat={true}
        linear={true}
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        <Preload all />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Canvas>
    </div>
  );
};

export default LoaderScene;
