import React from "react";
import ReactDOM from "react-dom";

function Hello(props) {
  console.log(props);
  return <div>
      这是Hello组件,
      <div>
        这是传过来的数据 ↓
        <p>名字:{props.send.name}</p>
        <p>ID:{props.send.id}</p>
        <p>颜色:{props.send.color}</p>
      </div>
    </div>
  
}
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
