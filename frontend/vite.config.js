import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'http://localhost:5000', // Forward API requests to the backend server
    },
  },
  plugins: [react()],
})
