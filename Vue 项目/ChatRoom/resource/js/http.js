import { address } from "../../config";

export function http(data) {
  let { token } = uni.getStorageSync("user");
  return new Promise((resolve, reject) => {
    uni.request({
      method: "POST",
      ...data,
      url: `${address}${data.url}`,
      header: {
        token: token,
      },
      success: (res) => {
        if (res.data.code === 8) {
          uni.navigateTo({ url: "/pages/Signin/Signin" });
        }
        resolve(res);
      },
      fail: reject,
    });
  });
}
