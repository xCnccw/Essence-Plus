import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
// import VueMacros from 'unplugin-vue-macros/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // VueMacros({
    //   defineOptions: true,
    //   defineProps: true,
    //   defineEmits: true,
    //   defineExpose: true,
    //   withDefaults: true,
    // }),
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
