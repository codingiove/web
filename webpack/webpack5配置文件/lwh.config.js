const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    // 必须是一个绝对路径
    // 在 webpack.config.js 目录下创建一个 build 文件夹
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          // 添加浏览器前缀
          {
            loader: "postcss-loader",
            options: { 
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
        ],
        /* 
        loader:"css-loader"  简写
                ↑
        use: ["css-loader"]  简写
                ↑
        use: [{ loader: "css-loader" }]  完整写法
       */
      },
    ],
  },
};
