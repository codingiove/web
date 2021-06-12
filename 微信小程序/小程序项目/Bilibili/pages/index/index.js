Page({
  /*页面的初始数据*/
  data: {
    //首页导航数据
    navList: [],
    //当前导航栏
    currentindex: 0,
    // 轮播图
    slideshow: [],
    //视频列表
    videolist: []
  },
  // 请求导航栏数据
  getNavlist() {
    let _this = this;
    wx.request({
      url: "http://mock-api.com/mnEe4VnJ.mock/navList",
      success(res) {
        if (res.data.code === 0) {
          _this.setData({
            navList: res.data.data.navList,
          });
        }
      },
    });
  },
  // 请求轮播
  api() {
    let _this = this;
    wx.request({
      url: "http://mock-api.com/mnEe4VnJ.mock/swiperList",
      success(res) {
        _this.setData({
          slideshow: res.data.data.swiperList,
        });
      },
    });
  },
  // 视频列表
  VideoList() {
    let _this = this
    wx.request({
      url: 'http://mock-api.com/mnEe4VnJ.mock/videoList',
      success(res) {
        _this.setData({
          videolist: res.data.data.videoList
        })
      }
    })
  },
  //切换导航栏
  currenactive(e) {
    this.setData({
      currentindex: e.target.dataset.index,
    });
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.getNavlist();
    this.api();
    this.VideoList()
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () { },

  /*生命周期函数--监听页面显示*/
  onShow: function () { },

  /* 生命周期函数--监听页面隐藏*/
  onHide: function () { },

  /* 生命周期函数--监听页面卸载*/
  onUnload: function () { },

  /* 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () { },

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () { },

  /* 用户点击右上角分享*/
  onShareAppMessage: function () { },
});