const { resolve } = require("path");
let htmlwebpackplugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },

  plugins: [
    new htmlwebpackplugin({
      template: "./index.html",
    }),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },

  externals: {
    // key 包名
    // value 这个库暴露出来的全局变量
    lodash: "_",
    dayjs: "dayjs",
  },
};
