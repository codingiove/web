import request from "./index";
export function searchkey(keywords, type, page) {
  return request({
    url: "/search",
    params: {
      type,
      keywords,
      limit: 10,
      page,
      offset: (page - 1) * 10,
    },
  });
}
