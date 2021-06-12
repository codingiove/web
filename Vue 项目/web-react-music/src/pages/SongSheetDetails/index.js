import React, { memo, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPlaylistDetails } from "../../services/Player";
import { formatDate, formatMinuteSecond } from "../../utils/format-utils";
import { Public, getSongDetailAction } from "../Player/store/action";
import { PlaylistWrapTop, SongWarp, Tr } from "./style";

export default memo(function SongSheetDetails(props) {
  let Id = props.location.search.split("=")[1];
  const dispatch = useDispatch();

  const { CurrentSong, PlayListAddTo } = useSelector((state) => ({
    CurrentSong: state.getIn(["Player", "CurrentSong"]),
    PlayListAddTo: state.getIn(["Player", "PlayList"]),
  }));

  const [Playlist, setPlaylist] = useState({});
  const [OpenClass, SetOpenClass] = useState(false);
  const [WhetherOpen, SetWhetherOpen] = useState(false);

  const IntroduceRef = useRef();

  useEffect(() => {
    GetPlaylistDetails(Id).then((res) => {
      setPlaylist(res.playlist);
      if (IntroduceRef.current.offsetHeight >= 100) {
        SetOpenClass(true);
        SetWhetherOpen(true);
      }
    });
  }, [Id]);

  const Worthy = (value, number = 0) => {
    if (Playlist.creator && number === 0) {
      return Playlist.creator[value];
    } else {
      return Playlist[value] || [];
    }
  };
  // 歌曲列表播放
  const Play = (id) => {
    dispatch(getSongDetailAction(id));
  };
  // 蓝播放
  const ContentPlay = (e) => {
    const { tracks } = Playlist;
    e.preventDefault();
    Public(dispatch, tracks, tracks[0], 0);
  };
  // 新增数据
  const PlayListAdd = (e) => {
    e.preventDefault();
    const PlayList = [...PlayListAddTo];
    PlayList.push(...Playlist.tracks);

    let newArr = [...new Set(PlayList)]; // 去重
    dispatch({ type: "CHANGE_PLAY_LIST", PlayList: newArr });
  };
  // 展开
  const Open = (e) => {
    e.preventDefault();
    SetOpenClass(!OpenClass);
  };

  return (
    <>
      <PlaylistWrapTop>
        <div className="playlist-img-wrap">
          <img src={Playlist.coverImgUrl + "?param=200y200"} alt="" />
        </div>
        <div className="song-list">
          <div className="song-head">
            <i className="sprite_icon2"></i>
            <h2 className="title">{Playlist.name}</h2>
          </div>
          <div className="song-user">
            <img src={Worthy("avatarUrl") + "?param=40y40"} alt="" />
            <span className="name">{Worthy("nickname")}</span>
            <span className="time">
              {formatDate(Playlist.createTime, "yyyy-MM-dd")} 创建
            </span>
          </div>
          <div className="content-operation">
            <a
              href="#/"
              className="playA sprite_button"
              onClick={(e) => ContentPlay(e)}
            >
              <i className="sprite_button">
                <em className="play sprite_button"></em>
                播放
              </i>
            </a>
            <a
              href="#/"
              className="add sprite_button"
              onClick={(e) => PlayListAdd(e)}
            >
              {" "}
            </a>
            <a href="#/" className="comment sprite_button">
              <i className="sprite_button">
                <span className="comment_count sprite_button">
                  ({Playlist.commentCount})
                </span>
              </i>
            </a>
          </div>
          <div className="song-Tag">
            <div className="tag">标签： </div>
            {Worthy("tags", 1).map((item) => {
              return <span key={item}>{item}</span>;
            })}
          </div>
          <div className="song-introduce" ref={IntroduceRef}>
            <p style={{ whiteSpace: OpenClass ? "nowrap" : null }}>
              <b>介绍：</b>
              {Worthy("description", 1)}
            </p>
          </div>
          <div className="song-spread-wrap" onClick={(e) => Open(e)}>
            {WhetherOpen && <a href="#/">{OpenClass ? " 展开" : "收起"}</a>}
          </div>
        </div>
      </PlaylistWrapTop>
      <SongWarp className="song-warp">
        <div className="wrap">
          <div className="song-title">
            <h3>歌曲列表</h3>
            <span>{Playlist && Playlist.trackCount}首歌</span>
            <div className="Playback-times-wrap">
              播放：
              <strong>{Playlist && Playlist.playCount}</strong>次
            </div>
          </div>

          <div className="song-list">
            <table className="table">
              <thead>
                <tr>
                  <th className="w1 sprite_table"></th>
                  <th className="sprite_table">歌曲标题</th>
                  <th className="w2 sprite_table">时长</th>
                  <th className="w3 sprite_table">歌手</th>
                  <th className="w4 sprite_table">专辑</th>
                </tr>
              </thead>
              <tbody>
                {Worthy("tracks", 1).map((item, index) => {
                  return (
                    <Tr key={item.id} onClick={() => Play(item.id, index)}>
                      <td className="left">
                        <div className="hd">
                          <span
                            className={`ply sprite_table ${
                              item.id === CurrentSong.id ? "plyRed" : null
                            }`}
                          ></span>
                          <span className="num">{index + 1}</span>
                        </div>
                      </td>
                      <td className="ellipsis">{item.name}</td>
                      <td>{formatMinuteSecond(item.dt)}</td>
                      <td className="ellipsis">{item.ar[0].name}</td>
                      <td className="ellipsis">{item.al.name}</td>
                    </Tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </SongWarp>
    </>
  );
});
