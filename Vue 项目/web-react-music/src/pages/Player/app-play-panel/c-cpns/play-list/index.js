import React, { memo } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { formatMinuteSecond } from "@/utils/format-utils";
import { PlayListWrapper } from "./style";
import {
  getSongDetailAction,
  getDeleteCurrentSongAction,
} from "@/pages/Player/store/action.js";

export default memo(function PlayList() {
  const dispatch = useDispatch();

  const { playList, currentSongIndex } = useSelector((state) => {
    return {
      playList: state.getIn(["Player", "PlayList"]),
      currentSongIndex: state.getIn(["Player", "CurrentSongIndex"]),
    };
  }, shallowEqual);

  // 换首歌
  const ChangeSong = (id) => {
    dispatch(getSongDetailAction(id));
  };
  // 删除当前歌曲
  const DeleteCurrentSon = (id) => {
    dispatch(getDeleteCurrentSongAction(id));
  };

  return (
    <PlayListWrapper>
      {playList.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`play-item ${
              currentSongIndex === index ? "active" : null
            }`}
          >
            {/* 歌名 */}
            <div className="left" onClick={() => ChangeSong(item.id)}>
              {item.name}
            </div>
            <div className="right">
              {/* 删除 */}
              <i
                title="删除"
                className="sprite_playlist"
                onClick={() => DeleteCurrentSon(item.id)}
              >
                删除
              </i>
              {/* 作者 */}
              <span className="singer">{item.ar[0].name}</span>
              <span className="duration">{formatMinuteSecond(item.dt)}</span>
              <span className="sprite_playlist link"></span>
            </div>
          </div>
        );
      })}
    </PlayListWrapper>
  );
});
