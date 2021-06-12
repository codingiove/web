import React from "react";
import ReactDOM from "react-dom";
// 兄弟A组件
class BrotherA extends React.Component {
  constructor() {
    super();
    this.state = {
      data: "传给B组件的参数值",
    };
  }
  render() {
    return (
      <div>
        <h1>兄弟A组件</h1>
        <button onClick={() => this.chuancan()}>按钮A</button>
      </div>
    );
  }
  chuancan = () => {
    let { data } = this.state;
    this.props.change(data);
  };
}
// 兄弟B组件
class BrotherB extends React.Component {
  render() {
    return (
      <div>
        <h1>兄弟B组件</h1>
        A组件的参数:{this.props.CommonData}
      </div>
    );
  }
}

// 共同的父亲
class Father extends React.Component {
  constructor() {
    super();
    this.state = {
      CommonData: "",
    };
  }
  render() {
    return (
      <div>
        <BrotherA change={this.CommonFunction} />
        <BrotherB {...this.state} />
      </div>
    );
  }
  CommonFunction = (canshu) => {
    this.setState({
      CommonData: canshu,
    });
  };
}
ReactDOM.render(<Father />, document.getElementById("app"));
