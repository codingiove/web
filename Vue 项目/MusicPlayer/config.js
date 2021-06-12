module.exports = {
  mode: "production",
  context: "G:\\前端\\Vue 项目\\MusicPlayer",
  devtool: "source-map",
  output: {
    path: "G:\\前端\\Vue 项目\\MusicPlayer\\dist",
    filename: "js/[name].[contenthash:8].js",
    publicPath: "/",
    chunkFilename: "js/[name].[contenthash:8].js",
  },
  resolve: {
    alias: {
      "@": "G:\\前端\\Vue 项目\\MusicPlayer\\src",
      vue$: "vue/dist/vue.runtime.esm.js",
    },
    extensions: [".mjs", ".js", ".jsx", ".vue", ".json", ".wasm"],
    modules: [
      "node_modules",
      "G:\\前端\\Vue 项目\\MusicPlayer\\node_modules",
      "G:\\前端\\Vue 项目\\MusicPlayer\\node_modules\\@vue\\cli-service\\node_modules",
    ],
    plugins: [[Object]],
  },
  resolveLoader: {
    modules: [
      "G:\\前端\\Vue 项目\\MusicPlayer\\node_modules\\@vue\\cli-plugin-babel\\node_modules",
      "node_modules",
      "G:\\前端\\Vue 项目\\MusicPlayer\\node_modules",
      "G:\\前端\\Vue 项目\\MusicPlayer\\node_modules\\@vue\\cli-service\\node_modules",
    ],
    plugins: [[Object]],
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
    ],
  },
  optimization: {
    splitChunks: { cacheGroups: [Object] },
    minimizer: [[TerserPlugin]],
  },

  entry: { app: ["./src/main.js"] },
};
