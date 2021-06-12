import React, { memo } from "react";
import Banners from "./children/Banners/index";
import HotRecommend from "./children/Hot-Recommend/index";
import NewAlbum from "./children//New-Album/index";
import Ranking from "./children/ranking/index.js";
import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from "./style";

function Recommend() {
  return (
    <RecommendWrapper>
      <Banners />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <Ranking />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWrapper>
  );
}

export default memo(Recommend);
