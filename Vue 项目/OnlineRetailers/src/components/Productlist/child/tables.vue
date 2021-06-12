<template>
  <div>
    <el-table :data="goodslist" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="商品名称" prop="goods_name"></el-table-column>
      <el-table-column label="商品价格(元)" prop="goods_price" width="102px"></el-table-column>
      <el-table-column label="商品重量" prop="goods_weight" width="102px"></el-table-column>
      <el-table-column label="创建时间" prop="add_time" width="160px">
        <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
      </el-table-column>
      <el-table-column label="操作" width="126px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-card>
      <!-- 分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="kobe.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="kobe.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tot"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    goodslist: {
      type: Array,
      default() {
        return []
      }
    },
    kobe: {
      type: Object,
      default() {
        return {}
      }
    },
    tot: {
      type: Number,
      default() {
        return []
      }
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleSizeChange(pagenum){
      this.$emit('handleSizeChange', pagenum)
    },
    handleCurrentChange(pagesize){
       this.$emit('handleCurrentChange', pagesize)
    },
    removeById(id){
      this.$emit('removeById', id)
    }
  }
}
</script>
<style scoped>
</style>