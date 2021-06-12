<template>
  <view class="home">
    <view class="home_navbar">
      <view
        class="navbar_item"
        v-for="(item, index) in navbar_item"
        :key="index"
        :class="{ active: currentindex === index }"
        @click="Togglenavbar(index)"
      >
        {{ item.title }}
      </view>
      <view class="iconfont icon-sousuo-copy"></view>
    </view>

    <recommend v-if="currentindex == 0" />
    <classify v-if="currentindex == 1" />
    <newest v-if="currentindex == 2" />
    <album v-if="currentindex == 3" />
  </view>
</template>

<script>
import recommend from "./childrenitem/recommend.vue";
import classify from "./childrenitem/classify.vue";
import newest from "./childrenitem/newest.vue";
import album from "./childrenitem/album.vue";
export default {
  components: {
    recommend,
    classify,
    newest,
    album,
  },
  data() {
    return {
      // navbar数据
      navbar_item: [
        {
          title: "推荐",
          id: 0,
        },
        {
          title: "分类",
          id: 1,
        },
        {
          title: "最新",
          id: 2,
        },
        {
          title: "专辑",
          id: 3,
        },
      ],
      // navbar索引
      currentindex: 0,
    };
  },
  onLoad() {},
  methods: {
    Togglenavbar(index) {
      this.currentindex = index;
    },
  },
};
</script>

<style lang="scss">
.home_navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 750rpx;
  position: relative;

  .navbar_item {
    width: 15%;
    height: 90rpx;
    text-align: center;
    line-height: 90rpx;
  }

  .iconfont {
    font-size: 22px;
    color: #ccc;
    position: absolute;
    right: 5%;
  }
}
.active {
  color: #de3977;
  border-bottom: 2px solid #de3977;
}
.topc {
  font-size: 50rpx;
  position: fixed;
  top: 100px;
  right: 0;
  z-index: 66;
}
</style>
