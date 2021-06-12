const path = require("path");
// 路径拼接 __dirname 当前文件路径  dir 传过来的路径
const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      components: resolve("./src/components"),
    },
  },
};
