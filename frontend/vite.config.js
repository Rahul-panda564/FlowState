import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isVercel = process.env.VERCEL === '1';

// https://vite.dev/config/
export default defineConfig({
  base: '/FlowState/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    cssMinify: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name]-chunk.[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  }
})
