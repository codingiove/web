import request from "./request";
// 获取歌曲信息
export function getSongDetail(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids,
    },
  });
}
// 歌词
export function getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id,
    },
  });
}
// 获取歌单详情
export function GetPlaylistDetails(id) {
  // https://autumnfish.cn
  return request({
    url: "https://autumnfish.cn/playlist/detail",
    params: {
      id,
    },
  });
}
