// 二次封装axios
// 引入axios
import axios from 'axios'
// 引入Nprogress (带有进度条效果的插件)
import Nprogress from 'nprogress'
// 引入该插件的样式
import 'nprogress/nprogress.css'
// 设置请求的超时时间和根路径
const ajax = axios.create({
  baseURL:'/mock' , // 设置根路径
  timeout:20000 // 设置请求的超时时间
})
// 请求拦截器的封装
ajax.interceptors.request.use(config=>{
  // 显示进度条的效果
  Nprogress.start()
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
  alert('错误信息:'+error.message||'未知错误')
  // 直接返回一个中断错误的信息
  // return new Promise(()=>{})
  // 外部可以处理也可以不处理错误信息
  return Promise.reject(error)
})

export default ajax