import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Slider, message } from "antd";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";
import {
  getSongDetailAction,
  getSequenceAction,
  ChangeCurrentIndexAndSongAction,
  getCurrentLyricIndex,
  Public,
} from "../store/action.js";
import {
  getSizeImage,
  formatMinuteSecond,
  getPlaySong,
} from "../../../utils/format-utils.js";

import AppPlayPanel from "../app-play-panel";
export default memo(function Player() {
  // 记录当前歌曲播放时间
  const [CurrentTime, SetCurrentTime] = useState(0);
  // 当前歌曲播放进度
  const [CurrentProgress, SetCurrentProgress] = useState(0);
  // 判断当前是否正在改变滑块
  const [IsChanging, SetIsChanging] = useState(false);
  // 改变当前播放图标
  const [IsPlaying, SetIsPlaying] = useState(false);
  // 是否显示播放面板
  const [IsPlayPanelIng, SetIsPlayPanelIng] = useState(false);

  const dispatch = useDispatch();

  const {
    CurrentSong,
    Sequence,
    lyricList,
    PlayList,
    CurrentLyricIndex,
    CurrentSongIndex,
  } = useSelector((state) => {
    return {
      CurrentSong: state.getIn(["Player", "CurrentSong"]),
      Sequence: state.getIn(["Player", "sequence"]),
      lyricList: state.getIn(["Player", "lyricList"]),
      PlayList: state.getIn(["Player", "PlayList"]),
      CurrentLyricIndex: state.getIn(["Player", "CurrentLyricIndex"]),
      CurrentSongIndex: state.getIn(["Player", "CurrentSongIndex"]),
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(getSongDetailAction(26515713));
  }, [dispatch]);

  // 获取歌曲链接
  useEffect(() => {
    audioRef.current.src = getPlaySong(CurrentSong.id);
    // audioRef.current.play().then(
    //   (res) => SetIsPlaying(true),
    //   (err) => {
    //     SetIsPlaying(false);
    //
    //   }
    // );
  }, [CurrentSong]);

  const picUrl = CurrentSong.al && CurrentSong.al.picUrl;
  const singerName = CurrentSong.ar && CurrentSong.ar[0].name;
  const duration = CurrentSong.dt || 0; // 总时长
  // 当前歌曲播放时间
  const ShowCurrentTime = formatMinuteSecond(CurrentTime);
  // 当前歌曲总时长
  const Showduration = formatMinuteSecond(duration);
  // 操作播放歌曲
  const audioRef = useRef();

  // 播放音乐
  const playMusic = useCallback(() => {
    IsPlaying ? audioRef.current.pause() : audioRef.current.play();
    SetIsPlaying(!IsPlaying);
  }, [IsPlaying]);

  // 监听当前歌曲播放时间
  const TimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    // 没有改变滑块时才让你监听
    if (IsChanging === false) {
      /* 
      currentTime :
      30.977693 * 1000 = 30977.693
      duration :
      30977.693 / 224000 * 100 = 13.8293
      tipFormatter={null}
     */
      SetCurrentTime(currentTime * 1000); // 转成毫秒
      // 当前歌曲播放进度
      SetCurrentProgress(((currentTime * 1000) / duration) * 100);
    }
    // 获取当前歌词
    let i = 0;
    for (; i < lyricList.length; i++) {
      if (currentTime * 1000 < lyricList[i].time) {
        break;
      }
    }
    // 当前歌词索引
    if (CurrentLyricIndex !== i - 1) {
      dispatch(getCurrentLyricIndex(i - 1));
      const content = lyricList[i - 1] && lyricList[i - 1].content;
      if (content && !IsPlayPanelIng && currentTime > 0) {
        // 有歌词 并且 播放面板是隐藏状态 并且 歌曲播放时间 > 0
        ShowOpen(content, 0, "lyric-class");
      } else {
        // 没有歌词
        ShowOpen("", 1);
      }
    }
  };
  // 歌词提示框
  const ShowOpen = (content, Time, className = "lyric-class-padding") => {
    message.open({
      key: "lyric",
      content: content,
      duration: Time,
      className,
    });
  };
  // 滑块滑动时触发
  // 拖拽条的位置(宽) / 拖拽条总长  * 当前歌曲总时长
  const sliderChange = useCallback(
    (value) => {
      SetIsChanging(true); // 正在改变滑块
      // (14 / 100) * 224000 = 31360.000 播放位置
      SetCurrentTime((value / 100) * duration);
      /* 
      时间格式化
      31360.000 / 1000 / 60 =  0.5226666666666666
      0.5226666666666666 < 10 + "0"  = 00 取整

      31360.000 / 1000 % 60 = 31.36
      31.36 < 10 = 31
      结果: 00:31
      */
      SetCurrentProgress(value);
    },
    [duration]
  );
  // 滑块松手时触发
  const sliderAfterChange = useCallback(
    (value) => {
      //  (14 / 100) * 224000 / 1000 = 31.360000
      const CurrentTime = ((value / 100) * duration) / 1000;
      // 播放当前位置的歌曲
      console.log("点击");
      audioRef.current.currentTime = CurrentTime;
      SetIsChanging(false);
      // 31.360000  * 1000 = 31360
      SetCurrentTime(CurrentTime * 1000);
      audioRef.current.play();
      SetIsPlaying(true);
    },
    [duration]
  );
  // 播放顺序
  const ChangeSequence = () => {
    let CurrentSequence = Sequence + 1;
    // 0 顺序播放  1 随机播放  2 单曲循环
    if (CurrentSequence > 2) {
      CurrentSequence = 0;
    }
    dispatch(getSequenceAction(CurrentSequence));
  };
  // 切换歌曲
  const ChangeMusic = (tag) => {
    if (PlayList.length >= 2) {
      // tag === -1  上一首
      // tag ===  1  下一首
      dispatch(ChangeCurrentIndexAndSongAction(tag));
    }
  };
  // 处理音乐结束
  const handleMusicEnded = () => {
    // 播放列表中只有一首歌或没有
    if (PlayList.length <= 1 && Sequence !== 2) {
      audioRef.current.pause();
      return SetIsPlaying(!IsPlaying);
    }
    // 单曲循环
    if (Sequence === 2) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(ChangeCurrentIndexAndSongAction(1));
    }
  };
  // 播放面板
  const PlayPanel = () => {
    SetIsPlayPanelIng(!IsPlayPanelIng);
    // 播放面板显示就让歌词提示框隐藏
    if (!IsPlayPanelIng) {
      ShowOpen("", 1);
    }
  };
  // 无法播放该歌曲
  const error = (e) => {
    if (e.type) {
      let index = CurrentSongIndex + 1;
      const Next = index >= PlayList.length ? 0 : index;
      message.error("无法播放该歌曲", 1);
      Public(dispatch, PlayList, PlayList[Next], Next);
      console.log("小彩蛋,๑乛◡乛๑");
    }
  };
  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        {/* 播放按钮  */}
        <Control isPlaying={IsPlaying}>
          <button
            className="sprite_player prev"
            onClick={(e) => ChangeMusic(-1)}
          ></button>
          <button
            className="sprite_player play"
            onClick={(e) => playMusic()}
          ></button>
          <button
            className="sprite_player next"
            onClick={(e) => ChangeMusic(1)}
          ></button>
        </Control>
        {/* 进度条 */}
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/Player">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{CurrentSong.name}</span>
              <a href="#/" className="singer-name">
                {singerName}
              </a>
            </div>
            <div className="progress">
              <Slider
                defaultValue={0}
                value={CurrentProgress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
                tipFormatter={null}
              />
              <div className="time">
                <span className="now-time">{ShowCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{Showduration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        {/* 工具 */}
        <Operator sequence={Sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button
              className="sprite_player btn loop"
              onClick={(e) => ChangeSequence()}
            ></button>
            <button
              className="sprite_player btn playlist"
              onClick={() => PlayPanel()}
            >
              {PlayList.length}
            </button>
          </div>
        </Operator>
      </div>
      {/* onTimeUpdate 可以监听到当前歌曲播放的时间 */}
      <audio
        ref={audioRef}
        onTimeUpdate={TimeUpdate}
        onEnded={handleMusicEnded}
        onError={error}
      />
      {IsPlayPanelIng && <AppPlayPanel />}
    </PlaybarWrapper>
  );
});
