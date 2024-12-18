import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
declare global {
  interface Worker {}

  namespace WebAssembly {
    interface Module {}
  }
}
// https://vite.dev/config/
export default defineConfig({
  base:'/dvc-personality-preview-vue/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@pspe': fileURLToPath(new URL('./src/module/Personality-Sneak-Peek-Expanded', import.meta.url)),
    },
  },
})
