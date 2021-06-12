import React, { memo } from "react";
import { MV } from "./style.js";
import {
  getSizeImage,
  getCount,
  formatMinuteSecond,
} from "../../utils/format-utils.js";
export default memo(function index(props) {
  let { info } = props;

  return (
    <MV>
      <div className="img-wrap">
        <img src={getSizeImage(info.cover, 240)} alt="" />
        <div className="play-volume">{getCount(info.playCount)}</div>
        <div className="play-time">{formatMinuteSecond(info.duration)}</div>
      </div>
      <div className="info-wrap">
        <div className="titles ellipsis">{info.name}</div>
        <div className="author ellipsis">{info.artistName}</div>
      </div>
    </MV>
  );
});
