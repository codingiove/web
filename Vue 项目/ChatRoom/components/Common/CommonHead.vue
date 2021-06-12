<template>
  <view>
    <!-- 头部 -->
    <view class="personal-top">
      <slot name="left">
        <image
          src="/static/img/register/jtou.png"
          class="personal-arrow"
          @tap="JumpIndex"
        />
      </slot>
      <view class="personal-words">
        <slot name="content" />
      </view>
      <view :class="{ kong: !isShow }">
        <slot name="unknown" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    JumpIndex() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
  computed: {
    isShow() {
      return this.$slots.unknown;
    },
  },
};
</script>

<style lang="scss">
.personal-top {
  display: flex;
  padding: 20rpx 20rpx;
  height: 110rpx;
  box-sizing: border-box;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  align-items: center;
  .personal-arrow {
    transform: rotate(180deg);
    width: 50rpx;
    height: 50rpx;
  }
  .personal-words {
    color: rgba(39, 40, 50, 1);
    font-size: 32rpx;
  }
  .kong {
    width: 50rpx;
  }
}
</style>
