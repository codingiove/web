// node 中使用
let redux = require("redux"); // 导入 redux

// reducer
const InitState = {
  counter: 0,
};
function reducer(state, action) {
  // console.log("state", state); // state undefined
  console.log("action", action); // action {type: "ADD"}
}

// store 创建仓库,把数据放到仓库(必须是纯函数)
const Store = redux.createStore(reducer);
// const Store = createStore(reducer);

// action
const action1 = { type: "ADD" };
const action2 = { type: "SUB", sum: 5 };

// 使用 action 它会执行 reducer 函数
Store.dispatch(action1);
Store.dispatch(action2);
console.log(Store.getState());
