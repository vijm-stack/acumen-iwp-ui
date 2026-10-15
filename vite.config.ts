import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /acumen-iwp-ui/; local dev and other builds stay at /
  base: process.env.GITHUB_ACTIONS ? '/acumen-iwp-ui/' : '/',
})
