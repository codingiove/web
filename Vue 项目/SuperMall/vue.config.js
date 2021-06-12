// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = {
  publicPath: "./",
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
        content: "components/content",
        common: "components/common",
        assets: "@/assets",
        network: "@/network",
        views: "@/views"
      }
    }
    // plugins: [new BundleAnalyzerPlugin()]
  }
};
