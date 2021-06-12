const { resolve } = require("path");
let htmlwebpackplugin = require("html-webpack-plugin");
let webpack = require("webpack");
module.exports = {
  entry: {
    commonA: "./src/commonA.js",
    commonB: "./src/commonB.js",
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    }),
    // 忽略 ./locale,因为它引入了很多语言包
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
  ],
  optimization: {
    splitChunks: {
      // async   异步导入
      // initial 同步导入
      // all     异步/同步导入
      chunks: "all",
      // 最小尺寸: 如果拆分出来一个, 那么拆分出来的这个包的大小最小为 minSize
      minSize: 20000,
      // 将大于 maxSize 的包, 拆分成不小于 minSize 的包
      maxSize: 20000,
      // minChunks 用了2次就抽离
      minChunks: 2,
      cacheGroups: {
        vendor: {
          priority: 1,
          test: /node_modules/, // 抽离第三方库
          chunks: "initial",
        },
      },
    },
  },
};
