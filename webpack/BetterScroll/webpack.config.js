const { resolve } = require("path");
module.exports = {
  entry: "./index.js",
  mode:"production",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "build"),
  },
};
