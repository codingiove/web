<template>
  <div class="index-container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <keep-alive exclude="Details,Video,Result">
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="player">
      <AudioCpn />
    </div>
  </div>
</template>

<script>
import AudioCpn from "./audio";
export default {
  components: { AudioCpn },
  name: "index",
  data() {
    return {};
  },
};
</script>

<style></style>
