import React from "react";
import { connect } from "react-redux";
// import { connect } from "../utils/connect";

function Thunk(props) {
  return (
    <div>
      <h1>你好: {props.name}</h1>
      <h2>axios-Thunk</h2>
      <button onClick={() => props.UsingMiddleware()}>发送网络请求</button>
    </div>
  );
}
const mapState = (state) => {
  return {
    name: state.name,
  };
};
const mapdispatch = (dispatch) => {
  return {
    UsingMiddleware() {
      // 不要调用该函数 , 它会主动被调用的 , 并且传入一个 dispatch 和 getState
      dispatch(getHomeMiddlewareAction1);

      dispatch(getHomeMiddlewareAction2("KOKO"));
      /* 
      ↓
      dispatch((dispatch, getState) => {dispatch({ type: "1", name:"KOKO" })})
      */
    },
  };
};

// redux-thunk 中定义的 action 函数
const getHomeMiddlewareAction1 = (dispatch) => {
  dispatch({
    type: "0",
    current: 1,
  });
};
// 调用 getHomeMiddlewareAction2 函数,但它又返回一个函数
const getHomeMiddlewareAction2 = (name) => {
  return (dispatch, getState) => {
    dispatch({ type: "1", name });
  };
};

export default connect(mapState, mapdispatch)(Thunk);
