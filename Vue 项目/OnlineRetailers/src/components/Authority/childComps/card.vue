<template>
  <div>
    <!--卡片 -->
    <el-card>
      <el-table :data="card" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  props:{//传值
    card:{//接收父组件传过来的数据
      type:Array,//类型
       default(){//默认返回一个对象
       return[]
     }
    }
  },
  name: '',
  components: {}
}
</script>
<style scoped>
</style>