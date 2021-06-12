Page({
  data: {
    userInfo: {},
    CollectNumber:0
  },
  userbtn(e) {
    let { userInfo } = e.detail
    this.setData({ userInfo })
    let userInfoData = wx.getStorageSync("userInfo")
    if (!userInfoData) {
      wx.setStorageSync('userInfo', userInfo)
    } else {
      this.setData({ userInfo: userInfoData })
    }
  },
  onShow() {
    let userInfoData = wx.getStorageSync("userInfo")
    let CollectNumber = wx.getStorageSync("Collecting")
    this.setData({ userInfo: userInfoData,CollectNumber:CollectNumber.length })
  }
})