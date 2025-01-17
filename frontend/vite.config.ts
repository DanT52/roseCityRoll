import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Tell Vite that the site will be served from /roseCityRoll/ on GitHub Pages
  base: '/roseCityRoll/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
