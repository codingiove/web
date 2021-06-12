import React from "react";
import ReactDOM from "react-dom";

class My extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: "默认值",
    };
  }
  render() {
    return (
      <div>
        {/*

      如果只是把,文本框的 value 属性,绑定到了 state 状态,但是如果不提供 onChange 处理函数的话,
      得到的文本框,将会是一个只读的文本框
      要么提供一个 readOnly (只读文本框),要么提供一个 onChange (监听状态发生改变) 函数

       */}

        {/* (1) <input value={this.state.msg} onChange={(e) => this.textChange(e)} /> */}
        <input value={this.state.msg} onChange={() => this.textChange()} ref="txt" />
        {this.state.msg}
        <button onClick={() => this.btn("哈哈哈")}> 按钮 </button>
      </div>
    );
  }
  textChange = (e) => {
    // 方法 (1) 通过事件对象
    // let newvalue = e.target.value;
    // this.setState({
    //   msg: newvalue,
    // });

    // 方法 (2) 通过 refs
    let newvalue = this.refs.txt.value
    this.setState({
        msg: newvalue,
    });
  };
  btn = (face) => {
    this.setState({ msg: face }, function () {
      console.log(this.state.msg);
    });
  };
}
ReactDOM.render(<My></My>, document.getElementById("app"));
