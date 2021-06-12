import React from "react"; //  组件必须依赖React包
import ReactDOM from "react-dom";
import Hello from "./components/Hello.jsx"; // 不能省略 .jsx 后缀名

let Data = {
  id: 0,
  name: "数据0",
  color: "red",
};

ReactDOM.render(
  <div>
    <Hello send={Data}></Hello>
  </div>,
  document.getElementById("app")
);
