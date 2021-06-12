import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../components/Login.vue')
const Home = () => import('../components/Home.vue')
const Welcome = () => import('../components/hellow.vue')
const users = () => import('../components/users/users.vue')
const Authority = () => import('../components/Authority/Authority.vue')
const Roles = () => import('../components/Authority/Roles.vue')
const goods = () => import('../components/goods/goods.vue')
const params = () => import('../components/params/Params.vue')
const Productlist = () => import('../components/Productlist/goods.vue')
const addgoods = () => import('../components/Productlist/child/addgoods.vue')
const orders = () => import('../components/orders/orders.vue')
const reports = () => import('../components/reports/reports.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/hellow',
      children: [
        { path: '/hellow', component: Welcome },
        { path: '/users', component: users },
        { path: '/rights', component: Authority },
        { path: '/roles', component: Roles },
        { path: '/categories', component: goods },
        { path: '/params', component: params },
        { path: '/goods', component: Productlist },
        { path: '/goods/add', component: addgoods },
        { path: '/orders', component: orders },
        { path: '/reports', component: reports },
      ]
    }
  ]
})
// 如果用户没有登录，但是直接通过 URL访问特定页面，需要重新导航到登录页面。
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next()  放行    next('/login')  强制跳转
  if (to.path === '/login') return next()
  //从 sessionstorage 中获取到保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  //没有token,强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
