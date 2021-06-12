import React, { memo, Suspense } from "react";
import { HashRouter } from "react-router-dom"; // 路由模式
import { renderRoutes } from "react-router-config"; // 路由插件
import { Provider } from "react-redux"; // 共享 store
import store from "./store/index.js"; // 导入 store

import routes from "./router/index.js";
import Header from "./components/app-header/index.js";
import Footer from "./components/app-footer/index.js";
import Player from "./pages/Player/app-player-bar/index.js";
// <Suspense fallback={}> 路由懒加载要设置的

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Header />
        <Suspense fallback={<div>正在加载中</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <Player />
        <Footer />
      </HashRouter>
    </Provider>
  );
});
