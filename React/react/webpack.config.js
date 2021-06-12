const { resolve } = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        // css-loader?modules,为 CSS 开启模块化
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
};
