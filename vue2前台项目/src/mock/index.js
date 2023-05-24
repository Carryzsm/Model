// 引入Mock
import Mock from 'mockjs'
// 引入今日推荐的数据
import recommends from './recommends.json'
// 引入楼层的数据
import floors from './floors.json'
// 生成随机的数据
Mock.mock('/mock/recommends',{code:200,data:recommends})
Mock.mock('/mock/floors',{code:200,data:floors})
// console.log('执行了mock')


// 面试题: 根据提供的用户名和密码实现页面中的登录效果,登录成功,则提示,欢迎使用xxx公司系统,登录失败则提示帐号或者密码错误---类似这种的面试题,admin/123
// 下载脚手架工具,下载vue项目模版,搭建服务器,实现跨域,使用mockjs模拟后台数据

