import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': '/src',
    },
  },
  
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/index.css";`
      }
    },
    postcss : './postcss.config.js'
  }
})
