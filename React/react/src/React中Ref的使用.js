import React, { Component } from "react";
import ReactDOM from "react-dom";
class Ref extends Component {
  callbackRef() {
    console.log(this.CurrentValue.value);
    // 这样就不用再,this.refs.xxx.value  
  }
  stringRef(){
   console.log(this.refs.CurrentValue.value);
  }
  render() {
    return (
      <div>
         {/*代表当前DOM元素 , 取一个名字 , 把DOM赋值给 this.CurrentValue*/}
        <input ref={(currentDOM) => { this.CurrentValue = currentDOM}} />
        <input ref="CurrentValue" />
        <button onClick={() => this.callbackRef()}>ref回调函数形式获取值</button>
        <button onClick={() => this.stringRef()}>ref字符串形式获取值</button>
      </div>
    );
  }
}
ReactDOM.render(<Ref />, document.getElementById("app"));
