export let moduleA = {
  namespaced: true, // 私有,获取要加这个模块名
  state: {
    count: 0,
  },
  mutations: {
    increment(state, outside) {
      state.count += 1;
    },
  },
  getters: {
    doubleCount(state) {
      return state.count + 5;
    },
  },
  actions: {
    yibuplus(context) {
      setTimeout(() => {
        context.commit("increment");
      }, 1000);
    },
  },
};
