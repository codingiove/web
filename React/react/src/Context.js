import React, { Component } from "react";
import ReactDOM from "react-dom";

// 创建 Context 对象
const Context = React.createContext({
  // 默认值
  name: "Coder",
  age: 10,
});

// class Grandson extends Component {
//   render() {
//     const { name, age } = this.context;
//     return (
//       <div>
//         <div>Grandson组件 👇</div>
//         <span>用户昵称: {name}</span>
//         <br />
//         <span>用户等级: {age}</span>
//       </div>
//     );
//   }
// }
// // 拿到共享数据
// Grandson.contextType = Context;

function Grandson() {
  return (
    <Context.Consumer>
      {(value) => {
        return (
          <div>
            <div>Grandson组件 👇</div>
            <span>用户昵称: {value.name}</span>
            <br />
            <span>用户等级: {value.age}</span>
          </div>
        );
      }}
    </Context.Consumer>
  );
}

function Son() {
  return (
    <div>
      <div>Son组件</div>
      <Grandson />
    </div>
  );
}

class APP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "KOKO",
      age: 20,
    };
  }
  render() {
    return (
      <div>
        {/* value 共享的数据
         Son组件 和 Grandson组件 都可以拿到这个共享的数据 
         如果 Son组件 没有被 Context.Provider 包裹就会用默认值
        */}
        <Context.Provider value={this.state}>
          <div>APP组件</div>
          <Son />
        </Context.Provider>
      </div>
    );
  }
}

ReactDOM.render(<APP />, document.getElementById("app"));
