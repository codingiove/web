import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyLoad from "vue-lazyload";
import FastClick from 'fastclick'
FastClick.attach(document.body);
import vant from './vant'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require("assets/img/common/1.jpg")
});
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  store,
  vant,
  router
}).$mount("#app");
