import request from "./index";
export function PlaylistDetailsPage(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id,
    },
  });
}
export function Songreviews(id, type) {
  return request({
    url: "/comment/hot",
    params: {
      id,
      type,
    },
  });
}

export function LatestEvaluation(id, limit,page) {
  return request({
    url: "/comment/playlist",
    params: {
      id,
      limit,
      offset: (page - 1) * limit,
      page,
    },
  });
}
