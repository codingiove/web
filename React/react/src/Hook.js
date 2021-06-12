import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
function Btn() {
  /* 
 参数和返回值:
   参数: 初始化值,如果不设置为 undefined
   返回值:数组,包含两个元素
   > 元素一:
      当前状态的值 (第一调用为初始化值)
   > 元素二∶
      设置状态值的函数;
 */
  const [count, setCount] = useState(0); // 初始化值
  const [obj, setObj] = useState({ name: "张三" });
  const [Arr, setArr] = useState(["KOKO", "KOBE", "JANl"]);
  //  useEffect === componentDidMount 和 componentDidUpdate 这两个生命周期
  useEffect(() => {
    console.log("执行了");
    document.title = count;
  }, [count, obj]); // 第二个参数传入一个空数组就只会在第一次时调用;
  // [count] 表示当 count 发生改变了才会调用

  return (
    <div>
      <p>{count}</p>

      <p>
        {obj.name} - {obj.age}
      </p>

      <ul>
        {Arr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => setCount(count + 1)}>数值自增</button>
      <button onClick={() => setObj({ name: "李四", age: 15 })}>
        对象按钮
      </button>
      <button onClick={() => setArr([...Arr, "TOM"])}>增加列表</button>
    </div>
  );
}
ReactDOM.render(<Btn />, document.getElementById("app"));
