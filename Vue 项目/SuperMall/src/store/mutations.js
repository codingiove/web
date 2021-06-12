const mutations = {
  addCart(state, info) {
    // 1.查看是否添加过
    const oldInfo = state.cartList.find(item => item.iid === info.iid);
    // 2.+1或者新添加
    if (oldInfo) {
      oldInfo.count += 1;
    } else {
      info.count = 1;
      info.checked = true;
      state.cartList.push(info);
    }
  },
  deletei(state, id) {
    state.cartList.some((item, index) => {
      if (item.iid === id) {
        state.cartList.splice(index, 1);
        return true;
      }
    });
  }
};

export default mutations;
