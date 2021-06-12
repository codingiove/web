import React from "react";
import ReactDOM from "react-dom";

class Tools extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "Hello world",
      age: 18,
    };
  }
  render() {
    return (
      <div>
        {/* 这里改成了 "哈哈哈哈" 很显然并没有覆盖 age 属性 */}
        {this.state.content}
        <p> {this.state.age}</p>
        <button onClick={(e) => this.change()}> 改变文字 </button>
      </div>
    );
  }
  change() {
    this.setState({
      content: "哈哈哈哈",
    });
    // 因为 React 内部有做一件事
    // Object.assign({},  this.state, { content: "哈哈哈哈" })
    // 所以不用担心会覆盖 age 属性
  }
}
ReactDOM.render(<Tools />, document.getElementById("app"));

const state = { content: "Hello world", age: 18 };
const ChangeState = { content: "哈哈哈哈" };
let result = Object.assign({}, state, ChangeState);
console.log(result);
// { content: '哈哈哈哈', age: 18 }
