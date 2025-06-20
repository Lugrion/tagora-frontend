import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Spring Boot backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'), //Set the api version
      },
    },
  },
})
