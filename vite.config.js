import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: process.env.PORT,
  },
  base: '/BookShelfApp/',
  plugins: [react()]
})
