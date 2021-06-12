import React, { Component, createContext, useContext } from "react";
import ReactDOM from "react-dom";

let UserContext = createContext();
let SexContext = createContext();

function Grandson() {
  const userContext = useContext(UserContext);
  return (
    <div>
      <div>Grandson组件 👇</div>
      <span>用户昵称: {userContext.name}</span>
      <br />
      <span>年龄: {userContext.age}</span>
    </div>
  );
}

function Son() {
  const sexContext = useContext(SexContext);
  return (
    <div>
      <div>Son组件</div>
      <div>性别: {sexContext.sex}</div>
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
        <UserContext.Provider value={this.state}>
          <SexContext.Provider value={{ sex: "男" }}>
            <div>APP组件</div>
            <Son />
          </SexContext.Provider>
        </UserContext.Provider>
      </div>
    );
  }
}

ReactDOM.render(<APP />, document.getElementById("app"));
