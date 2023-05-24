// 二次封装axios
// 引入axios
import axios from 'axios'
// 引入Nprogress (带有进度条效果的插件)
import Nprogress from 'nprogress'
// 引入该插件的样式
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'
import {Message} from 'element-ui'
import router from '@/router'
// 设置请求的超时时间和根路径
const ajax = axios.create({
  baseURL:'/api', // 根路径
  timeout:20000 // 设置请求的超时时间
})
// 请求拦截器的封装
ajax.interceptors.request.use(config=>{
  // 显示进度条的效果
  Nprogress.start()
  // 从store中读取出来userTempId数据
  const userTempId = store.state.user.userTempId
  // 放在请求头中
  config.headers.userTempId = userTempId
  // 获取token
  const token = store.state.user.token
  if(token){
    config.headers.token = token
  }
  return config
})
// 响应拦截器的封装
ajax.interceptors.response.use(response=>{
  // 隐藏进度条
  Nprogress.done()
  return response.data
},error=>{
  // 隐藏进度条
  Nprogress.done()

  // 请求的时候出现的错误信息
  const {response} = error
  // 判断请求的时候响应回来的错误信息数据是否存在
  if(response&&response.status){
    // 如果当前的错误码是401,则是token的问题
    if(response.status===401){
      // 可能串改或者过期了
      // 判断当前的路由的地址是不是login
      // currentRoute----路由信息对象 相当于 $route
      if(router.currentRoute.path!=='/login'){
        // token有问题,清掉
        // this.$store.dispatch('logout')
        store.dispatch('logout')
        // 同时直接跳转到login
        router.replace('/login')
      }
    }else{
      Message.error('请求出错了'+error.message)
    }
  }else if(!response){
    Message.error('您的网络资源有问题,服务器异常')
  }
  // alert('错误信息:'+error.message||'未知错误')
  // 直接返回一个中断错误的信息
  // return new Promise(()=>{})
  // 外部可以处理也可以不处理错误信息
  return Promise.reject(error)
})

export default ajax