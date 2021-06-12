import Vue from "vue";
import store from "./Vuex/index";
import App from "./App.vue";
import router from "./router/index.js";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
import "./assets/index.css";
import { Time, PlayTime, PlayVolume, GetCorrespondImg } from "./tool/index";

// Vue.use(ElementUI);

// 播放时间
Vue.filter("formatDuration", PlayTime);
// 播放量
Vue.filter("formatCount", PlayVolume);
// 时间格式化
Vue.filter("Time", Time);
// 获取对应图片
Vue.filter("SmallPicture", GetCorrespondImg);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
