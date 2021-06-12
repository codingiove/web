Page({

  data: {
    items: ["商品收藏", "品牌收藏", "店铺收藏", "浏览足迹"],
    currentindex:0,
    collect:[]
  },
  activea(e) {
    let index = e.currentTarget.dataset.index
    this.setData({currentindex:index})
  },
  onShow(){
    let collect = wx.getStorageSync("Collecting")
    this.setData({collect})
  }
})