var _a;
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// The base path can be overridden (e.g. for GitHub Pages project sites where
// the app is served from /<repo>/). Defaults to root for local development.
export default defineConfig({
    base: (_a = process.env.VITE_BASE) !== null && _a !== void 0 ? _a : '/',
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
