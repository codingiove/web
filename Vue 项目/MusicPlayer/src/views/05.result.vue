<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ $route.query.search }}</h2>
      <span class="sub-title">找到 {{ songCount }} 个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="1">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in searchData"
              :key="item.id"
              @click="Playcurrentsong(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <div v-html="item.name"></div>
                    <span v-if="item.mvid != 0" class="iconfont icon-mv"></span>
                  </div>
                  <span v-if="item.alias.length != 0">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | formatDuration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="1000">
        <div class="items">
          <div class="item" v-for="(i, index) in playlists" :key="index">
            <div class="img-wrap" @click="tggedan(i.id)">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ i.playCount | formatCount }}</span>
              </div>
              <img :src="i.coverImgUrl | SmallPicture(200)" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ i.name }}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="MV" name="1004">
        <div class="items mv">
          <div
            class="item"
            v-for="(i, index) in mvs"
            :key="index"
            @click="tpMV(i.id)"
          >
            <div class="img-wrap">
              <img :src="i.cover | SmallPicture(250)" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ i.playCount | formatCount }}</div>
              </div>
              <span class="time">{{ i.duration | formatDuration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ i.name }}</div>
              <div class="singer">{{ i.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- 分页器  -->

      <pagination
        :total="songCount"
        :page="page"
        :GetPageNumber="GetPageNumber"
      />
    </el-tabs>
  </div>
</template>

<script>
import { searchkey } from "../assets/api/result";
import { PlayMusic } from "../assets/api/discovery";
import Pagination from "../components/Pagination";

export default {
  name: "Result",
  components: {
    Pagination,
  },
  data() {
    return {
      activeIndex: "1",
      searchData: [],
      playlists: [],
      mvs: [],
      // 搜索结果
      songCount: 0,
      type: 1,
      page: 1,
    };
  },
  created() {
    this._searchkey();
  },
  methods: {
    Playcurrentsong(id) {
      let list = this.searchData;
      const search = this.$route.query.search;
      const Index = list.findIndex((item) => item.id === id);
      PlayMusic(id).then((res) => {
        const { url } = res.data.data[0];
        const { id, duration: time, artists } = list[Index];
        const newname = list[Index].name.replace(
          `<span style="color:#4AAAFF">${search}</span>`,
          " "
        );
        const Song = {
          id,
          name: search + newname,
          album: artists[0].name,
          time,
          url,
        };
        this.$store.commit("getSong", Song);
      });
    },
    _searchkey() {
      searchkey(this.$route.query.search, this.type, this.page).then((res) => {
        let result = res.data.result;
        if (this.type === 1) {
          this.searchData = result.songs;
          this.Keyword(result.songs);
          this.songCount = result.songCount;
        } else if (this.type === 1000) {
          this.playlists = result.playlists;
          this.songCount = result.playlistCount;
        } else {
          this.mvs = result.mvs;
          this.songCount = result.mvCount;
        }
      });
    },
    tggedan(id) {
      this.$router.push("/playlist?id=" + id);
    },
    tpMV(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    GetPageNumber(page) {
      this.page = page;
      this._searchkey();
    },
    // 关键字高亮
    Keyword(array) {
      let search = this.$route.query.search;
      for (let i = 0; i < array.length; i++) {
        if (array[i].name.includes(search)) {
          array[i].name = array[i].name.replace(
            search,
            `<span style="color:#4AAAFF">${search}</span>`
          );
        }
      }
    },
  },

  watch: {
    activeIndex() {
      [1, 1000, 1004].some((item) => {
        if (+this.activeIndex === item) {
          this.type = item;
          this.page = 1;
          return this._searchkey(item);
        }
      });
    },
    "$route.query.search"() {
      this._searchkey();
    },
  },
};
</script>

<style>
.el-table__row {
  cursor: pointer;
}
</style>
