import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    copy({
      targets: [
        {src: 'src/manifest.json', dest: 'dist'},
        {src: 'src/scripts', dest: 'dist'},
        {src: 'src/assets/images', dest: 'dist'},
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    // host: '0.0.0.0',
    port: 5175,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'vue/[name].js', // 指定输出文件名格式
        chunkFileNames: 'vue/[name].js', // 指定拆分后的文件名格式
        assetFileNames: 'vue/[name].[ext]', // 指定资源文件名格式
      }
    }
  }
})
