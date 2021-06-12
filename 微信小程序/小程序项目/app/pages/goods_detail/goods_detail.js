import site from "../../api/site"
import carousel from "../../api/index"
Page({
  data: {
    GoodsDetail: {},
    isCollect: false
  },
  GoodsDetailURl: {},
  // 轮播图放大预览
  previewimg(e) {
    let index = e.currentTarget.dataset.index
    let urls = this.GoodsDetailURl.pics.map(v => v.pics_mid_url)
    wx.previewImage({
      current: index, // 当前显示图片的http链接
      urls// 需要预览的图片http链接列表
    })

  },
  // 加入购物车 
  AddtoCart() {
    let cart = wx.getStorageSync('cart') || [];
    let GoodsDeta = this.GoodsDetailURl
    // 判断当前数据,本地是否存在
    let index = cart.findIndex(v => v.goods_id === GoodsDeta.goods_id)
    if (index === -1) {
      // 没有这个商品
      cart.push({
        name: GoodsDeta.goods_name,
        goods_id: GoodsDeta.goods_id,
        num: 1,
        goods_price: GoodsDeta.goods_price,
        goods_small_logo: GoodsDeta.goods_small_logo,
        checkbox: true
      })
    } else {
      //有这个商品 让当前商品数量加一(index)代表当前商品
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '已加入购物车',
      mask: true, icon: "none"
    })
  },
  //收藏 
  Collecting() {
    let isCollect = false
    let Collec = wx.getStorageSync("Collecting") || []
    let index = Collec.findIndex(v => v.goods_id === this.data.GoodsDetail.goods_id)
                                // 数组的每一个id进行对比
    if (index !== -1) {
      // 有
      Collec.splice(index, 1)
      isCollect = false
      wx.showToast({ title: '取消收藏', mask: true, icon: "none" })
    } else {
      // 没有
      Collec.push(this.data.GoodsDetail)
      isCollect = true
      wx.showToast({ title: '收藏成功', mask: true, icon: "none" })
    }
    wx.setStorageSync('Collecting', Collec)
    this.setData({ isCollect })
  },
  // 请求商品详情
  getGoodsDetail(goods_id) {
    carousel(`${site.GoodsDetail}=${goods_id}`).then(res => {
      let GoodsData = res.data.message
      this.setData({
        GoodsDetail: {
          pics: GoodsData.pics,
          goods_price: GoodsData.goods_price,
          goods_name: GoodsData.goods_name,
          goods_introduce: GoodsData.goods_introduce,
          goods_id: GoodsData.goods_id
        }
      })
    })
  },
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id)
  },
  onShow() {
    let Pages = getCurrentPages()
    let current = Pages[Pages.length - 1]
    let options = current.options
    let pages_id = parseInt(options.goods_id) //当前页面ID参数
    let Collec = wx.getStorageSync("Collecting") || []
    let isCollect = Collec.map(v => v.goods_id == pages_id)
    this.setData({ isCollect })
  }
})