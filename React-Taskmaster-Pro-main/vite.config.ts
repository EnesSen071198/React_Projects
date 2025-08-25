import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', 'date-fns'],
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'date-fns', 
      '@dnd-kit/core', 
      '@dnd-kit/sortable', 
      '@dnd-kit/utilities',
      'prop-types',
      'react-is',
      '@mui/material',
      '@mui/system',
      '@mui/icons-material',
      '@mui/x-date-pickers',
      'chart.js',
      'react-chartjs-2',
    ],
    force: true,
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
});