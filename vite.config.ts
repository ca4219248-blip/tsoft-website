import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The base path can be overridden (e.g. for GitHub Pages project sites where
// the app is served from /<repo>/). Defaults to root for local development.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
