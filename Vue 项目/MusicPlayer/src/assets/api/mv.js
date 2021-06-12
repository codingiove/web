import request from "./index";

export function LatestMV(type, area, order, limit, page) {
  return request({
    url: "/mv/all",
    params: {
      area,
      type,
      order,
      limit,
      offset: (page - 1) * limit,
    },
  });
}
