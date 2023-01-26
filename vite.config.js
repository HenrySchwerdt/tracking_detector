const path = require("path");
const { defineConfig } = require("vite");
const { viteStaticCopy } = require("vite-plugin-static-copy");
const { createVuePlugin } = require("vite-plugin-vue2");
import commonjs from "@rollup/plugin-commonjs";
import { viteSingleFile } from "vite-plugin-singlefile"
export default defineConfig({
  root: ".",
  build: {
    assetsDir: "popup/",
    outDir: "dist",
    minify: true,
    modulePreload: false,
    rollupOptions: {
      input: {
        popup: path.join(__dirname, "/src/popup/index.js"),
        background: path.join(__dirname, "/src/background/background.js"),
      },
      output: {
        entryFileNames: "[name]/[name].js",
        assetFileNames: "popup/index.css",
        chunkFileNames: "popup/[name].js",
        esModule: false,
        inlineDynamicImports: false,

      },

      plugins: [commonjs()],
    },

    emptyOutDir: false,
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
