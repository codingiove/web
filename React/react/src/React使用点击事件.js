import React from "react";
import ReactDOM from "react-dom";

class My extends React.Component {
 
  constructor() {
    super();
    // this.state,只能这样写,否则赋值有问题
    this.state = {
      msg:"默认值"
    }
  }
  render() {
    return  <div>
        {/* 三种使用方式 , 最后一种最常用 */}
        {/* <button onClick = { function () { console.log("6666")} }>按钮</button>  */}
        {/* <button onClick = {this.btn}>按钮</button> */}
        { this.state.msg }
        <button onClick = { () => this.btn("哈哈哈") }> 按钮 </button>
       
      </div>
  }
  btn = (face) => {
    // this.data.msg = "" 这种赋值方式,页面不会更新
    // this.setState 方法的执行,是异步的,如果想拿到更新后的值通过 callback
    // this.setState({ msg:face }, function (){ console.log(this.state.msg) })
    this.setState({ msg:face },function (){ console.log(this.state.msg) })
  }
}
ReactDOM.render(<My></My>, document.getElementById("app"));