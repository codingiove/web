import React from "react"; // 创建组件,虚拟 DOM 元素,生命周期
import ReactDOM from "react-dom"; // 把创建好的虚拟 DOM 放到页面上展示

// 创建虚拟 DOM
// 参数 1: 创建元素类型
// 参数 2: 是一个对象或 null,表示当前这个 DOM 元素的属性
// 参数 3: 子节点 (文本节点)
// let myh1 = React.createElement("h1", null, "这是文本节点");
let myh1 = React.createElement(
  "h1",
  { id: "myh1", title: "我是标签" },
  "这是文本节点"
);

// 把创建好的虚拟 DOM 渲染到页面上
// 参数 1: 要渲染的那个虚拟 DOM
// 参数 2: 指定页面上渲染的位置 (类似于Vue中的这个 <div id="app"></div>)
ReactDOM.render(myh1, document.getElementById("app"));
