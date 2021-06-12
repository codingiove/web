import site from "../../api/site"
import carousel from "../../api/index"
Page({
  data: {
    list_navbarData: ['综合', '销量', '价格'],
    currentindex: 0,
    // 商品列表参数
    ProductListData: {
      query: '',
      cid: "",
      pagenum:1,
      pagesize: 2000
    },
    // 商品列表数据
    goodslistData: [],
    //总条数
    total: 0,
  },
  // 上拉事件
  onReachBottom() {
    //当前条数小于了总数据
    if (this.data.ProductListData.pagenum * 2000 >= this.data.total) {
      wx.showToast({ title: '已加载到底部了...', icon: "none" })
    } else {
      this.data.ProductListData.pagenum++;
      this.getGoodsList()
    }
  },
  // 导航栏切换
  switchnavbar(e) {
    let { index } = e.target.dataset
    this.setData({
      currentindex: index
    })
  },
  onLoad: function (options) {
    this.data.ProductListData.cid = options.cid;
    this.getGoodsList()
  },
  // 请求商品列表数据
  getGoodsList() {
    carousel(site.GoodsList, this.ProductListData).then(res => {
      let totals = res.data.message.total
      // 总数据
      this.data.total = totals
      // 新数据 和 旧数据 合并
      this.setData({
        goodslistData: [...this.data.goodslistData, ...res.data.message.goods]
      })
      // 关闭下拉刷新
      wx.stopPullDownRefresh()
    })
  },
  //下拉事件
  onPullDownRefresh() {
    this.setData({
      goodslistData: []
    })
    this.getGoodsList()
  }
})