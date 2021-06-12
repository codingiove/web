import request from "./index";
export function LatestMusic(tag) {
  return request({
    url: "/top/song",
    params: {
      type: tag,
      limit: 10,
      offset: 0,
    },
  });
}

export function Sing(id) {
  return request({
    url: "/song/url",
    params: {
      id,
    },
  });
}
