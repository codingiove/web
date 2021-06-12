import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RankingListAction } from "../../store/action";
import { RankingWrapper } from "./style";
import RankingSlot from "@/components/Slot/index.js";
import TopRanking from "@/components/top-ranking/index.js";

export default memo(function Ranking() {
  const { upRanking, newRanking, originRanking } = useSelector(
    (state) => ({
      upRanking: state.getIn(["recommend", "upRanking"]),
      newRanking: state.getIn(["recommend", "newRanking"]),
      originRanking: state.getIn(["recommend", "originRanking"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RankingListAction(0));
    dispatch(RankingListAction(2));
    dispatch(RankingListAction(3));
  }, [dispatch]);

  return (
    <RankingWrapper>
      <RankingSlot title="榜单" />
      <div className="tops">
        <TopRanking info={upRanking} />
        <TopRanking info={newRanking} />
        <TopRanking info={originRanking} />
      </div>
    </RankingWrapper>
  );
});
