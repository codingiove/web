// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoDetailsData: null,
    SuggestedvideosData: []
  },

  // 视频详情
  videoDetails(id) {
    let _this = this
    wx.request({
      url: `http://mock-api.com/mnEe4VnJ.mock/videoDetail?${id}`,
      success(res) {
        _this.setData({
          videoDetailsData: res.data.data.videoInfo
        })
      }
    })
  },
  //推荐视频
  Suggestedvideos() {
    let _this = this
    wx.request({
      url: 'http://mock-api.com/mnEe4VnJ.mock/otherList',
      success(res) {
        _this.setData({
          SuggestedvideosData: res.data.data.otherList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoDetails(options)
    this.Suggestedvideos()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})