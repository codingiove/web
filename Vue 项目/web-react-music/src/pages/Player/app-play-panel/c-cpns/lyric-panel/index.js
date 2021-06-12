import React, { memo, useRef, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { scrollTo } from "@/utils/ui-helper";
import { PannelWrapper } from "./style";
// 歌词面板
export default memo(function LyricPanel() {
  const { lyricList, currentLyricIndex } = useSelector((state) => {
    return {
      lyricList: state.getIn(["Player", "lyricList"]),
      currentLyricIndex: state.getIn(["Player", "CurrentLyricIndex"]),
    };
  }, shallowEqual);

  const panelRef = useRef();

  useEffect(() => {
    //if (currentLyricIndex > 0 && currentLyricIndex < 3) return;
    // 歌词滚动                     显示 3 句歌词     离顶部距离
    scrollTo(panelRef.current, (currentLyricIndex - 3) * 32, 300);
  }, [currentLyricIndex]);

  return (
    <PannelWrapper ref={panelRef}>
      <div className="lrc-content">
        {lyricList.map((item, index) => {
          return (
            // 当前歌词加效果
            <div
              key={index}
              className={`lrc-item ${
                index === currentLyricIndex ? "active" : ""
              }`}
            >
              {/* 歌词 */}
              {item.content}
            </div>
          );
        })}
      </div>
      {lyricList.length === 0 && (
        <div className="lyric-null">
          <span>暂时没有歌词</span>
        </div>
      )}
    </PannelWrapper>
  );
});
