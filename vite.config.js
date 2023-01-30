import path from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { createVuePlugin } from "vite-plugin-vue2";
import commonjs from "@rollup/plugin-commonjs";
export default defineConfig({
  root: ".",
  build: {
    chunkSizeWarningLimit: 1600,
    assetsDir: "popup/",
    outDir: "dist",
    // minify: true,
    modulePreload: false,
    rollupOptions: {
      input: {
        popup: path.join(__dirname, "/src/popup/index.js"),
        background: path.join(__dirname, "/src/background/background.js"),
        option: path.join(__dirname, "/src/option/index.js")
      },
      output: {
        entryFileNames: "[name]/[name].js",
        assetFileNames: "lib/[name].css",
        chunkFileNames: "lib/[name].js",
        esModule: false,
        inlineDynamicImports: false,
      },
      plugins: [commonjs()],
    },
    emptyOutDir: true,
  },
  plugins: [
    createVuePlugin(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
          dest: "lib/",
        },
      ],
    }),
  ],
});
