<template>
  <div class="songs-container">
    <div class="tab-bar">
      <div
        class="item"
        v-for="item in TabBar"
        :key="item.name"
        :class="{ active: tag == item.tag }"
        @click="tag = item.tag"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 底部的 table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr
          class="el-table__row"
          v-for="(item, index) in latestMusic"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <el-image
                :src="item.album.picUrl | SmallPicture(70)"
                alt=""
                lazy
              />
              <span
                class="iconfont icon-play"
                @click="bofanggequ(item.id)"
              ></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | formatDuration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { LatestMusic, Sing } from "../assets/api/songs";
export default {
  name: "songs",
  data() {
    return {
      //最新音乐
      latestMusic: [],
      data: [],
      tag: "0",
      TabBar: [
        { name: "全部", tag: 0 },
        { name: "华语", tag: 7 },
        { name: "欧美", tag: 96 },
        { name: "日本", tag: 8 },
        { name: "韩国", tag: 16 },
      ],
    };
  },
  watch: {
    tag() {
      this.MUsuc();
    },
  },
  created() {
    this.MUsuc();
  },
  methods: {
    MUsuc() {
      LatestMusic(this.tag).then((res) => (this.latestMusic = res.data.data));
    },

    async bofanggequ(Id) {
      const i = this.latestMusic.findIndex((item) => item.id === Id);
      const { url } = await Sing(Id).then((res) => res.data.data[0]);
      const { id, duration: time, album: { blurPicUrl: cover }, album: { name } } = this.latestMusic[i];
      const { name: album } = this.latestMusic[i].artists[0];
      const Song = { id, cover, name, album, time, url }; 
      this.$store.commit("getSong", Song);
    },
  
  },
};
</script>
<style scoped></style>
