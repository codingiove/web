<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift" @click="$router.go(-1)"></span>
        <span class="iconfont icon-arrow-right" @click="$router.go(1)"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          @keyup.enter="toRes"
          v-model="query"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    toRes() {
      if (this.query.trim() == "") {
        this.$message.warning("请输入歌名");
      } else {
        this.$router.push("/result?search=" + this.query);
        this.query = "";
      }
    },
  },
};
</script>

<style scoped></style>
