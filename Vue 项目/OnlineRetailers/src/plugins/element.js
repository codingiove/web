import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'
//导入弹框组件
import { Message } from 'element-ui'
Vue.use(Element)
//$message可以随便改名字,Message这个是组件不可以改
Vue.prototype.$message = Message
