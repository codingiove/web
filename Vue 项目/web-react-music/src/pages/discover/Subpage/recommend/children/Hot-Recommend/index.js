import React, { memo, useEffect } from "react";
import { HotRecommendWrapper } from "./style";
import { withRouter } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getHotRecommendsAction } from "../../store/action";
import SongsCover from "@/components/SongsCover/index.js";
import HotRecommendSlot from "@/components/Slot/index.js";

const HotRecommend = memo(function HotRecommend(props) {
  const dispatch = useDispatch();

  const { HotRecommends } = useSelector((state) => {
    return {
      HotRecommends: state.getIn(["recommend", "HotRecommends"]),
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(getHotRecommendsAction(8));
  }, [dispatch]);

  const SongSheetDetails = (id) => {
    props.history.push("/playlist?id=" + id);
  };
  return (
    <HotRecommendWrapper>
      <HotRecommendSlot
        title="热门推荐"
        keywords={["华语", "流行", "民谣", "摇滚", "电子"]}
      />
      <div className="recommend-list">
        {HotRecommends.map((item) => {
          return (
            <div key={item.id} onClick={() => SongSheetDetails(item.id)}>
              <SongsCover info={item} />
            </div>
          );
        })}
      </div>
    </HotRecommendWrapper>
  );
});
export default withRouter(HotRecommend);
