// 不使用 redux-thunk
// import { createStore } from "redux";
// import Redux from "./Redux";
// const Store = createStore(Redux);
// export default Store;

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Redux from "./Redux";

const Store = createStore(Redux, applyMiddleware(thunk));
export default Store;
