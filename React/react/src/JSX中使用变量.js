import React from "react";
import ReactDOM from "react-dom";

let num = 50;
let bool = true;
let title = "可变的title";
let arr = ["钢铁侠", "蜘蛛侠", "雷神", "死特", "美国队长"];
let myh1 = (
  <div id="mydiv" title="aaa">
    {num}
    <hr />

    {bool ? "条件为真" : "条件为假"}
    <hr />

    <p title={title}>{title}</p>
    <hr />
    {arr.map((item) => (
      <h3 key={item}>{item}</h3>
    ))}
  </div>
);

// 为啥用 map,map有返回值,会生成一个新数组
ReactDOM.render(myh1, document.getElementById("app"));
