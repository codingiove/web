const { resolve } = require("path");
console.log(__dirname);
module.exports = {
  // 打包文件入口
  entry: "./src/index.js",
  // 打包完成后放到哪个位置
  output: {
    // 打包的名称
    filename: "build.js",
    // 打包路径, __dirname 代表当前文件的目录绝对路径
    path: resolve(__dirname, "build"),
  },
  // loader 的配置
  module: {},
  // 插件配置
  // plugins: [],
  // 模式
  mode: "development",
};
