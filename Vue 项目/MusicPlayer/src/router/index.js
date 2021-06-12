import Vue from "vue";
import VueRouter from "vue-router";

const discovery = () => import("../views/01.discovery.vue");
const playlists = () => import("../views/02.playlists.vue");
const songs = () => import("../views/03.songs.vue");
const mvs = () => import("../views/04.mvs.vue");
const playlist = () => import("../views/06.playlist.vue");
const result = () => import("../views/05.result.vue");
const mv = () => import("../views/07.mv.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/discovery",
    },
    {
      // 发现音乐
      path: "/discovery",
      component: discovery,
    },
    {
      // 推荐歌单
      path: "/playlists",
      component: playlists,
    },
    {
      // 推荐歌单
      path: "/playlist",
      component: playlist,
    },
    {
      // 最新音乐
      path: "/songs",
      component: songs,
    },
    {
      // 最新音乐
      path: "/mvs",
      component: mvs,
    },
    // mv详情
    {
      path: "/mv",
      component: mv,
    },
    // 搜索结果页
    {
      path: "/result",
      component: result,
    },
  ],
});

export default router;
