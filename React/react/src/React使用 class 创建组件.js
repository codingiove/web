import React from "react";
import ReactDOM from "react-dom";

class Movie extends React.Component {
  // render函数的作用: 渲染当前组件的 JSX 元素
  constructor() {
    // 子类继承父类则,必须调用 super(),语法规范
    // super()代表父类的构造器(constructor)
    super();
    // 语法规范:在子类中, this 只能放到 super() 之后使用
    this.data = {
      msg: "我是Movie组件的私有数据",
    };
  }
  // 在 class 关键字创建的组件中,如果想使用外界传递过来的 props参数,不需接收,直接通过 this.props .***访问
  render() {
    return (
      <div>
        这是Movie组件---{this.props.send.name}---{this.data.msg}
      </div>
    );
  }
}

let Data = {
  id: 0,
  name: "数据",
  color: "red",
};

ReactDOM.render(<Movie send={Data}></Movie>, document.getElementById("app"));
