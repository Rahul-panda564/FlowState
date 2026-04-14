import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isVercel = process.env.VERCEL === '1';

// https://vite.dev/config/
export default defineConfig({
  base: isVercel ? '/' : '/FlowState/',
  plugins: [react()],
  build: {
    outDir: isVercel ? 'dist' : '../',
    emptyOutDir: false,
    minify: false,
    cssMinify: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-chunk.js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
