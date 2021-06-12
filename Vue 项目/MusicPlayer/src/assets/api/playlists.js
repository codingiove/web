import request from "./index";
export function BoutiqueSongList(tag) {
  return request({
    url: "/top/playlist/highquality",
    params: {
      limit: 1,
      cat: tag,
    },
  });
}

export function Playlists(tag, page) {
  return request({
    url: "/top/playlist",
    params: {
      limit: 10,
      offset: (page - 1) * 10,
      cat: tag,
    },
  });
}
