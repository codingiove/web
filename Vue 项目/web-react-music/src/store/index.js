import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
// 启动 Redux 调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// applyMiddleware 合并多个中间件
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
   