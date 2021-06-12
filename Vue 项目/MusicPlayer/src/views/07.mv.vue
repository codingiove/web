<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="url"
          class="On-video-wrap"
          autoplay
          controlslist="nodownload"
          disablePictureInPicture
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon" alt="" />
          </div>
          <span class="name">{{ mVInformations.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mVInformations.name }}</h2>
          <span class="date">发布：{{ mVInformations.publishTime }}</span>
          <span class="number"
            >播放：{{ mVInformations.playCount | formatCount }}次</span
          >
          <p class="desc">
            {{ mVInformations.desc }}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <comment
        title="精彩评论"
        :total="hotCommentstotal"
        :comments_list="hotComments"
      />
      <!-- 最新评论 -->
      <comment
        title="最新评论"
        :total="ComMentstotal"
        :comments_list="ComMents"
      />
      <!-- 分页器 -->
      <pagination
        :total="total"
        :page="page"
        :GetPageNumber="handleCurrentChange"
      />
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs" v-for="item in RelatedMVurl" :key="item.id">
        <div class="items" @click="GoToMv(item.id)">
          <div class="item">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | formatCount }}</div>
              </div>
              <span class="time">{{ item.duration | formatDuration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  goMV,
  RelatedMV,
  MVInformation,
  SingerInformation,
  MVReview,
} from "../assets/api/mvs";
import comment from "../components/comment";
import Pagination from "../components/Pagination.vue";
export default {
  components: {
    comment,
    Pagination,
  },
  name: "Video",
  data() {
    let audio = document.getElementById("audio");
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // 视频路径
      url: "",
      RelatedMVurl: [],
      mVInformations: [],
      icon: "",
      ComMents: [],
      ComMentstotal: 0,
      hotComments: [],
      hotCommentstotal: 0,
    };
  },
  created() {
    this.SendChanges();
  },
  methods: {
    handleCurrentChange(page) {
      this.page = page;
      MVReview(this.$route.query.id, 10, this.page).then((res) => {
        this.ComMents = res.data.comments;
        this.ComMentstotal = res.data.total;
        if (this.page === 1) {
          this.hotComments = res.data.hotComments;
          this.hotCommentstotal = res.data.hotComments.length;
        }
      });
    },
    SendChanges() {
      let mvid = this.$route.query.id;
      // 视频链接
      goMV(mvid).then((res) => {
        this.url = res.data.data.url;
      });
      // 相关视频
      RelatedMV(mvid).then((res) => {
        this.RelatedMVurl = res.data.mvs;
      });
      // MV 信息
      MVInformation(mvid).then((res) => {
        this.mVInformations = res.data.data;
        SingerInformation(this.mVInformations.artists[0].id).then((res) => {
          this.icon = res.data.artist.picUrl;
        });
      });
      // MV 评论
      MVReview(mvid, 10, this.page).then((res) => {
        this.ComMents = res.data.comments;
        this.ComMentstotal = res.data.total;
        this.hotComments = res.data.hotComments;
        this.hotCommentstotal = res.data.hotComments.length;
        this.total = res.data.total;
      });
    },
    GoToMv(id) {
      this.$router.push(`/mv?id=${id}`);
      this.SendChanges();
    },
  },
  mounted() {
    audio.pause();
    this.$store.commit("Sethide");
  },
  beforeRouteLeave(to, from, next) {
    audio.play();
    this.$store.commit("Sethide");
    next();
  },
};
</script>

<style></style>
