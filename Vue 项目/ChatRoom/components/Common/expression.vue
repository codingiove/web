<template>
  <view class="emoji">
    <view v-for="(item, index) in expression" :key="index" class="flex">
      <view
        class="emoji-item"
        v-for="(emoji, i) in item"
        :key="i"
        @tap="Send_emoji(emoji)"
        >{{ emoji }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      expression: [
        ["😀", "😁", "😂", "🤣", "😃", "😅", "😆", "😉", "😊", "😋", "😎"],
        ["😍", "😘", "😗", "😙", "😚", "🤥", "🙂", "🤗", "🤔", "😐", "😑"],
        ["😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴"],
        ["😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑"],
        ["😲", "😤", "😢", "😭", "😧", "😨", "😩", "😰", "😱", "🤓", "🤧"],
        ["😵", "😡", "😠", "😷", "🤒", "🤕", "🤢", "😇", "🤠", "🐶", "💪"],
      ],
    };
  },
  methods: {
    Send_emoji(item) {
      this.$emit("Send_emoji", item);
    },
  },
  components: {},
};
</script>

<style lang="scss">
.emoji {
  width: 100%;
  height: 460rpx;
  box-sizing: border-box;
  overflow-x: auto;
  .flex {
    display: flex;
    padding: 18rpx 14rpx;
  }
  .emoji-item {
    flex: 1;
    text-align: center;
    font-size: 40rpx;
  }
}
</style>
