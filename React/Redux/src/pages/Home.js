import React from "react";
import { connect } from "../utils/connect";

function Home(props) {
  //console.log("props", props);
  return (
    <div>
      <h2>当前数值: {props.current}</h2>
      <button onClick={() => props.increment()}>+1</button>
    </div>
  );
}

const mapState = (state) => {
  return {
    current: state.current,
  };
};
// dispatch 默认情况下触发的是 action
const mapdispatch = (dispatch) => {
  return {
    increment() {
      dispatch({
        type: "0",
        current: 1,
      });
    },
  };
};
export default connect(mapState, mapdispatch)(Home);

/* 
1. 调用 connect 函数传入一个 mapState 函数
2. connect 调用 mapState(store.getState()) 并传给它一个参数

3. const mapState = (state) => {
  这里就能拿到那个参数
  3.1 返回一个对象
  return { current: state.current }
};

4. mapState 函数返回值是一个对象
5. { { current: state.current } } 使用扩展运算符
6. 结果: <Component { current: state.current } />
*/
