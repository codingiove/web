import site from "../../api/site"
import carousel from "../../api/index"
Page({
  data: {
    //轮播图
    carouselData: [],
    //导航菜单
    NegotiateMenusData: [],
    //楼层
    FloorData: []
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 轮播
    carousel(site.Carousel).then(res => {
      this.setData({
        carouselData: res.data.message
      })
    })
    // 导航菜单
    carousel(site.NegotiateMenus).then(res => {
      this.setData({
        NegotiateMenusData: res.data.message
      })
    })
    //楼层
    carousel(site.Floor).then(res => {
      this.setData({
        FloorData: res.data.message
      })
    })
  },
})