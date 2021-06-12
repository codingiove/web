import React, { memo } from "react";
import { getCount, getSizeImage } from "../../utils/format-utils";
import { SongsCoverWrapper } from "./style";

export default memo(function SongsCover(props) {
  const { info, right } = props;
  return (
    <SongsCoverWrapper right={right}>
      <div className="cover-top">
        {/* 设置小图,节约性能 */}
        <img src={getSizeImage(info.picUrl || info.coverImgUrl, 140)} alt="" />
        <div className="cover sprite_covor">
          <div className="info sprite_covor">
            <span>
              <i className="sprite_icon erji"></i>
              {getCount(info.playCount)} {/* 歌单播放量格式化*/}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{info.name}</div>
      <div className="cover-source text-nowrap">
        {info.picUrl && (info.copywriter || info.creator.nickname)}
      </div>
    </SongsCoverWrapper>
  );
});
