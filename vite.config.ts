import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/apps': {
        target: 'http://localhost:40398',
        changeOrigin: true
      }
    }
  }
})
