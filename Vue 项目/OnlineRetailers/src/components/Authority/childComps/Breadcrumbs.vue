<template>
  <div>
    <!-- 面包屑 -->
   <slot name="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <slot name="a"><el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item></slot>
      <slot name="b"><el-breadcrumb-item>权限管理</el-breadcrumb-item></slot>
      <slot name="c"><el-breadcrumb-item>权限列表</el-breadcrumb-item></slot>
    </el-breadcrumb>
   </slot>
  </div>
</template>

<script>
export default {
 name:'',
 components:{
 }
}

</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>