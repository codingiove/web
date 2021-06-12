export default (parameter) => {
  uni.showLoading({
    title: "加载中...",
    mask: true,
  });
  return new Promise((resolve, reject) => {
    uni.request({
      ...parameter,
      url: "http://localhost:8024" + parameter.url,
      success: resolve,
      fail: reject,
      complete() {
        uni.hideLoading();
      },
    });
  });
};
