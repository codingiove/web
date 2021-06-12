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