import { getSelection, chooseAddress, openSetting } from "../../utils/ShippingAddress"
Page({
  data: {
    address: {},
    cart: {},
    totalprice: 0,
    totalNum: 0,
  },
  onShow() {
    let address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(v => v.checkbox)

    this.setData({ address })

    let totalprice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalprice += v.num * v.goods_price,
        totalNum += v.num
    })
    this.setData({
      cart,
      totalprice,
      totalNum,
      address
    })
  },
  onLoad: function (options) {

  },
})