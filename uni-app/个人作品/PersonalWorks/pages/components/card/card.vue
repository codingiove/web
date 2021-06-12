<template>
  <view>
    <swiper
      class="swiper"
      :style="{ height: ContentHeight + 50 + 'px' }"
      @change="change"
      :current="Rotation_index"
    >
      <swiper-item class="swiper-item">
        <view class="list-card" ref="swiper">
          <cards :card_list="list"></cards>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import cards from "./cards";
export default {
  props: {
    Rotation_index: {
      type: Number,
      defalut() {
        return 0;
      },
    },
    list: {
      type: Array,
      defalut() {
        return [];
      },
    },
  },
  components: {
    cards,
  },
  data() {
    return {
      ContentHeight: 0, // 内容高度
    };
  },

  updated() {
    this.ContentHeight = this.$refs.swiper.$el.clientHeight;
  },
  methods: {
    change(e) {
      this.$emit("Rotation", e.detail.current);
    },
  },
};
</script>
<style scoped lang="scss">
.swiper {
  margin-bottom: 100rpx;
}
</style>
