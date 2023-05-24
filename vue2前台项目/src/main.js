// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入router
import router from './router'
// 引入store
import store from './store'
// 引入TypeNav组件
import TypeNav from './components/TypeNav'
// 执行一次swiper的插件文件
import './plugins/swiper'
// 引入mock的文件
import './mock'
// 引入分页组件Pagination
import Pagination from '@/components/Pagination'
// 引入validate插件文件
import '@/plugins/validate'
// 引入所有的api接口函数
import * as API from '@/api'
// 引入element-ui
import '@/plugins/element-ui'
// 新增/修改收件人地址的组件----全局的公共组件了
import '@/components/AddressModel'



// 引入图片懒加载的插件
import VueLazyload from 'vue-lazyload'
// 引入一张图片
import loading from './assets/images/loading.gif'
// 使用插件并进行配置
Vue.use(VueLazyload, {
  loading, // 使用引入的图片(懒加载的时候需要显示的图片)
})




// 设置浏览器的控制台中不显示默认的提示信息
Vue.config.productionTip = false

// 把API接口函数暴露在每个组件的实例对象上
Vue.prototype.$API = API

// 把TypeNav组件注册成全局的公共组件
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)
// 实例化Vue
new Vue({
  // 数据初始化之前的生命周期回调钩子
  beforeCreate () {
    Vue.prototype.$bus = new Vue()
  },
  render: h => h(App),
  // 注册路由器
  router,
  // 注册store
  store
}).$mount('#app')
