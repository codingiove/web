<template>
  <div class="playlist-container">
    <div class="top-wrap" v-if="playlist.coverImgUrl">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl | SmallPicture(200)" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <img
            class="avatar"
            :src="UncertainValue('avatarUrl') | SmallPicture(35)"
            alt=""
          />

          <span class="name">{{ UncertainValue() }}</span>
          <span class="time">{{ playlist.createTime | Time }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play" @click="Playall"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="item in playlist.tags" :key="item.id">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap" :class="{ ShowUnfold: DynamicUnfold }">
          <span class="title">简介:</span>
          <span class="desc" ref="desc_wrap">
            {{ playlist.description }}
          </span>
          <div
            v-if="!ExecuteOnce"
            class="unfold"
            @click="DynamicUnfold = !DynamicUnfold"
          >
            {{ DynamicUnfold ? "展开" : "收起" }}
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
              v-for="(item, index) in tracks"
              :key="item.id"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap" @click="playMusics(item.id)">
                  <img :src="item.al.picUrl | SmallPicture(70)" alt="" />
                  <span class="iconfont icon-play"></span>
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
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.dt | formatDuration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane :label="`评论 ${Numberofreviews + total}`" name="2">
        <!-- 精彩评论 -->
        <comment
          title="精彩评论"
          :total="Numberofreviews"
          :comments_list="Songreviews"
        />

        <!-- 最新评论 -->
        <comment title="最新评论" :total="total" :comments_list="comments" />
        <!-- 分页器 -->

        <pagination
          :total="total"
          :page="page"
          :GetPageNumber="GetPageNumber"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  PlaylistDetailsPage,
  Songreviews,
  LatestEvaluation,
} from "../assets/api/playlist";
import { PlayMusic } from "../assets/api/discovery";
import comment from "../components/comment";
import Pagination from "../components/Pagination.vue";

export default {
  name: "Details",
  components: {
    comment,
    Pagination,
  },
  data() {
    return {
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      playlist: {},
      tracks: [],
      Songreviews: [],
      Numberofreviews: 0,
      comments: [],
      DynamicUnfold: false,
      ExecuteOnce: true,
    };
  },

  created() {
    // 歌曲评论
    Songreviews(this.$route.query.id, 2).then((res) => {
      this.Numberofreviews = res.data.total;
      this.Songreviews = res.data.hotComments;
    });
    // 播放列表详细信息页面
    PlaylistDetailsPage(this.$route.query.id, this.page).then((res) => {
      this.playlist = res.data.playlist;
      this.tracks = res.data.playlist.tracks;
    });
    this._LatestEvaluation();
  },
  updated() {
    // 简介内容高度大于100就让它隐藏,并且只执行一次
    const desc = this.$refs.desc_wrap;
    const OffsetHeight = desc && desc.offsetHeight >= 100;
    if (OffsetHeight && this.ExecuteOnce) {
      this.ExecuteOnce = false; // 条件满足表示高度大于100,渲染 unfold div
      this.DynamicUnfold = true;
    }
  },
  methods: {
    // 获取当前页码
    GetPageNumber(page) {
      this.page = page;
      this._LatestEvaluation();
    },
    // 最新评论
    _LatestEvaluation() {
      LatestEvaluation(this.$route.query.id, 10, this.page).then((res) => {
        this.total = res.data.total;
        this.comments = res.data.comments;
      });
    },
    // 播放音乐
    playMusics(id) {
      const Index = this.tracks.findIndex((item) => item.id === id);
      this.Songinformation(id, Index, "getSong");
    },
    // 播放全部
    Playall() {
      for (let i = 0; i < this.tracks.length; i++) {
        this.Songinformation(this.tracks[i].id, i, "PlayAll");
      }
    },
    async Songinformation(Id, i, commit) {
      const { url } = await PlayMusic(Id).then((res) => res.data.data[0]);
      const {name,id , dt: time, al: { picUrl: cover } } = this.tracks[i];
      const { name: album } = this.tracks[i].ar[0];
      const Song = { id, cover, name, album, time, url };
      this.$store.commit(commit, Song);
    },
    // PlayMusic(id).then((res) => {
    //   const { url } = res.data.data[0];
    //   const {
    //     name,
    //     id,
    //     dt: time,
    //     al: { picUrl: cover },
    //   } = this.tracks[i];
    //   const { name: album } = this.tracks[i].ar[0];
    //   const Song = { id, cover, name, album, time, url };
    //   this.$store.commit(commit, Song);
    // });

    UncertainValue(val = "nickname") {
      const Creator = this.playlist.creator;
      return Creator && Creator[val];
    },
  },
};
</script>
