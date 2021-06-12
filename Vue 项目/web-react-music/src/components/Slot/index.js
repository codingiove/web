import React, { memo } from "react";
import { HeaderWrapper } from "./style";
export default memo(function Slot(props) {
  // 因为这是公共的,有些地方没有 keywords
  // 没有 keywords 就是 undefined.map 这样会报错的,所以给他一个默认值

  const { title, keywords = [] } = props;
  return (
    <HeaderWrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keyword">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <a href="#/">{item}</a>
                <span className="divider">|</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="right">
        <a href="#/">更多</a>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderWrapper>
  );
});
