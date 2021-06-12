import request from "./index";

export function GetBanner() {
  return request({
    url: "/banner",
  });
}

export function PlayList() {
  return request({
    url: "/personalized",
    params: {
      limit: 10,
    },
  });
}

export function LatestMusic() {
  return request({
    url: "/personalized/newsong",
  });
}

export function PlayMusic(id) {
  return request({
    url: "/song/url",

    params: {
      id,
    },
  });
}

export function BroaDcastMv() {
  return request({
    url: "/personalized/mv",
  });
}
