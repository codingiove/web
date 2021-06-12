import React, { PureComponent, memo } from "react";
import ReactDOM from "react-dom";

// Header
// memo 返回一个新的组件
const NewHeader = memo(function Header() {
  console.log("Header被调用");
  return <h2>我是Header组件</h2>;
});

// Main
class Banner extends PureComponent {
  render() {
    console.log("Banner render函数被调用");
    return <h3>我是Banner组件</h3>;
  }
}

function ProductList() {
  console.log("ProductList被调用");
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
      <li>商品列表4</li>
      <li>商品列表5</li>
    </ul>
  );
}

class Main extends PureComponent {
  render() {
    console.log("Main render函数被调用");
    return (
      <div>
        <Banner />
        <ProductList />
      </div>
    );
  }
}

// Footer
const Footer = memo(function Footer() {
  console.log("Footer被调用");
  return <h2>我是Footer组件</h2>;
});

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }
  render() {
    console.log("App render函数被调用");
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={(e) => this.increment()}>+1</button>
        <NewHeader />
        <Main />
        <Footer />
      </div>
    );
  }
  increment() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
}
/* 
当我们更新 APP 组件的值时, Header 这些组件也被调用了 render 函数;
这样是非常浪费性能的,所以把 Component 改成 PureComponent

Component:
  App render函数被调用
  Header被调用
  Main render函数被调用
  Banner render函数被调用
  ProductList被调用
  Footer被调用

PureComponent 的作用:
  PureComponent 会对 props 和 state 做浅层比较,看看有没有改变
  有改变调用 shouldComponentUpdate() { return true  }

shouldComponentUpdate(newPorps,newState) 作用:
  组件收到新的 props 或 state 判断是否更新,返回布尔值,返回 true 则更新

  
PureComponent:
  App render函数被调用
  Header被调用
  Footer被调用

但我们发现 函数组件还是调用了 render 函数,所以我们可以使用 memo
 */
ReactDOM.render(<App />, document.getElementById("app"));
