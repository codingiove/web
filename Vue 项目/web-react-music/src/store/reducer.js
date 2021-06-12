import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../pages/discover/Subpage/recommend/store/index";
import { reducer as PlayerReducer } from "../pages/Player/store/reducer.js";
// 合并 reducer
const cReducer = combineReducers({
  recommend: recommendReducer,
  Player: PlayerReducer,
});

export default cReducer;
