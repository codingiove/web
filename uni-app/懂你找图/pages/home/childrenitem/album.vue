<template>
  <scroll-view class="album_wrap" scroll-y @scrolltolower="loadData">
    <!-- 轮播图 -->
    <view class="album_item">
      <swiper indicator-dots autoplay circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb" mode="widthFix"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 列表展示 -->
    <view v-for="(item, index) in album" :key="index">
      <navigator
        :url="`/pages/DetailsPage/index?id=${item.id}`"
        class="album_list_wrap"
      >
        <view class="list_image">
          <image :src="item.cover" mode="aspectFill"></image>
        </view>
        <view class="list_title">
          <view class="title_name">{{ item.name }}</view>
          <view class="title_desc">{{ item.desc }}</view>
          <view class="title_btn">
            <view class="title_attention"> + 关注 </view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图
      banner: [],
      // 列表数据
      album: [],
      params: {
        limit: 20,
        order: "new",
        skip: 0,
      },
      load: true, // 加载数据
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "专辑",
    });
    this.albumapi();
  },
  methods: {
    loadData() {
      if (this.load) {
        // 跳过 20 条 加载新的 20条时
        this.params.skip += this.params.limit;
        this.albumapi();
      } else {
        uni.showToast({
          title: "已经到最后一页",
          icon: "none",
        });
      }
    },
    albumapi() {
      this.$http({
        url: "v1/wallpaper/album",
        data: this.params,
      }).then((res) => {
        if (this.banner.length === 0) {
          this.banner = res.data.res.banner;
        }
        if (res.data.res.album.length === 0) {
          this.load = false;
          return;
        }
        this.album.push(...res.data.res.album);
      });
    },
  },
};
</script>

<style lang="scss">
.album_wrap {
  height: calc(100vh - 90rpx);
}

.album_item {
  swiper {
    height: 326rpx;
  }

  image {
    height: 100%;
  }
}

.album_list_wrap {
  padding: 10rpx;
  display: flex;
  border-bottom: 1rpx solid #e5e7e4;

  .list_image {
    flex: 1;

    image {
      width: 300rpx;
      height: 300rpx;
    }
  }

  .list_title {
    flex: 2;
    padding: 0 20rpx;

    .title_name {
      font-size: 28rpx;
      padding: 10rpx 0 10rpx 20rpx;
      color: #000;
      font-weight: bold;
    }

    .title_desc {
      font-size: 24rpx;
      padding: 0 10rpx;
      overflow: hidden;
      /*自动隐藏文字*/
      text-overflow: ellipsis;
      /*文字隐藏后添加省略号*/
      display: -webkit-box;
      -webkit-line-clamp: 1;
      /*想要显示的行数*/
      -webkit-box-orient: vertical;
    }

    .title_btn {
      padding: 10rpx;
      border: 2rpx solid #de3977;
      color: #de3977;
      float: right;
      width: 30%;
      margin: 30rpx 0 0 0;
      box-sizing: border-box;
    }
  }
}
</style>
