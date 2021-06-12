Page({
  data: {
    searchContent: [],
    TimeId: 0,
    onshow: false,
    ivalue: ""
  },
  import(e) {
    let ivalue = e.detail.value
    if (!ivalue.trim()) {
      this.setData({ searchContent: [], onshow: false })
      clearTimeout(this.data.TimeId)
      return;
    }
    this.setData({ onshow: true })
    clearTimeout(this.data.TimeId); // 清除上一个定时器
    /* 
    请求在1秒后发送,1秒之内input方式改变进行执行这个函数
    比如:你本来想搜索华为,当你输入(华)时input发生改变,1秒后执行网络请求,但你又输入了内容
    input发生改变,就有上一个定时器,清除上一个定时器网络请求
    
    */
    this.data.TimeId = setTimeout(() => {
      wx.request({
        url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch?query=${ivalue.trim()}`,
        success: (res) => {
          this.setData({ searchContent: res.data.message })
        }
      })
    }, 1000);

  },
  empty() {
    this.setData({ searchContent: [], onshow: false, ivalue: " " })
  }
})