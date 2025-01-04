import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'test-salfa', //NOTE: для публикации на gh pages
  plugins: [react()],
})
