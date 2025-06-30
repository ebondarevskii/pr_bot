import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 80,
    host: true,
    hmr: {
      clientPort: 80,
    },
    allowedHosts: ['mighty-hugely-boxer.ngrok-free.app', 'localhost'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})