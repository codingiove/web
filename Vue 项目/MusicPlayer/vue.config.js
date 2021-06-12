module.exports = {
  publicPath: "./",
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      "element-ui": "ELEMENT",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxSize: 20000,
        minChunks: 2,
        cacheGroups: {
          vendor: {
            test: /node_modules/, // 抽离第三方库
            chunks: "all",
          },
        },
      },
    },
    devServer: {
      proxy: {
        "/api": {
          target: "https://autumnfish.cn",
          pathRewrite: { "^/api": "" },
        },
      },
    },
    mode: "production",
    devtool: "hidden-source-map",
  },
};
