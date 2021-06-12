import React, { memo } from "react";

import { headerLinks } from "@/common/local-data.js"; // 导航栏
import { NavLink, withRouter } from "react-router-dom";

import { HeaderWrapper, HeaderLeft, HeaderRight } from "./style"; // 样式

const Header = memo(function Header(props) {
  // 导航栏
  const Navbar = (item, index) => {
    // 给前面三个添加 NavLink (0,1,2)
    if (index < 3) {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      );
    } else {
      return <a href={item.link}>{item.title}</a>;
    }
  };

  const ToSearch = (e) => {
    let Event = e.target.value.trim();
    if (Event === "") return;
    if (e.keyCode === 13) {
      props.history.push(`/Search/${Event}`);
      // search: `keywords=${Event}`,
      // params: { keywords: Event }, // location.params 里获取
      // state: Event, // location.state
      setTimeout(() => (e.target.value = ""));
    }
  };
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a href="#/" className="logo sprite_01">
            网易云音乐
          </a>
          <div className="select-list">
            {headerLinks.map((item, index) => {
              return (
                <div key={item.title} className="select-item">
                  {Navbar(item, index)}
                </div>
              );
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <input
            className="search"
            placeholder="音乐/视频/电台/用户"
            onKeyDown={(e) => ToSearch(e)}
          />
          <div className="center">创作者中心</div>
          <div>登录</div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  );
});
export default withRouter(Header);
