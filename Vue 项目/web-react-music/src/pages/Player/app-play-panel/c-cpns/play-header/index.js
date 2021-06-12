import React, { memo } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { HeaderWrapper, HeaderLeft, HeaderRight } from "./style";

export default memo(function HYPlayHeader() {
  const dispatch = useDispatch();
  const { playList, currentSong } = useSelector((state) => {
    return {
      playList: state.getIn(["Player", "PlayList"]),
      currentSong: state.getIn(["Player", "CurrentSong"]),
    };
  }, shallowEqual);
  // 清空播放列表
  const clear = () => {
    dispatch({ type: "Clear_Play_List" });
    dispatch({ type: "CHANGE_CURRENT_SONG_INDEX", index: 0 });
  };
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <h3>播放列表({playList.length})</h3>
        <div className="operator">
          <button>
            <i className="sprite_playlist icon favor"></i>
            收藏全部
          </button>
          <button onClick={() => clear()}>
            <i className="sprite_playlist icon remove"></i>
            清除
          </button>
        </div>
      </HeaderLeft>
      {/* 歌名 */}
      <HeaderRight>{currentSong.name}</HeaderRight>
    </HeaderWrapper>
  );
});
