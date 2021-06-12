export const getSelection = () => {
  return new Promise((res, rej) => {
    wx.getSetting({
      success: res,
      fail: rej
    })
  })
}

export const chooseAddress = () => {
  return new Promise((res, rej) => {
    wx.chooseAddress({ 
      success: res,
      fail: rej
    })
  })
}

export const openSetting = () => {
  return new Promise((res, rej) => {
    wx.openSetting({
      success: res,
      fail: rej
    })
  })
}