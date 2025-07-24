import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [
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
    port: Number(process.env.VITE_PORT) || 3000,
    host: '0.0.0.0',
    hmr: {
      clientPort: Number(process.env.VITE_PORT) || 3000,
    },
    allowedHosts: ['*'],
  },
  preview: {
    port: Number(process.env.VITE_PORT) || 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable source maps to reduce memory usage
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') && !id.includes('router')) {
              return 'react-vendor';
            }
            if (id.includes('react-router-dom')) {
              return 'router-vendor';
            }
            if (
              id.includes('@privy-io/react-auth') ||
              id.includes('@tonconnect/ui-react') ||
              id.includes('permissionless') ||
              id.includes('viem')
            ) {
              return 'blockchain-vendor';
            }
            if (
              id.includes('@telegram-apps/bridge') ||
              id.includes('vaul') ||
              id.includes('@radix-ui') ||
              id.includes('clsx') ||
              id.includes('tailwind-merge') ||
              id.includes('class-variance-authority')
            ) {
              return 'ui-vendor';
            }
            if (
              id.includes('axios') ||
              id.includes('crypto-js')
            ) {
              return 'network-vendor';
            }
            if (id.includes('@ton/core')) {
              return 'ton-vendor';
            }
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name || '')) {
            return `assets/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
      onwarn(warning, warn) {
        if (warning.message && (
          warning.message.includes('/*#__PURE__*/') ||
          warning.message.includes('contains an annotation that Rollup cannot interpret')
        )) {
          return;
        }
        warn(warning);
      },
    },
  },
});
