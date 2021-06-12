import * as actionType from "./constant";
import {
  getBanners,
  getHotRecommends,
  getNewAlbum,
  RankingList,
} from "@/services/recommend.js";
// ({}) 这个返回一个对象
// const changeBannersAction = (res) => ({
//   type: actionType.CHANGE_Banners,
//   Banners: res.banners,
// });
/* 
dispatch 会执行网络请求的

*/
// 请求轮播图
export const getBannersAction = () => {
  return (dispatch) => {
    getBanners().then((res) => {
      dispatch({
        type: actionType.CHANGE_Banners,
        Banners: res.banners,
      });
    });
  };
};
// 请求热门推荐
export const getHotRecommendsAction = (limit) => {
  return (dispatch) => {
    getHotRecommends(limit).then((res) => {
      dispatch({
        type: actionType.CHANGE_HotRecommends,
        HotRecommends: res.result,
      });
    });
  };
};
// 新碟上架数据
export const getNewAlbumAction = (limit) => {
  return (dispatch) => {
    getNewAlbum(limit).then((res) => {
      dispatch({
        type: actionType.CHANGE_New_Albums,
        NewAlbums: res.albums,
      });
    });
  };
};

// 榜单数据
export const RankingListAction = (idx) => {
  return (dispatch) => {
    RankingList(idx).then((res) => {
      switch (idx) {
        case 0:
          dispatch({
            type: actionType.CHANGE_UP_RANKING,
            upRanking: res.playlist,
          });
          break;
        case 2:
          dispatch({
            type: actionType.CHANGE_NEW_RANKING,
            newRanking: res.playlist,
          });
          break;
        case 3:
          dispatch({
            type: actionType.CHANGE_ORIGIN_RANKING,
            originRanking: res.playlist,
          });
          break;
        default:
      }
    });
  };
};
