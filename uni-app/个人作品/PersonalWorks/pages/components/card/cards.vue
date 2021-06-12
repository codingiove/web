<template>
  <view>
    <view v-for="(item, index) in card_list" :key="index">
      <!-- 三张图片 -->
      <view class="index_article" v-if="item.mode === 'column'">
        <view class="AboveTheArticle">
          <text class="AboveTheArticle_title">
            {{ item.title }}
          </text>
          <text class="iconfont icon-xin"></text>
        </view>
        <view class="article_img">
          <view class="img_wrap">
            <img :src="item.cover[0]" mode="aspectFill" />
            <img :src="item.cover[1]" mode="aspectFill" />
            <img :src="item.cover[2]" mode="aspectFill" />
          </view>
        </view>
        <view class="BelowTheArticle">
          <text class="BelowTheArticle_title">{{ item.classify }}</text>
          <text class="BelowTheArticle_Preview">
            {{ item.browse_count }}预览
          </text>
        </view>
      </view>
      <!-- 一张图片的卡片 -->
      <view class="card-one-wrap" v-else>
        <image :src="item.cover[0]" class="card-one-img" mode="aspectFill" />
        <view class="card-one-title-wrap">
          <view class="card-title">{{ item.title }}</view>
          <view class="iconfont icon-xin"></view>
        </view>
        <view class="card-base-warp">
          <view class="title">{{ item.classify }}</view>
          <view class="Preview">{{ item.browse_count }}预览</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    card_list: {
      type: Array,
      defalut() {
        return [];
      },
    },
  },
  data() {
    return {
      card: this.card_list,
    };
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.card-one-wrap {
  box-shadow: 0 0 10rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 16rpx;
  box-sizing: border-box;
  padding: 22rpx;
  margin: 30rpx auto;
  width: 700rpx;
  //height: 472rpx;
  .card-one-img {
    height: 300rpx;
    border-radius: 20rpx;
  }

  .card-one-title-wrap {
    display: flex;
    margin-top: 10rpx;
    justify-content: space-between;
    .card-title {
      font-size: 28rpx;
    }
  }
  .card-base-warp {
    display: flex;
    margin-top: 20rpx;
    justify-content: space-between;
    .title {
      color: $stock;
      border: 2rpx solid $stock;
      border-radius: 40rpx;
      padding: 0 20rpx;
    }

    .Preview {
      color: #b5b5b5;
    }
  }
}
.index_article {
  box-shadow: 0 0 10rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 16rpx;
  box-sizing: border-box;
  padding: 22rpx;
  margin: 30rpx auto;
  width: 700rpx;
  //height: 324rpx;
  .AboveTheArticle {
    display: flex;
    justify-content: space-between;
    .AboveTheArticle_title {
      font-size: 30rpx;
    }
  }
  .article_img {
    margin-top: 22rpx;
    width: 98%;
    height: 154rpx;

    .img_wrap {
      display: flex;
      img {
        border-radius: 10rpx;
        width: 33%;
        height: 120rpx;
        margin-right: 10rpx;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .BelowTheArticle {
    display: flex;
    justify-content: space-between;
    font-size: 30rpx;
    margin-top: 20rpx;
    .BelowTheArticle_title {
      color: $stock;
      border: 2rpx solid $stock;
      border-radius: 40rpx;
      padding: 0 20rpx;
    }
    .BelowTheArticle_Preview {
      color: #b5b5b5;
    }
  }
}
</style>
