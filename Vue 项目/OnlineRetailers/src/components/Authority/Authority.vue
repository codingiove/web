<template>
  <div>
    <!-- 面包屑 -->
    <Breadcrumbs></Breadcrumbs>
    <!--卡片 card接收父组件传过来的数据,rightsList父组件数据-->
    <card :card="rightsList"></card>
  </div>
</template>

<script>
import Breadcrumbs from './childComps/Breadcrumbs'
import card from './childComps/card'

export default {
  components: { Breadcrumbs,card },
  data() {
    return {
      // 权限列表
      rightsList: []
    }
  },
  created() {
    // 获取所有的权限
    this.getRightsList()
  },
  methods: {
    // 获取权限列表
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return 
        // ↑this.$message.error('获取权限列表失败！')
      }
      this.rightsList = res.data  
    }
  },
  name: '',
}
</script>
<style scoped>
</style>