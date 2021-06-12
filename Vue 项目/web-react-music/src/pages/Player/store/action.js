import { getSongDetail, getLyric } from "../../../services/Player.js";
import * as actionType from "./constant.js";
import { getRandom } from "../../../utils/math-utils";
import { ParseLyric } from "../../../utils/parse-lyric";
// 传入 song 表示是请求的歌曲
export function Public(dispatch, PlayList, CurrentSong, index, song) {
  // 更改播放列表
  if (PlayList) dispatch({ type: actionType.CHANGE_PLAY_LIST, PlayList });
  // 更改当前歌曲
  if (CurrentSong)
    dispatch({ type: actionType.CHANGE_CURRENT_SONG, CurrentSong });
  // 更改当前歌曲索引  0转换布尔是 false
  if (index >= 0)
    dispatch({ type: actionType.CHANGE_CURRENT_SONG_INDEX, index });
  // 请求该歌曲的歌词
  if (PlayList[index]) dispatch(getLyricAction(PlayList[index].id || song.id));
}

// 获取歌曲
export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    // 根据 id 查找播放列表中是否已经有了该歌曲
    const playList = getState().getIn(["Player", "PlayList"]);
    const songIndex = playList.findIndex((song) => song.id === ids);
    let song = null;
    // 判断是否找到歌曲
    if (songIndex !== -1) {
      // 找到了
      Public(dispatch, playList, playList[songIndex], songIndex);
    } else {
      // 没有找到歌曲,请求歌曲
      getSongDetail(ids).then((res) => {
        song = res.songs && res.songs[0];
        if (!song) return;
        // 将最新请求到的歌曲添加到播放列表中
        const newPlayList = [...playList];
        newPlayList.push(song); // 添加到最后

        let last = newPlayList.length - 1;
        Public(dispatch, newPlayList, newPlayList[last], last, song);
      });
    }
  };
};

// 播放顺序
export const getSequenceAction = (sequence) => {
  return (dispatch) => {
    dispatch({
      type: actionType.CHANGE_SEQUENCE,
      sequence,
    });
  };
};
// 切换当前索引和歌曲
export const ChangeCurrentIndexAndSongAction = (tag) => {
  return (dispatch, getState) => {
    const PlayList = getState().getIn(["Player", "PlayList"]);
    const Sequence = getState().getIn(["Player", "sequence"]);
    let CurrentSongIndex = getState().getIn(["Player", "CurrentSongIndex"]);
    switch (Sequence) {
      // 随机播放
      case 1:
        if (PlayList.length > 1) {
          // 生成随机数
          let RandomIndex = getRandom(PlayList.length);
          // 判断当前随机数 和 当前歌曲索引,一样代表是刚刚那首歌
          while (RandomIndex === CurrentSongIndex) {
            RandomIndex = getRandom(PlayList.length);
          }
          CurrentSongIndex = RandomIndex;
        }
        break;
      // 顺序播放
      default:
        CurrentSongIndex += tag;
        if (CurrentSongIndex >= PlayList.length) CurrentSongIndex = 0; // 最后一首歌,跳到第一首
        if (CurrentSongIndex < 0) CurrentSongIndex = PlayList.length - 1; // 第一首歌,跳到最后一首
    }
    dispatch({
      type: actionType.CHANGE_CURRENT_SONG,
      CurrentSong: PlayList[CurrentSongIndex],
    });
    dispatch({
      type: actionType.CHANGE_CURRENT_SONG_INDEX,
      index: CurrentSongIndex,
    });
    // 请求该歌曲的歌词
    dispatch(getLyricAction(PlayList[CurrentSongIndex].id));
  };
};

// 歌词
export const getLyricAction = (id) => {
  return (dispatch) => {
    getLyric(id).then((res) => {
      const lyric = res.lrc && res.lrc.lyric;
      if (lyric) {
        const lyricList = ParseLyric(lyric);
        dispatch({
          type: actionType.CHANGE_LYRIC_LIST,
          lyricList,
        });
      } else {
        // 没有歌词
        dispatch({
          type: actionType.CHANGE_LYRIC_LIST,
          lyricList: [],
        });
      }
    });
  };
};

// 当前歌词索引
export const getCurrentLyricIndex = (index) => {
  return {
    type: actionType.CHANGE_CURRENT_LYRIC_INDEX,
    index,
  };
};

// 删除歌曲
export const getDeleteCurrentSongAction = (id) => {
  return (dispatch, getState) => {
    const PlayList = getState().getIn(["Player", "PlayList"]);
    const CurrentSongIndex = getState().getIn(["Player", "CurrentSongIndex"]);
    const CurrentIndex = PlayList.findIndex((item) => item.id === id);

    let NewPlayList = [...PlayList];
    NewPlayList.splice(CurrentIndex, 1);

    let Length = NewPlayList.length;

    if (Length === 0) {
      return dispatch({ type: actionType.CHANGE_PLAY_LIST, PlayList: [] });
    }
    // 只有两首歌时,再删除,赋值到第一首歌 或者 删除最后一首歌
    if (Length === 1 || Length === CurrentIndex) {
      let result = Length === 1 ? 0 : Length - 1;
      return Public(dispatch, NewPlayList, NewPlayList[result], result);
    }
    // 删除小于当前索引的
    if (CurrentIndex < CurrentSongIndex) {
      const index = CurrentSongIndex - 1;
      dispatch({ type: actionType.CHANGE_PLAY_LIST, PlayList: NewPlayList });
      return dispatch({ type: actionType.CHANGE_CURRENT_SONG_INDEX, index });
    }
    // 删除当前歌曲
    if (CurrentIndex === CurrentSongIndex) {
      const item = NewPlayList[CurrentIndex];
      Public(dispatch, NewPlayList, item);
    } else {
      // 删除大于当前索引的
      dispatch({ type: actionType.CHANGE_PLAY_LIST, PlayList: NewPlayList });
    }
  };
};
