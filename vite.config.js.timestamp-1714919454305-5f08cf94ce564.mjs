// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/codeplaces/chrome-plugins/myplugin/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/codeplaces/chrome-plugins/myplugin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/codeplaces/chrome-plugins/myplugin/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueDevTools from "file:///E:/codeplaces/chrome-plugins/myplugin/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import copy from "file:///E:/codeplaces/chrome-plugins/myplugin/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
var __vite_injected_original_import_meta_url = "file:///E:/codeplaces/chrome-plugins/myplugin/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    copy({
      targets: [
        { src: "src/manifest.json", dest: "dist" },
        { src: "src/scripts", dest: "dist" },
        { src: "src/assets/images", dest: "dist" }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    // host: '0.0.0.0',
    port: 5175
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: void 0,
        entryFileNames: "vue/[name].js",
        // 指定输出文件名格式
        chunkFileNames: "vue/[name].js",
        // 指定拆分后的文件名格式
        assetFileNames: "vue/[name].[ext]"
        // 指定资源文件名格式
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlcGxhY2VzXFxcXGNocm9tZS1wbHVnaW5zXFxcXG15cGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlcGxhY2VzXFxcXGNocm9tZS1wbHVnaW5zXFxcXG15cGx1Z2luXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlcGxhY2VzL2Nocm9tZS1wbHVnaW5zL215cGx1Z2luL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbmltcG9ydCBjb3B5IGZyb20gJ3JvbGx1cC1wbHVnaW4tY29weSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICBWdWVEZXZUb29scygpLFxuICAgIGNvcHkoe1xuICAgICAgdGFyZ2V0czogW1xuICAgICAgICB7c3JjOiAnc3JjL21hbmlmZXN0Lmpzb24nLCBkZXN0OiAnZGlzdCd9LFxuICAgICAgICB7c3JjOiAnc3JjL3NjcmlwdHMnLCBkZXN0OiAnZGlzdCd9LFxuICAgICAgICB7c3JjOiAnc3JjL2Fzc2V0cy9pbWFnZXMnLCBkZXN0OiAnZGlzdCd9LFxuICAgICAgXVxuICAgIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICAvLyBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogNTE3NSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB1bmRlZmluZWQsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAndnVlL1tuYW1lXS5qcycsIC8vIFx1NjMwN1x1NUI5QVx1OEY5M1x1NTFGQVx1NjU4N1x1NEVGNlx1NTQwRFx1NjgzQ1x1NUYwRlxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ3Z1ZS9bbmFtZV0uanMnLCAvLyBcdTYzMDdcdTVCOUFcdTYyQzZcdTUyMDZcdTU0MEVcdTc2ODRcdTY1ODdcdTRFRjZcdTU0MERcdTY4M0NcdTVGMEZcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICd2dWUvW25hbWVdLltleHRdJywgLy8gXHU2MzA3XHU1QjlBXHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHU1NDBEXHU2ODNDXHU1RjBGXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UyxTQUFTLGVBQWUsV0FBVztBQUU1VSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBRXhCLE9BQU8sVUFBVTtBQVB3SyxJQUFNLDJDQUEyQztBQVUxTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsUUFDUCxFQUFDLEtBQUsscUJBQXFCLE1BQU0sT0FBTTtBQUFBLFFBQ3ZDLEVBQUMsS0FBSyxlQUFlLE1BQU0sT0FBTTtBQUFBLFFBQ2pDLEVBQUMsS0FBSyxxQkFBcUIsTUFBTSxPQUFNO0FBQUEsTUFDekM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFFBQ2QsZ0JBQWdCO0FBQUE7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQTtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
