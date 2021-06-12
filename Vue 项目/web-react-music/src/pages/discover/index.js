import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { DiscoverWrapper, TopMenu } from "./style";
import { dicoverMenu } from "../../common/local-data.js";
export default memo(function Discover(props) {
  let { routes } = props.route; // 获取子路由
  return (
    <DiscoverWrapper>
      <div className="top">
        <TopMenu className="wrap-v1">
          {dicoverMenu.map((item) => {
            return (
              <div className="item" key={item.title}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            );
          })}
        </TopMenu>
      </div>
      {renderRoutes(routes)}
    </DiscoverWrapper>
  );
});
