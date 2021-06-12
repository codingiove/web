<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="item in TabsWrap" :key="item">
            <span
              class="title"
              @click="area = item"
              :class="{ active: area == item }"
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="item in TypeTabs" :key="item">
            <span
              class="title"
              @click="type = item"
              :class="{ active: type == item }"
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="item in OrderTabs" :key="item">
            <span
              class="title "
              @click="order = item"
              :class="{ active: order == item }"
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐 MV -->
    <div class="mvs">
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in listdata"
          :key="index"
          @click="toMv(item.id)"
        >
          <div class="img-wrap">
            <img :src="item.cover | SmallPicture(250)" alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount | formatCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <!-- 分页器  -->
      
      <pagination :total="total" :page="page" :GetPageNumber="GetPageNumber" />
    </div>
  </div>
</template>

<script>
import { LatestMV } from "../assets/api/mv";
import Pagination from "../components/Pagination";

export default {
  name: "mvs",
  components: {
    Pagination,
  },
  data() {
    return {
      // 地区
      area: "全部",
      // 类型
      type: "官方版",
      // 排序
      order: "上升最快",
      // 页容量
      limit: 10,
      // 页码
      page: 1,
      // 总条数
      total: 0,

      listdata: [],
      TabsWrap: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      TypeTabs: ["官方版", "原声", "现场版", "网易出品"],
      OrderTabs: ["上升最快", "最热", "最新"],
    };
  },
  created() {
    this.getLatestMV();
  },
  methods: {
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    GetPageNumber(page) {
      this.page = page;
      this.getLatestMV();
    },
    getLatestMV() {
      LatestMV(this.type, this.area, this.order, this.limit, this.page).then(
        (res) => {
          this.listdata = res.data.data;
          if (res.data.count) this.total = res.data.count;
        }
      );
    },
  },
  computed: {
    listenChange() {
      // 依赖其它属性值,只有它依赖的属性值发生改变,才会重新计算
      const { area, type, order } = this;
      return { area, type, order };
    },
  },
  watch: {
    listenChange() {
      this.page = 1;
      this.getLatestMV();
    },
  },
};
</script>

<style></style>
