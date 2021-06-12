import { Map } from "immutable";
import * as actionType from "./constant";
/* 
假如你 reducer 数据里面有 Banners,Newproducts 还有一些其他数据
你每次做修改时都拷贝一份有点浪费性能,可能我只修改了 Banners,但我用 ...扩展运算符时又把 Newproducts 拷贝了一份
这样有点浪费性能,因为我没对 Newproducts 做修改;
immutable 会引用你之前的对象,然后返回一个新的对象,而那个新的对象就是你改的数据
*/
const defaultState = Map({
  Banners: [],
  HotRecommends: [],
  NewAlbums: [],
  upRanking: {},
  newRanking: {},
  originRanking: {},
});
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionType.CHANGE_Banners:
      return state.set("Banners", action.Banners);
    case actionType.CHANGE_HotRecommends:
      return state.set("HotRecommends", action.HotRecommends);
    case actionType.CHANGE_New_Albums:
      return state.set("NewAlbums", action.NewAlbums);
    case actionType.CHANGE_UP_RANKING:
      return state.set("upRanking", action.upRanking);
    case actionType.CHANGE_NEW_RANKING:
      return state.set("newRanking", action.newRanking);
    case actionType.CHANGE_ORIGIN_RANKING:
      return state.set("originRanking", action.originRanking);
    default:
      return state;
  }
}
export default reducer;
