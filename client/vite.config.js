import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': 'http://localhost:8000',
      },
    },
    define: {},
  }
})
