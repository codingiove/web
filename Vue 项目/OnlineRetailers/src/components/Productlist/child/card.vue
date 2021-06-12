<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addgoods">添加商品</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    queryInfo: {
      type: Object,
      default(){
        return{}
      }
    }
  },
  data() {
    return {}
  },
  methods:{
    search(){
     this.$emit('search') 
    },
    addgoods(){
      this.$emit('addgoods') 
    }
  }
}
</script>
<style scoped>
.el-card {
  margin-top: 20px;
}
</style>
