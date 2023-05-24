// 引入Home组件
import Home from '@/pages/Home'
// 引入Search组件
// import Search from '@/pages/Search'
const Search=() =>import('@/pages/Search')
// 引入Login组件
import Login from '@/pages/Login'
// 引入Register组件
import Register from '@/pages/Register'
// 引入Detail组件
import Detail from '@/pages/Detail'
// 引入AddCartSuccess组件
import AddCartSuccess from '@/pages/AddCartSuccess'
// 引入ShopCart组件
import ShopCart from '@/pages/ShopCart'
// 引入Trade组件
import Trade from '@/pages/Trade'
// 引入Pay组件
import Pay from '@/pages/Pay'
// 引入PaySuccess组件
import PaySuccess from '@/pages/PaySuccess'
// 引入center组件
import Center from '@/pages/Center'
// 引入store
// import store from '@/store'
// 引入MyOrder组件
import MyOrder from '@/pages/Center/MyOrder'
// 引入OrderDetail组件
import OrderDetail from '@/pages/Center/OrderDetail'
// 引入RefundList组件
import RefundList from '@/pages/Center/RefundList'
// 引入Refund组件
import Refund from '@/pages/Center/Refund'

export default [
  // Home路由---路由对象,路由信息对象
  {
    path: '/',
    component: Home
  },
  // Search路由
  {
    // params 的方式传参
    path: '/search/:keyword?', // ? 的作用,是参数可以传可不传
    name: 'search',
    // query 的方式传参
    // path:'/search',
    component: Search
  },
  // Login路由
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true // 默认隐藏底部的
    },
    // 路由独享守卫
    // beforeEnter: (to, from, next) => {
    //   // 判断是否已经登录过了,如果已经登录,直接跳转到首页
    //   const userInfo = store.state.user.userInfo
    //   if (userInfo.name) {
    //     next('/')
    //   } else {
    //     // 没有登录,直接就进入到登录界面就可以了
    //     next()
    //   }

    // }
  },
  // Register路由
  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true
    }
  },
  // 详情页的路由
  {
    path: '/detail/:skuId',
    name: 'detail',
    component: Detail
  },
  // AddCartSuccess路由
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    // 路由独享守卫
    // beforeEnter: (to, from, next) => {
    //   // 判断能够进入到当前的界面,只能是从/detail界面过来
    //   // console.log(from.path)

    //   if (from.path.startsWith('/detail')) {
    //     next()
    //   } else {
    //     next('/shopcart')
    //   }
    // }
  },
  // ShopCart路由
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart
  },
  // Trade路由
  {
    path: '/trade',
    component: Trade,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 判断是不是从/shopcart来到的/trade
      if (from.path === '/shopcart') {
        next()
      } else {
        next('/shopcart')
      }
    }
  },
  // Pay路由
  {
    path: '/pay',
    component: Pay,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      console.log(from)
      // 判断是不是从/shopcart来到的/trade
      if (from.path === '/trade'||from.path==='/center/myorder') {
        next()
      } else {
        next('/trade')
      }
    }
  },
  // PaySuccess路由
  {
    path: '/paysuccess',
    component: PaySuccess,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 判断是不是从/shopcart来到的/trade
      if (from.path === '/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },
  // Center路由
  {
    path: '/center',
    component: Center,
    children:[
      // 订单列表路由MyOrder
      {
        path:'myorder',
        component:MyOrder
      },
      // 重定向
      {
        path:'',
        redirect:'myorder'
      },
      // 订单详情的路由OrderDetail
      {
        path:'orderdetail/:orderId',
        component:OrderDetail
      },
       // 退货清单路由 RefundList
      {
        path:'refundlist',
        component:RefundList
      },
      // 退货申请的路由 Refund
      {
        path:'refund',
        component:Refund
      },

    ]
  },
    // 组件通信高级
    {
      path: '/communication',
      component: () => import('@/pages/Communication/Communication'),
      children: [
        // 原生事件和自定义事件的技术点的组件
        {
          path: 'event',
          component: () => import('@/pages/Communication/EventTest/EventTest'),
          meta: {
            isHideFooter: true
          },
        },
        // v-model的本质的技术点组件
        {
          path: 'model',
          component: () => import('@/pages/Communication/ModelTest/ModelTest'),
          meta: {
            isHideFooter: true
          },
        },
        // .sync 修饰符的技术点组件
        {
          path: 'sync',
          component: () => import('@/pages/Communication/SyncTest/SyncTest'),
          meta: {
            isHideFooter: true
          },
        },
        // $attrs和$listeners技术点组件
        {
          path: 'attrs-listeners',
          component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
          meta: {
            isHideFooter: true
          },
        },
        // $children和$parent技术点组件
        {
          path: 'children-parent',
          component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
          meta: {
            isHideFooter: true
          },
        },
         // 作用域插槽的技术点组件
        {
          path: 'scope-slot',
          component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
          meta: {
            isHideFooter: true
          },
        },
        // provide和inject 技术点组件
        {
          path: 'provide-inject',
          component: () => import('@/pages/Communication/ProvideInjectTest/ProvideInjectTest'),
          meta: {
            isHideFooter: true
          },
        },
      ],
    },
  // 路由的重定向
  {
    path: '/',
    redirect: '/'
  }
]