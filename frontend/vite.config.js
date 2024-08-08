import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    global: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js', // assuming the test folder is in the root of our project
  },
  alias: {
    '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
  }
});
