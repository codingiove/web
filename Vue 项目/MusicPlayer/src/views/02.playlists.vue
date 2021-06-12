<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card" v-if="UncertainValue('coverImgUrl')">
      <div class="icon-wrap">
        <img :src="UncertainValue('coverImgUrl') | SmallPicture(160)" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{ UncertainValue("name") }}
        </div>
        <div class="info">
          {{ UncertainValue("description") }}
        </div>
      </div>
      <img :src="UncertainValue('coverImgUrl')" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>

    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <div
          v-for="item in TabBar"
          :key="item"
          class="item"
          :class="{ active: tag == item }"
          @click="tag = item"
        >
          {{ item }}
        </div>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in playlists"
            :key="index"
            @click="toPlayList(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | formatCount }}</span>
              </div>
              <img :src="item.coverImgUrl | SmallPicture(200)" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器  -->
    <pagination :total="total" :page="page" :GetPageNumber="GetPageNumber" />
  </div>
</template>

<script>
import { BoutiqueSongList, Playlists } from "../assets/api/playlists.js";
import pagination from "../components/Pagination.vue";
export default {
  name: "recommend",
  components: {
    pagination,
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //精品歌单
      Boutiqueplaylist: [],
      //歌单列表
      playlists: [],
      // 当前高亮
      tag: "全部",
      TabBar: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行",
      ],
      top_card: 0,
    };
  },
  //监听器,观察数据改变
  watch: {
    tag() {
      this.page = 1;
      this.topData();
      this.listData();
    },
  },
  created() {
    this.topData();
    this.listData();
  },
  methods: {
    toPlayList(id) {
      this.$router.push(`/playlist?id=${id}`);
    },
    // 精品歌单
    topData() {
      BoutiqueSongList(this.tag).then((res) => {
        this.Boutiqueplaylist = res.data.playlists[0];
      });
    },
    listData() {
      Playlists(this.tag, this.page).then((res) => {
        this.total = res.data.total;
        this.playlists = res.data.playlists;
      });
    },
    // 切换分页
    GetPageNumber(page) {
      this.page = page;
      this.listData();
    },
    // 有值才去取
    UncertainValue(val) {
      const Creator = this.Boutiqueplaylist;
      if (Creator) {
        return Creator[val];
      }
    },
  },
};
</script>

<style></style>
