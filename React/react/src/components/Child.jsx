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