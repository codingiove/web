

[TOC]
npx webpack src/index.js


# 什么是虚拟 DOM

`虚拟DOM是:用JS来模拟一颗 DOM 树,放在浏览器内存中`
`当你要改变时,虚拟 DOM 使用 diff 算法进行` ==新旧虚拟 dom 的比较==`将修改了的更新到实际的 DOM 树,减少了 DOM 操作`
# 什么是 diff 算法

`计算出虚拟 DOM 中真正变化的部分,并且只针对该部分进行 DOM 更新,而非重新渲染整个页面`
# react 的使用

**安装 cnpm i react react-dom -S 安装包**

- react: 专门用于创建组件和虚拟 DOM 的,同时组件的生命周期都在这个包中
- react-dom: 专门进行 DOM 操作的,最主要的应用场景,就是 ReactDOM.render()

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react基本使用</title>
  </head>
  <body>
    <!-- 创建一个div,虚拟DOM会渲染到这个div里 -->
    <div id="app"></div>
    <!-- 浏览器不支持 import -->
    <script src="../build/build.js"></script>
    <!-- 这里是打包前的代码 -->
    <script>
      import React from "react"; // 创建组件,虚拟 DOM 元素,生命周期
      import ReactDOM from "react-dom"; // 把创建好的虚拟 DOM 放到页面上展示

      // 创建虚拟 DOM
      // 参数 1: 创建元素类型
      // 参数 2: 是一个对象或 null,表示当前这个 DOM 元素的属性
      // 参数 3: 子节点 (文本节点)
      // 参数 4: 其他子节点
      let myh1 = React.createElement(
        "h1",
        { id: "myh1", title: "我是标签" },
        "这是子节点"
      );

      // 把创建好的虚拟 DOM 渲染到页面上
      // 参数 1: 要渲染的那个虚拟 DOM
      // 参数 2: 指定页面上渲染的位置 (类似于Vue中的这个 <div id="app"></div>)
      ReactDOM.render(myh1, document.getElementById("app"));
    </script>
  </body>
</html>
```
# JSX 语法

- 在 js 中,有 HTML 的代码,就叫做 JSX 语法
- 在 jsx 中的元素添加 class 类名:需要使用 className 来替代 class; htmlFor 替换 label 的 for 属性
- 正常的 HTML 元素是小写,如果是大写,默认认为是组件

```javascript
import React from "react";
import ReactDOM from "react-dom";
// 直接运行会报错,要安装 babel 转换成 React.createElement 形式的语法
// 不用一个一个创建React.createElement,可以直接写html语法,然后babel内部会转成React.createElement这种形式
let myh1 = (
  <div id="mydiv" title="aaa">
    这个一个DIV元素
  </div>
);

ReactDOM.render(myh1, document.getElementById("app"));
```

- 配置文件
  `把devDependencies里的所有babel复制到你的配置文件中,然后删除node_modules,重新cnmp install`

```javascript
{
  "name": "react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "webpack": "^4.44.2"
  }
}
```

- .babelrc 文件

```javascript
{
  "presets": ["env", "stage-0", "react"],
  "plugins": ["transform-runtime"]
}
```

- webpack.config.js

```javascript
const { resolve } = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
};
```

## JSX 中使用变量

- 通过 {} 语法,Vue 中是{{}}

```javascript
import React from "react";
import ReactDOM from "react-dom";

let num = 50;
let bool = true;
let title = "可变的title";
let arr = ["钢铁侠", "蜘蛛侠", "雷神", "死特", "美国队长"];
let myh1 = (
  <div id="mydiv" title="aaa">
    {num}
    <hr />

    {bool ? "条件为真" : "条件为假"}
    <hr />

    <p title={title}>{title}</p>
    <hr />
    {arr.map((item) => (
      <h3 key={item}>{item}</h3>
    ))}
  </div>
);

// 为啥用 map,map有返回值,会生成一个新数组
ReactDOM.render(myh1, document.getElementById("app"));
```
# react 中使用组件

```javascript
import React from "react";
import ReactDOM from "react-dom";

function Hello() {
  return <div>这是Hello组件</div>;
}

ReactDOM.render(
  <div>
    <Hello></Hello>
  </div>,
  document.getElementById("app")
);
```

## react 组件传参

```javascript
import React from "react";
import ReactDOM from "react-dom";

function Hello(props) {
  console.log(props);
  return (
    <div>
      这是Hello组件,
      <div>
        这是传过来的数据 ↓<p>名字:{props.send.name}</p>
        <p>ID:{props.send.id}</p>
        <p>颜色:{props.send.color}</p>
      </div>
    </div>
  );
}
let Data = {
  id: 0,
  name: "数据0",
  color: "red",
};
ReactDOM.render(
  <div>
    <Hello send={Data}></Hello>
  </div>,
  document.getElementById("app")
);
```
## 子传父
```javascript
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
  // 父组件方法,传给子组件,子组件通过参数进行修改
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
```
## 兄弟传参
```javascript
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
  // 跟子传父一样,兄弟A组件把参数给父组件,然后父组件传给兄弟B组件
  CommonFunction = (canshu) => {
    this.setState({
      CommonData: canshu,
    });
  };
}
ReactDOM.render(<Father />, document.getElementById("app"));
```
## 将组件抽离为单独的.jsx 文件
```javascript
// components中的 Hello.jsx文件
import React from "react"; // 你要创建组件必须依赖React包
export default function Hello(props) {
  console.log(props);
  return (
    <div>
      这是Hello组件,
      <div>
        这是传过来的数据 ↓<p>名字:{props.send.name}</p>
        <p>ID:{props.send.id}</p>
        <p>颜色:{props.send.color}</p>
      </div>
    </div>
  );
}
// index.js文件
import React from "react";
import ReactDOM from "react-dom";
import Hello from "./components/Hello.jsx"; // 不能省略后缀名
let Data = {
  id: 0,
  name: "数据0",
  color: "red",
};

ReactDOM.render(
  <div>
    <Hello send={Data}></Hello>
  </div>,
  document.getElementById("app")
);
```
## 使用 class 创建组件
 - 注意: 使用 class 关键字创建的组件,有自己的私有数据和生命周期函数;
 - 注意: 使用 function 创建的组件,只有 props,没有自己的私有数据和生命周期函数;
```javascript
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
```
# react 使用行内样式

```javascript
import React from "react";
import ReactDOM from "react-dom";

function Style() {
  return <div style={{ color: "red", fontSize: "50px" }}>变红</div>;
}

ReactDOM.render(<Style></Style>, document.getElementById("app"));
```
# react 使用样式表

```javascript
import React from "react";
import ReactDOM from "react-dom";
// 这个是全局样式
import css from "./css/index.css";

function Style() {
  // CSS开启模块化使用方式,开启模块化样式只在引入的文件中生效
  // return <div className={css.title}>样式表样式</div>;
  return <div className="title">样式表样式</div>;
}

ReactDOM.render(<Style></Style>, document.getElementById("app"));
```

- webpack.config 文件

```javascript
 // 在 webpack module下的 rules 中添加这项配置,需要先安装
 // css-loader?modules,为 CSS 开启模块化
 {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
 },
```

- css 文件

```css
/* 注意:被:global(）包裹起来的类名,不会被模块化,而是会全局生效; */
/* 注意:被:local() 包裹起来的类名,会被模块化;默认情况下,所有的类名和ID,都被模块化了; */
:global(.test) {
  color: rebeccapurple;
}
.title {
  color: red;
  font-size: 50px;
  text-align: center;
}
```
# react 事件使用
```javascript
import React from "react";
import ReactDOM from "react-dom";

class My extends React.Component {
  constructor() {
    super();
    // this.state,只能这样写,否则赋值有问题
    this.state = {
      msg:"默认值"
    }
  }
  render() {
    return  <div>
        {/* 三种使用方式 , 最后一种最常用 */}
        {/* <button onClick = { function () { console.log("6666")} }>按钮</button>  */}
        {/* <button onClick = {this.btn}>按钮</button> */}
        { this.state.msg }
        <button onClick = { () => this.btn("哈哈哈") }> 按钮 </button>
       
      </div>
  }
  btn = (face) => {
     // this.data.msg = "" 这种赋值方式,页面不会更新
     // this.setState 方法的执行,是异步的,如果想拿到更新后的值通过 callback
     // this.setState({ msg:face }, function (){ console.log(this.state.msg) })
    this.setState({ msg:face },function (){ console.log(this.state.msg) })
  }
}
ReactDOM.render(<My></My>, document.getElementById("app"));
```
## Ref
```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
class Ref extends Component {
  callbackRef() {
    console.log(this.CurrentValue.value);
    // 这样就不用再,this.refs.CurrentValue.value  
  }
  stringRef(){
   console.log(this.refs.CurrentValue.value);
  }
  render() {
    return (
      <div>
         {/*代表当前DOM元素 , 取一个名字 , 把DOM赋值给 this.CurrentValue*/}
        <input ref={(currentDOM) => { this.CurrentValue = currentDOM}} />
        <input ref="CurrentValue" />
        <button onClick={() => this.callbackRef()}>ref回调函数形式获取值</button>
        <button onClick={() => this.stringRef()}>ref字符串形式获取值</button>
      </div>
    );
  }
}
ReactDOM.render(<Ref />, document.getElementById("app"));
```
## Ref获取子组件数据
```javascript
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
```
## react 实现双向数据绑定
```javascript
import React from "react";
import ReactDOM from "react-dom";
class My extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: "默认值",
    };
  }
  render() {
    return (
      <div>
        {/*

      如果只是把,文本框的 value 属性,绑定到了 state 状态,但是如果不提供 onChange 处理函数的话,
      得到的文本框,将会是一个只读的文本框
      要么提供一个 readOnly (只读文本框),要么提供一个 onChange (监听状态发生改变) 函数

       */}
        {/* (1) <input value={this.state.msg} onChange={(e) => this.textChange(e)} /> */}
        <input value={this.state.msg} onChange={() => this.textChange()} ref="txt" />
        {this.state.msg}
        <button onClick={() => this.btn("哈哈哈")}> 按钮 </button>
      </div>
    );
  }
  textChange = (e) => {
    // 方法 (1) 通过事件对象
    // let newvalue = e.target.value;
    // this.setState({
    //   msg: newvalue,
    // });

    // 方法 (2) 通过 refs
    let newvalue = this.refs.txt.value
    this.setState({
        msg: newvalue,
    });
  };
  btn = (face) => {
    this.setState({ msg: face }, function () {
      console.log(this.state.msg);
    });
  };
}
ReactDOM.render(<My></My>, document.getElementById("app"));
```
# react 生命周期
- 什么是生命周期,就是组件从创建,运行,到销毁的过程叫做生命周期
```javascript
 componentWillMount // 组件将要渲染
 componentDidMount // 组件渲染完成
 componentWillReceiveProps // 组件将要接受 porps 数据
 shouldComponentUpdate // 组件收到新的 state 或 porps 判断是否更新,返回布尔值,返回 true则继续往下执行
 componentWillUpdate // 组件将要更新
 componentDidUpdate // 组件更新完成
 componentWillUnMount  // 组件将要卸载
```
# 安装 React 脚手架
- 不要有中文
  1. cnpm install -g create-react-app(安装过这个就直接进行第二步)
  2. create-react-app hellowo(项目名)
  3. cd hellowo
  4. 运行命令 npm  start

# react 插条
```javascript
import React from "react";
import ReactDOM from "react-dom";
// 默认会有一个 constructor
class Movie extends React.Component {
  render() {
    return (
      <div>
         组件插条
        {this.props.children}
        
      </div>
    );
  }
}

ReactDOM.render(
  <Movie>
    <h1>子组件</h1>
    <h1>子组件</h1>
    <h1>子组件</h1>
  </Movie>,
  document.getElementById("app")
);
```
# react 路由
- 先安装路由,cnpm install react-router-dom -S

- 使用 react 脚手架,然后把下面代码复制到 App.js

- to = { {} }  一个 {} 代表变量, { {} } 代表变量里是一个对象

  ```
  路由模式:
   HashRouter hash模式带#号,页面切换或刷新时,页面不会刷新
   BrowserRouter browser历史记录模式,没有#号,他是通过历史记录api来进行路由切换的,页面会刷新,木地模式不会
  ```

  

```javascript
import React from "react";

import "./App.css";

import { BrowserRouter as Router, Link, Route,NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>首页</h1>
    </div>
  );
}
function Me(props) {
  console.log(props);
  return (
    <div>
      <h1>个人中心</h1>
    </div>
  );
}
function Goods(props) {
  console.log(props.match.params.id);
  return (
    <div>
      <h1>商品</h1>
    </div>
  );
}

class Routers extends React.Component {
  render() {
    return (
      <div id="app">
        <Router> {/* Router 根,代表这是个路由  */}
          <div className="nav">
            <Link to="/">首页</Link> {/* Link 实现组件跳转,相当于 Vue router-link  */}
            <Link to={{ pathname: "/Me" ,search:"?username=adimin"}}>个人中心</Link> 
            <Link to="/Goods/10086">商品</Link>
			{/* NavLink 可以动态的给选中的导航添加 active 的类名 */}
			<NavLink to="/Goods/10086">商品</NavLink> 
          </div>
	        {/* exact 加上这个只有路由路径唯 / 才显示Home组件,不加 exact 只要有/ 就显示Home组件 */}
          <Route path="/" exact component={Home}></Route>{/*  Route 路径对应的组件  */}
          <Route path="/Me" component={Me}></Route>
          <Route path="/Goods/:id" component={Goods}></Route>
        </Router>
      </div>
    );
  }
}

export default Routers;
```



## 二级路由

```javascript
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function Me(props) {
  console.log(props);
  return (
    <div>
      <h1>个人中心</h1>
      <Link to="/Me/zi">跳转到二级路由下</Link>
    </div>
  );
}

// 二级路由
function Mezi() {
  return <div>个人中心二级路由</div>;
}

class Routers extends React.Component {
  render() {
    return (
      <div id="app">
        <Router>
          <div className="nav">
            <Link to={{ pathname: "/Me", params: { id: 0 } }}>个人中心</Link>
          </div>
          <Route path="/Me" component={Me}></Route>
          <Route path="/Me/zi" component={Mezi}></Route>
        </Router>
      </div>
    );
  }
}

export default Routers;
```



# Redux

- 先安装 cnpm install redux -S

- 解决React数据管理（状态管理)，用于中大型，数据比较庞大，组件之间数据交互多的情况下使用

- 如果你不知道是否需要使用Redux，那么你就不需要用它!




**store**

```javascript
store:存放数据的仓库,获取仓库(store.getState),操作仓库(store.dispatch)
```

**action**

```javascript
action:命令 Redux 执行规则,必须要包含type属性
```

**Redux**

```
Redux:执行 action 的命令,把新的 state 发送给 store
```



```javascript
// store.js
// 仓库
import { createStore } from "redux";
// 导入数据
import Data from "./Redux";
// 创建仓库,把数据放到仓库(必须是函数类型)
const Store = createStore(Data);
// 让外面使用仓库
export default Store;



// Redux.js
// 添加数据
const Default = {
  num: "默认值",
  list: ["0", "1", "2"],
};
// 把数据导出
export default function (state = Default, action) {
  // console.log(action.type);
  switch (action.type) {
    case "0":
      // 把修改了的值返回给 store 仓库,这个函数在仓库存着,当你修改了,仓库也会更新
      return state = action.state
    default:
      return state;
  }
}




// app.js
// 获取仓库中的数据
let action = {
  state: "action99",
  type: "0",
};
// dispatch 默认情况下触发的是 action
warehouse.dispatch(action);
console.log(warehouse.getState());

// store 专门存放东西 
// action 命令 Redux 执行条件
// Redux 执行方法
// 流程: 把 Redux 方法导入到 store 仓库中, action 命令 Redux 执行
```



# React-Redux

- cnpm install redux react-redux -S

**Provider**

```
Provider:能让你的组件获取到store中的数据
```

**connect**

```
connect:方便我们组件能够获取到store中的state
```

G:\前端\React\react_redux

