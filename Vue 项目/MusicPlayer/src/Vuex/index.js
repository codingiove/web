import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 歌曲列表
    SongList: [],
    // 当前播放歌曲的索引
    SongIndex: 0,
    // 当前播放歌曲信息
    Song: { cover: "", name: "", artist: "", time: "", url: "", id: "" },
    // 是否隐藏播放栏
    hide: false,
  },
  mutations: {
    // 获取歌曲
    getSong(state, Song) {
      const SongIndex = state.SongList.findIndex((item) => item.id === Song.id);
      // 有
      if (SongIndex !== -1) {
        state.SongIndex = SongIndex;
        state.Song = state.SongList[SongIndex];
        // 没有
      } else {
        state.SongList.push(Song);
        const last = state.SongList.length - 1;
        state.SongIndex = last;
        state.Song = state.SongList[last];
      }
    },
    // 播放全部
    PlayAll(state, Song) {
      const SongIndex = state.SongList.findIndex((item) => item.id === Song.id);
      if (SongIndex === -1) {
        state.SongList.push(Song);
        let length = state.SongList.length;
        if (length > 10) {
          setTimeout(() => {
            state.SongIndex = length - 10;
          }, 100);
        } else {
          state.Song = state.SongList[0];
        }
      }
    },
    // 是否隐藏播放栏
    Sethide(state) {
      state.hide = !state.hide;
    },
  },
});
