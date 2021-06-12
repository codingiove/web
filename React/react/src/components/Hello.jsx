import React from "react"; // 你要创建组件必须依赖React包

export default function Hello(props) {
  console.log(props);
  return <div>
      这是Hello组件,
      <div>
        这是传过来的数据 ↓
        <p>名字:{props.send.name}</p>
        <p>ID:{props.send.id}</p>
        <p>颜色:{props.send.color}</p>
      </div>
    </div>
}