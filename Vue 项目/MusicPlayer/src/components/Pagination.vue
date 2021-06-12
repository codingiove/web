<template>
  <!-- 分页器 -->
  <el-pagination
    @current-change="GetPageNumber"
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="page"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "KOBE",
  props: {
    total: {
      type: Number,
    },
    page: {
      type: Number,
    },
    GetPageNumber: {
      type: Function,
    },
  },
  // methods: {
  //   // 处理当前变化
  //   // handleCurrentChange(page) {
  //   //   this.GetPageNumber(page);
  //   // },
  // },
};
</script>
