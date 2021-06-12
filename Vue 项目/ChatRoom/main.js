import Vue from "vue";
import App from "./App";
import myTime from "./resource/js/Date";
import { http } from "./resource/js/http.js";
import { address } from "./config";
import io from "./resource/socket/weapp.socket.io";
Vue.config.productionTip = false;

// 时间处理
Vue.filter("Date_Time", function (Time) {
  return myTime.dateTime(Time);
});
// 聊天时间处理
Vue.filter("ChatTime", function (Time) {
  return myTime.ChatTimeProcessing(Time);
});
// 全局请求
Vue.prototype.$http = http;

// 本人头像
Vue.prototype.$user = function (img) {
  return `${address}file/user/${img}`;
};
// 图片地址
Vue.prototype.Pictures = `${address}`;

// 聊天室
// Vue.prototype.socket = io("http://47.114.38.181:8240");
Vue.prototype.socket = io("http://192.168.1.4:8240");

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
