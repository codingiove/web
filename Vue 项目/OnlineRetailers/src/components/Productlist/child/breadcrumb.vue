<template>
  <div>
    <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="daohang1">商品管理</slot></el-breadcrumb-item>
      <el-breadcrumb-item><slot name="daohang2">参数列表</slot></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>
<style scoped></style>
