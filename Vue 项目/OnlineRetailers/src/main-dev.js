import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import './assets/fonts/iconfont.css'
// 导入全局样式表

import './assets/css/global.css'
import Treetable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

//导入页面顶部加载进度条
//导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.filter('dateFormat', function(time) {
  //new一个时间,不传参数获取的是当前时间
  //time是后端传过来的时间 ，通过这个时间进行修改
  //.padStart(2, '0')长度不足2位 ，在前面补0
  const dt = new Date(time)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()
  const hh = dt.getHours()
  const mm = dt.getMinutes()
  const ss = dt.getSeconds()
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

//把axios挂载到vue中
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', Treetable)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
