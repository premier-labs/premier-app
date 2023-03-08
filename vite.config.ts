import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: { port: 3000 },
  resolve: {
    alias: [
      {
        find: "@premier-labs/typechain",
        replacement: fileURLToPath(
          new URL("./node_modules/@premier-labs/contracts/dist/typechain", import.meta.url)
        ),
      },
      {
        find: "@premier-labs/types",
        replacement: fileURLToPath(
          new URL("./node_modules/@premier-labs/contracts/dist/types", import.meta.url)
        ),
      },
      {
        find: "@premier-labs/mock",
        replacement: fileURLToPath(
          new URL("./node_modules/@premier-labs/contracts/dist/mock", import.meta.url)
        ),
      },
      {
        find: "@premier-labs/system",
        replacement: fileURLToPath(
          new URL("./node_modules/@premier-labs/contracts/dist/system", import.meta.url)
        ),
      },
    ],
  },
});
