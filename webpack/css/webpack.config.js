const { resolve } = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },

  module: {
    // 规则
    rules: [
      // loader 的顺序是 从右向左执行 从下到上执行
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // plugins: [],
  mode: "development",
};
