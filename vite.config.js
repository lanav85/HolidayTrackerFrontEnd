import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()], 
define: {
  global: {},
},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'img': path.resolve(__dirname, 'public/img'),
      'css': path.resolve(__dirname, 'src/css'),
    },
  },
  server: {
  proxy: {
    '/api': {
      target: 'http://holidaytracker-public-env.eba-nzhgperb.us-east-1.elasticbeanstalk.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
},
});
