import React, { memo } from "react";
import { Div, Li, Ui, Warp } from "./style";

export default memo(function StyledComponents() {
  return (
    <Warp Variable={{ color: "#ff13b3" }}>
      <h2>Home 标题</h2>
      <span>span标签</span>
      <Div>
        <h2>Detail 标题</h2>
        <Ui>
          <Li>1</Li>
          <Li>2</Li>
          <Li>3</Li>
          <Li>4</Li>
        </Ui>
      </Div>
    </Warp>
  );
});
