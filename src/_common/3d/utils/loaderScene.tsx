import { ThemeProvider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";

const LoaderScene: FC = ({ children }) => {
  const theme = useTheme();

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
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
