import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@m3': resolve(__dirname, '..', 'src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
