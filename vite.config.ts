import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [svelte()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `extension.js`,
        chunkFileNames: `extension.js`,
        assetFileNames: `[name].[ext]`,
      }
    }
  }
})
