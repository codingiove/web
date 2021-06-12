<template>
  <view class="father">
    <view class="auto">
      <view class="index_navbar">
        <view
          v-for="(item, index) in list"
          :key="item.id"
          :class="{ active: activeClass === index }"
          class="title"
          @click="tabclick(index, item)"
          >{{ item.name }}</view
        >
      </view>
    </view>
    <!-- 设置 -->
    <view class="Setting iconfont icon-shezhi"></view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      activeClass: 0,
    };
  },
  methods: {
    // tab 切换
    tabclick(index, { name }) {
      this.activeClass = index;
      this.$emit("tabclick", index, name);
    },
  },
};
</script>
<style scoped lang="scss">
.father {
  position: relative;
}
.auto {
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  .index_navbar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 90rpx;
    .title {
      padding: 0 20rpx;
      color: #333;
      font-size: 30rpx;
      display: inline-block;
      flex-shrink: 0;
    }
    .active {
      color: $stock;
    }
  }
}
.Setting {
  font-size: 50rpx;
  position: absolute;
  top: 0;
  right: 0;
  width: 100rpx;
  height: 90rpx;
  background: #fff;
  text-align: center;
  line-height: 100rpx;
}
</style>
