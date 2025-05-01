import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outputDir: 'dist/types',
      include: ['src'],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'EssencePlus',
      fileName: (format) => `essence-plus.${format}.js`,
    },
    cssCodeSplit: false, // ✅ 所有 CSS 打包进一个文件
    rollupOptions: {
      // ✅ 只保留 vue 为外部依赖，其它都打包进来
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
