import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // SPA ke liye base path fix karna zaroori hai
  base: "/",
  build: {
    outDir: 'dist', // Yahi folder tumhara Render par deploy hota hai
  }
})