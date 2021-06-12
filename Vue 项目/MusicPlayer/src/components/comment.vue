<template>
  <div class="comment-wrap">
    <p class="title">
      {{ title }} <span class="number">({{ total }})</span>
    </p>
    <div class="comments-wrap">
      <div class="item" v-for="item in comments_list" :key="item.id">
        <div class="icon-wrap">
          <img :src="item.user.avatarUrl | SmallPicture(50)" alt="" />
        </div>
        <div class="content-wrap">
          <div class="content">
            <span class="name">{{ item.user.nickname }} </span>
            <span class="comment">{{ item.content }}</span>
          </div>
          <div class="re-content" v-if="item.beReplied.length != 0">
            <span class="name">{{ item.beReplied[0].user.nickname }} </span>
            <span class="comment">{{ item.beReplied[0].content }}</span>
          </div>
          <div class="date">{{ item.time | Time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    total: {
      type: Number,
      default() {
        return 0;
      },
    },
    comments_list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
