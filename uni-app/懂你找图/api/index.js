export default (parameter) => {
	uni.showLoading({
		title: "加载中..."
	})
	return new Promise((res, rej) => {
		uni.request({
			...parameter,
			url: "https://service.picasso.adesk.com/" + parameter.url,
			success: res,
			fail: rej,
			complete() {
				uni.hideLoading()
			}
		});
	})
}
