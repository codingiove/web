// components 文件夹下的,父组件代码
import React from "react";
import Child from "./Child.jsx"
export default class Father extends React.Component{
  constructor(){
    super()
    this.state = {
      data:"父组件内容"
    }
  }
  render(){
    return (
      <div>
        <h1>父组件---{this.state.data}</h1>
        <Child ParentMethod={ this.FatherClick }></Child>
      </div>
      
    )
  }
  // 父组件方法
  FatherClick = (canshu) =>{
    this.setState({
      data:canshu
    })
  }
}
// components 文件夹下的,子组件代码
import React from "react";
export default class Child extends React.Component{
  render(){
    this.state = {
      Data:"子组件内容"
    } 
    return (
      <div>
        <h1>子组件</h1>
        <button onClick={ ()=> this.ChildClick() }>改变父组件内容</button>
      </div>
    )
  }
  ChildClick(){
    let {Data} = this.state
    this.props.ParentMethod(Data)
  }
}
// 入口文件
import React from "react";
import ReactDOM from "react-dom";
import Father from "./components/Father.jsx"
ReactDOM.render(<Father />, document.getElementById("app"));
