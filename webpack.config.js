const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "dist/background/background": "./src/background/background.js",
    "dist/popup/dist": "./src/popup/index.js",
  },
  output: {
    path: __dirname,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require("sass"),
              fiber: require("fibers"),
              indentedSyntax: true, // optional
            },
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
                indentedSyntax: true, // optional
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public/icons", to: "dist/icons" },
        { from: "public/model", to: "dist/model" },
        { from: "public/popup", to: "dist/popup" },
        { from: "public/manifest.json", to: "dist/manifest.json" },
        {
          from: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
          to: "dist/lib/",
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public/popup1"),
    },
    compress: true,
    port: 9000,
  },
};
