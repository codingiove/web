export default function (url, data) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((res, rej) => {
    wx.request({
      url,
      data,

      success: res,
      fail: rej,
      //不管成功失败都会执行
      complete() {
        wx.hideLoading()
      }
    })
  })
}