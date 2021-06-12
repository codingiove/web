<template>
  <div>
    <!-- 面包屑 -->
    <breadcrumb>
      <slot slot="daohang1">商品管理</slot>
      <slot slot="daohang2">商品列表</slot>
    </breadcrumb>
    <!-- 卡片 -->
    <card :queryInfo="queryInfo" @search="search" @addgoods="addgoods"></card>
    <!-- table表格区域 -->
    <commodity
      :goodslist="goodslist"
      :kobe="queryInfo"
      :tot="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @removeById="removeById"
    ></commodity>
  </div>
</template>

<script>
import breadcrumb from './child/breadcrumb'
import card from './child/card'
import commodity from './child/tables'
export default {
  components: { breadcrumb, card, commodity },
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表数据
      goodslist: [],
      // 总数据条数
      total: 0
    }
  },
  created() {
    this.getGoodsList()
  },
  /** params: this.queryInfo
   * 这里面有很多数据 ，但是根据我在data里面定义的方法进行展示
   * query:''默认输入框为空
   * pagenum:1展示第一页数据
   * pagesize:10一页展示10条
   */
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败！')
      }
      this.$message.success('获取商品列表成功！')
      //console.log(res)
      this.goodslist = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    search() {
      //解决不处于第一页时搜不到东西的bug
      //当我点击第二页时就会进行刷新 ，(pagenum)页面也会跟着刷新 ，不会一直处于第一页
      //因为数据没有发生刷新，所以他就一直处于第一页，所以你点击第二页时，内部的数据还处于第一页就导致搜索不到东西
      this.queryInfo.pagenum = 1
      this.getGoodsList()
    },
    async removeById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
        //捕获用户的取消行为 ，将取消的结果也return出去
      ).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('goods/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getGoodsList()
    },
    addgoods() {
      this.$router.push('/goods/add')
    }
  }
}
</script>
<style scoped></style>
