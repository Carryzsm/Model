// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'

// 引入store
import store from '@/store'
import {Message} from 'element-ui'
// 声明使用vue-router插件
Vue.use(VueRouter)
// 重写路由器原型对象上的push和replace方法
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return originPush.call(this, location, onComplete, onAbort)
}

const originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originReplace.call(this, location, onComplete, onAbort)
}

const router = new VueRouter({
  mode: 'history', // 不带#
  routes,
  // 设置路由跳转的时候,滚动的位置
  scrollBehavior (to, from, savedPosition) {
    // x---横坐标,y----纵坐标
    return { x: 0, y: 0 }
  }
})

// 全局前置路由守卫
// router.beforeEach((to, from, next) => {
//   // to---->对象---->要跳转到的目标路由信息对象----> /
//   // console.log(to)
//   //from---->对象---->要离开的目标路由信息对象
//   // console.log(from)
//   //next---->函数(对象)---->放行
//   // next() ----->直接放行----跳转到接下来要去的地址
//   // next(false)---->不放行
//   // next('地址')---跳转到指定的地址
//   // console.log(next)
//   // next(false)
//   // 暂且不行,需要通过判断后才可以
//   // next('/search')
//   // next()
// })


// router.beforeEach((to, from, next) => {
//   // 控制路由的跳转
//   // 先获取用户的信息
//   const {userInfo,token} = store.state.user
//   // 判断用户信息是否存在,如果存在,则可以直接跳转(放行)
//   // if(userInfo.name){
//   //   next()
//   //   console.log('登录了')
//   //   return
//   // }
//   // 此时没有登录,检测token是否存在
//   if(token){
//     // 调用获取用户信息的接口
//     store.dispatch('getUserInfo')
//   }
//   next()

//   // 路由地址: /trade----结算的界面    
//   //      /pay---支付界面   /paysuccess----支付成功的界面  /center---订单界面
//   // 如果已经登录了,就不能再进入登录界面
//   // 不能直接跳转到/addcartsuccess界面----添加商品到购物车成功的界面(skuInfo和skuNum)

//   // 如果不是直接从/shopcart进入到/trade界面,那么就自动跳转到/shopcart界面
//   // 如果不是直接从/trade进入到/pay界面,那么就自动跳转到/trade界面
//   // 如果不是直接从/pay进入到/paysuccess界面,那么就自动跳转到/pay界面

// })


// 全局路由前置守卫
// 准备要登录才能跳转的路由地址的数组
const checkPaths = ['/trade', '/pay', '/center']
router.beforeEach(async (to, from, next) => {
  // 目标路由地址
  const targetPath = to.path
  // 获取需要检测的地址  /paySuccess ---目标路由地址
  const needPath = checkPaths.some(path => targetPath.startsWith(path))
  // 获取用户信息对象及token数据
  let { userInfo, token } = store.state.user
  // 判断是否已经登录
  if (userInfo.name) {
    // 放行---想去哪就去哪里
    next()
    // 没有必要向后执行了
    return
  }
  // 此时没有用户信息,也没有登录,判断是否有token
  if (token) {
    try {
      // 自动登录
      await store.dispatch('getUserInfo')
      // 此时自动登录成功了,正常放行
      next()
      // 没有必要向后执行了
      return
    } catch (error) {
      // 说明浏览器端的token废了,那么没有必要再存储这个token
      // 直接退出
      store.dispatch('logout')
      // 提示信息
      Message.error('请重新登录')
      // 进入到登录界面
      next('/login?redirect='+to.path)
      return
    }
  }
  // 没有用户信息(没有登录) 没有token(也没有自动登录) ,检测路由地址
  if (!needPath) {
    // 不需要检测
    next()
    return
  }
  
  next('/login?redirect='+to.path)

  // 需要检测,跳转到登录(同时保存当前的检测路由地址)
})




// 实例化路由器并暴露出去
export default router