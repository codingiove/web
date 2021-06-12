<template>
  <view class="index">
    <!-- 状态栏 -->
    <view :style="{ paddingTop: StatusBar + 'px' }"></view>
    <view class="index_bg">
      <view class="search">
        <view class="iconfont icon-sousuo1"></view>
        uni-app
      </view>
    </view>
    <!-- 导航栏 -->
    <navbar :list="NavBar" @tabclick="tabclick" ref="navbar"></navbar>
    <navbar
      :list="NavBar"
      @tabclick="tabclick"
      v-show="fixed"
      class="fixed"
      ref="navbar2"
    ></navbar>

    <!-- 卡片 -->
    <scroll-view scroll-y>
      <card
        @Rotation="Rotation"
        :Rotation_index="Rotation_index"
        :list="Index_list[Rotation_index]"
      />
    </scroll-view>
  </view>
</template>

<script>
import navbar from "../components/navbar/navbar";
import card from "../components/card/card";
export default {
  data() {
    return {
      token: "",
      NavBar: [], // 导航栏内容
      NavBarName: "后端开发", // 获取导航栏内容然后发送网络请求
      StatusBar: 0, // 状态栏高度
      fixed: false, // 状态栏固定
      Rotation_index: 0, // 轮播页数
      Index_list: {}, // 首页数据
    };
  },
  components: {
    navbar,
    card,
  },
  onLoad() {
    // 获取 token
    uni.getStorage({
      key: "token",
      success: (res) => (this.token = res.data),
    });
    // 首页数据
    this.login(0);
    // 手机信息
    const info = uni.getSystemInfoSync();
    this.StatusBar = info.statusBarHeight;
  },

  methods: {
    // 首页数据
    login(current) {
      this.$http({
        url: "/home",
        header: {
          token: this.token,
        },
        data: {
          classify: this.NavBarName,
        },
      }).then((res) => {
        if (this.NavBar.length <= 0) {
          this.NavBar = res.data.data; // 导航栏
        }
        this.$set(this.Index_list, current, res.data.result);
        console.log(this.Index_list);
      });
    },
    // 导航栏,点击切换
    tabclick(index, name) {
      this.Rotation_index = index;
      name && (this.NavBarName = name);
      this.$refs.navbar2.activeClass = index;
      this.$refs.navbar.activeClass = index;
      this.login(index);
    },
    // 滑动轮播图,导航栏显示对应的内容
    Rotation(Rotation_index) {
      this.tabclick(Rotation_index);
    },
  },
  // 吸顶效果
  onPageScroll(scroll) {
    let Top = this.$refs.navbar.$el.offsetTop;
    let { scrollTop } = scroll;
    if (scrollTop >= Top) {
      this.fixed = true;
    } else {
      this.fixed = false;
    }
  },
};
</script>
<style scoped lang="scss">
page {
  height: 100%;
}
.index_bg {
  background-color: $stock;
  height: 90rpx;
  padding: 0 40rpx;
  display: flex;
  align-items: center;
  justify-items: center;
  .search {
    background-color: #fff;
    color: rgb(82, 80, 80);
    border-radius: 40rpx;
    line-height: 60rpx;
    width: 100%;
    padding-left: 30rpx;
  }
  .icon-sousuo1 {
    display: inline;
    padding-right: 20rpx;
  }
}

.fixed {
  position: fixed;
  top: 0rpx;
  background: #fff;
  z-index: 1;
}
.index {
  width: 100%;
  height: 100%;
}
</style>
