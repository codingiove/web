<template functional>
  <view>
    <view class="empty">
      <img src="../../static/img/mull.png" alt="" />
      <slot>
        <view class="empty-title"></view>
      </slot>
    </view>
  </view>
</template>
<style scoped>
.empty {
  margin: 200rpx 0;
  text-align: center;
}
.empty-title {
  font-size: 32rpx;
  color: #000;
}
</style>
