import { getSelection, chooseAddress, openSetting } from "../../utils/ShippingAddress"
Page({
  data: {
    address: {},
    cart: {},
    //全选
    allcheckbox: false,
    totalprice: 0,
    totalNum: 0,
  },
  Settlement() {
    let { address, totalNum } = this.data
    if (!address.userName) {
      wx.showToast({ title: '您还没有填写收货地址', icon: "none" })
      return;
    }
    if (totalNum === 0) {
      wx.showToast({ title: '您还没有选购商品', icon: "none" })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },
  itemChend(e) {
    let id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === id)
    cart[index].checkbox = !cart[index].checkbox
    this.setCart(cart)
  },
  setCart(cart) {
    let allcheckbox = true
    let totalprice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checkbox) {
        totalprice += v.num * v.goods_price,
          totalNum += v.num
      } else {
        allcheckbox = false
      }
    })
    allcheckbox = cart.length != 0 ? allcheckbox : false
    this.setData({
      cart,
      allcheckbox,
      totalprice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
  },
  allchend() {
    let { cart, allcheckbox } = this.data
    allcheckbox = !allcheckbox
    cart.forEach(v => v.checkbox = allcheckbox)
    this.setCart(cart)
  },
  addnum(e) {
    let { cart } = this.data
    let id = e.currentTarget.dataset.id
    let index = cart.findIndex(v => v.goods_id === id)
    cart[index].num += 1
    this.setCart(cart)
  },
  subnum(e) {
    let { cart } = this.data
    let id = e.currentTarget.dataset.id
    let index = cart.findIndex(v => v.goods_id === id) //代表当前,当前商品
    cart[index].num += -1
    if (cart[index].num === 0) {
      wx.showModal({
        content: `确认要删除这${1}种商品吗?`,
        confirmColor: "#f7544b",
        success: res => {
          if (res.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          } else if (res.cancel) {
            cart[index].num = 1
            this.setCart(cart)
          }
        }
      })
    }
    this.setCart(cart)
  },
  onShow() {
    let address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    this.setCart(cart)
    this.setData({ address })
  },
  async GetDeliveryAddress() {
    try {
      // 获取权限
      let res1 = await getSelection()
      let permission = res1.authSetting["scope.address"]
      // 判断权限
      if (permission === false) {
        await openSetting()
      }
      // 调用收货地址权限
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address)

    } catch{

    }
  },
  onLoad: function (options) {

  }
})
