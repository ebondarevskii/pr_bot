import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [
    basicSsl(),
    react(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 80,
    host: true,
    hmr: {
      clientPort: 80,
    },
    allowedHosts: [
      "mighty-hugely-boxer.ngrok-free.app",
      "splendid-glorious-boar.ngrok-free.app",
      "localhost",
    ],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
