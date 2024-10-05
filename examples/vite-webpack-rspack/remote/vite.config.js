import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const PORT = 4001;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      // Modules to expose
      exposes: {
        './Product': './src/Product.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],

  server: {
    proxy: {
      '/custom-prefix': {
        target: `http://localhost:${PORT}`,
        rewrite: (path) => path.replace(/^\/custom-prefix/, ''),
      },
    },
    port: PORT,
  },
  preview: {
    proxy: {
      '/custom-prefix': {
        target: `http://localhost:${PORT}`,
        rewrite: (path) => path.replace(/^\/custom-prefix/, ''),
      },
    },
    port: PORT,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  experimental: {
    renderBuiltUrl: (filename) => {
      return `http://localhost:4001/custom-prefix/${filename}`;
    },
  },
});
