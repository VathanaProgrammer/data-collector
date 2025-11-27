import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '127.0.0.1', // bind to 127.0.0.1
    port: 5000,        // use port 5000
    strictPort: true,  // fail if port is busy
    cors: true,        // allow CORS if needed
  },
})
