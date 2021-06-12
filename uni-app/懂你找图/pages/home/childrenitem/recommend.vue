<template>
  <scroll-view scroll-y @scrolltolower="TouchBottom" class="recommended_top">
    <!-- 头部图片 -->
    <view class="recommended_wrap">
      <view
        v-for="(item, index) in recommendedData"
        :key="index"
        class="recommended_item"
      >
        <navigator :url="`/pages/DetailsPage/index?id=${item.id}`">
          <image :src="item.thumb" mode="widthFix"></image>
        </navigator>
      </view>
    </view>
    <!-- 热门图片 -->
    <view class="picture_wrap">
      <view class="picture_Viewed">热门图片</view>
      <!--  -->
      <view class="picture_item" v-for="(item, index) in picture" :key="index">
        <image :src="item.thumb" mode="widthFix"></image>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      // 推荐数据
      recommendedData: [],
      // 推荐数据参数
      params: {
        // 获取30条数据
        limit: 20,
        // 关键字
        order: "hot",
        // 跳过几条数据
        skip: 0,
      },
      // 展示图
      picture: [],
      flag: false,
    };
  },
  mounted() {
    this.api();
    uni.setNavigationBarTitle({
      title: "推荐",
    });
  },
  methods: {
    api() {
      this.$http({
        url: "v3/homepage/vertical",
        data: this.params,
      }).then((res) => {
				let resdata = res.data.res.homepage;
				  // 第一次肯定是0,第二次 length 不等于 0 了,只加载一次数据
        if (this.picture.length === 0) {
          this.recommendedData = resdata[1].items;
        }
        if (res.data.res.vertical.length === 0) {
          uni.showLoading({
            title: "已经到底部了",
          });
          return;
        }
        // 添加下一页但要保留之前的(2种方法) this.picture = [...this.picture,...res.data.res.vertical]
        this.picture.push(...res.data.res.vertical);
      });
    },
    TouchBottom() {
      this.params.skip += this.params.limit;
      this.api();
    },
  },
};
</script>

<style lang="scss">
.recommended_top {
  height: calc(100vh - 90rpx);
}

.recommended_wrap {
  display: flex;
  flex-wrap: wrap;

  .recommended_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}

.picture_wrap {
  .picture_Viewed {
    color: #de3977;
    width: 100%;
    font-size: 32rpx;
    padding: 10rpx;
  }

  .picture_item {
    float: left;
    width: 50%;
    border: 5rpx solid #fff;
  }
}
</style>
