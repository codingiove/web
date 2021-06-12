<template>
  <view v-if="album.name">
    <!-- 专辑背景 -->
    <view class="album_bg">
      <image :src="album.cover" mode="widthFix" />
      <view class="album_info">
        <view class="album_name">{{ album.name }}</view>
        <view class="album_btn">关注专辑</view>
      </view>
    </view>
    <!-- 专辑作者   -->
    <view class="album_author">
      <view class="album_author_info">
        <image mode="widthFix" :src="user.avatar" />
        <view class="album_name">{{ user.name }}</view>
      </view>
      <view class="album_author_desc">
        <text> {{ album.desc }}</text>
      </view>
    </view>
  </view>
  <view v-else class="error"> 服务器正在维修,请稍后... </view>
</template>

<script>
export default {
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        first: 1,
      },
      id: "",
      album: {},
      user: {},
    };
  },
  onLoad(argument) {
    this.id = argument.id;
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$http({
        url: `v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params,
      }).then((res) => {
        this.album = res.data.res.album;
        this.user = res.data.res.album.user;
      });
    },
  },
};
</script>

<style lang="scss">
.album_bg {
  position: relative;

  .album_info {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    color: #fff;

    .album_name {
      font-size: 30rpx;
      margin-left: 10rpx;
    }

    .album_btn {
      background-color: #de3977;
      height: 70rpx;
      width: 150rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      margin-right: 10rpx;
    }
  }
}

.album_author {
  padding: 10rpx;

  .album_author_info {
    padding: 10rpx 0;
    display: flex;

    image {
      width: 50rpx;
    }

    .album_name {
      color: #000;
      margin-left: 15rpx;
    }
  }
}

.error {
  color: #000;
  text-align: center;
  font-size: 38rpx;
  margin-top: 36px;
}
</style>
