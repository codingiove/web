import React from "react";
import ReactDOM from "react-dom";
class Father extends React.Component {
  componentDidMount(){
    console.log(this.currentDOM.state.data);
  }
  render() {
    return (
      <div>
        <h1>父组件</h1>
        <Child ref={(ChildDOM) => { this.currentDOM = ChildDOM}}></Child>
      </div>
    );
  }
}
class Child extends React.Component {
  constructor(){
    super()
    this.state = {
      data:"子组件数据"
    }
  }
  render() {
    return (
      <div>
        <h1>子组件</h1>
      </div>
    );
  }
}
ReactDOM.render(<Father />, document.getElementById("app"));