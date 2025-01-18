import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0', // Ensure the server is accessible externally
    port: 5173,      // Optional: specify the port explicitly
    watch: {
      usePolling: true, // Use polling for file changes
      interval: 100,    // Adjust polling interval if needed
    }
  }
});