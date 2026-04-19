import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['pdfjs-dist'],
    exclude: ['iceberg-js'],
  },
  build: {
    rollupOptions: {
      external: ['iceberg-js'],
    },
    chunkSizeWarningLimit: 1000,
  },
})
