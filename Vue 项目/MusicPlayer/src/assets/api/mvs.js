import request from "./index";
export function goMV(id) {
  return request({
    url: "/mv/url",
    params: {
      id,
    },
  });
}
export function RelatedMV(mvid) {
  return request({
    url: "/simi/mv",
    params: {
      mvid,
    },
  });
}

export function MVInformation(mvid) {
  return request({
    url: "/mv/detail",
    params: {
      mvid,
    },
  });
}

export function SingerInformation(id) {
  return request({
    url: "/artists",
    params: {
      id,
    },
  });
}

export function MVReview(id, limit, page) {
  return request({
    url: "/comment/mv",
    params: {
      id,
      limit,
      page,
      offset: (page - 1) * limit,
    },
  });
}
