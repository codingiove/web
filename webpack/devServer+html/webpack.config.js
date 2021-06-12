const { resolve } = require("path");
let htmlwebpackplugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },
  module: {},
  plugins: [
    new htmlwebpackplugin({
      template: "./src/index.html", // 使用自己的模板
      filename: "index.html", // 模板名字
      minify: {
        // 进行压缩
        removeAttributeQuotes: true, // 去掉 ""
        collapseWhitespace: true, // 一行显示
      },
    }),
  ],
  devServer: {
    // 打包后的目录
    contentBase: "./build",
    // 启动 gzip压缩
    compress: true,
    // 端口
    port: 3000,
    // 打开浏览器
    open: true,
  },
  mode: "development",
};
