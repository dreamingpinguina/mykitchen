import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' is set to './' to ensure assets load correctly on GitHub Pages
  // regardless of whether it's at the root or in a subdirectory.
  base: './',
})