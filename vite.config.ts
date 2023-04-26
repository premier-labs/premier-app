import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgr()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@premier-contracts",
        replacement: fileURLToPath(
          new URL("./node_modules/@premier-labs/contracts/dist/contracts", import.meta.url)
        ),
      },
      {
        find: "@premier-typechain",
        replacement: fileURLToPath(
          new URL("./node_modules/@premier-labs/contracts/dist/typechain", import.meta.url)
        ),
      },
      {
        find: "@premier-types",
        replacement: fileURLToPath(
          new URL("./node_modules/@premier-labs/contracts/dist/types", import.meta.url)
        ),
      },
      {
        find: "@premier-mock",
        replacement: fileURLToPath(
          new URL("./node_modules/@premier-labs/contracts/dist/mock", import.meta.url)
        ),
      },
      {
        find: "@premier-system",
        replacement: fileURLToPath(
          new URL("./node_modules/@premier-labs/contracts/dist/system", import.meta.url)
        ),
      },
    ],
  },
});
