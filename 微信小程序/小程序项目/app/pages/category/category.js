import site from "../../api/site"
import carousel from "../../api/index"
Page({
  data: {
    //左边商品分类
    leftGoodsData: [],
    //右边商品分类
    rightGoodData: [],
    //当前索引
    currentindex: 0
  },
  // 商品分类
  categoryData: [],
  // 商品展示顶部
  scrollTop:0,
  // 商品切换
  tabSwitch(e) {
    let currentindex = e.currentTarget.dataset.index
    let rightGoodData = this.categoryData[currentindex].children;
    this.setData({
      currentindex,
      rightGoodData,
      scrollTop:0
    })
  },
  // 商品分类
  commodity() {
    carousel(site.Goodscategory).then(res => {
      // 都存在 GoodscategoryData 中然后进行过滤
      this.categoryData = res.data.message
      // 将数据存进本地
      wx.setStorageSync('Data', { time: Date.now(), data: this.categoryData })
      // 对左侧菜单进行过滤
      let leftGoodsData = this.categoryData.map(item => item.cat_name)
      // 对右侧菜单进行过滤
      let rightGoodData = this.categoryData[0].children;
      //赋值
      this.setData({
        leftGoodsData,
        rightGoodData,
      })
    })
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 1.获取本地数据
    let LocalData = wx.getStorageSync("Data")
    //第一次进来本地是没有数据的
    if (!LocalData) {
      this.commodity();
      // 本地有数据
    } else {
      // 设置时间限制,超过重新发请求
      if (Date.now() - LocalData.time > 50000) {
        this.commodity();
      } else {
        //取本地数据
        this.categoryData = LocalData.data;
        let leftGoodsData = this.categoryData.map(item => item.cat_name)
        let rightGoodData = this.categoryData[0].children;
        this.setData({
          leftGoodsData,
          rightGoodData
        })
        console.log("取本地数据");
      }
    }
  },
})