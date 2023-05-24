/**
 * 
 * 前台电商项目
 * 
 * api目录-----二次封装的axios及对应的api接口的封装
 * components目录----普通组件及全局公共组件
 * mock目录----拦截ajax请求随机生成数据的
 * pages目录----存储路由组件
 * router目录---配置路由的
 * store目录----vuex
 * utils目录----封装工具函数或者工具类的
 * 
 * 
 * 项目初的组件分析
 * Header和Footer普通组件
 * Home和Search和Login和Register都是路由组件
 * 安装对应的插件
 *  vue-router / vuex / axios / less / less-loader    (stylus/stylus-loader)
 * 
 * 
 * eslint语法检查在脚手架4中的项目中的package.json文件中的第41中一个一个进行关闭操作
 * 如下:
 *  "rules": {
 *     "no-unused-vars":"off"
 *   }
 * 在vue.config.js文件中,通过设置lintOnSave该属性的值为false,关闭eslint语法检查
 * 
 * 
 * Vue中路由传参的方式:
 * params的方式和query的方式和meta的方式
 * 
 * 
 * vuex中
 * 如果出现了modules模块的形式,
 * 那么原本存在的state/mutations/actions/getters,他们的叫法发生了改变
 * modules外部的
 * state---总的state
 * mutations----总的mutations
 * actions----总的actions
 * getters----总的getters
 * 
 * 如总的state中的状态数据的使用和模块中的state中的状态数据的使用方式的区别
 * 总的state中的数据使用: 
 *  组件中: this.$store.state.testA  或者  ...mapState(['testA'])
 * 如果出现了模块后
 * state中的数据使用:
 *  组件中: this.$store.state.模块名.testB  或者   ...mapState({testB:state=>state.模块.testB})
 * 
 * 如总的actions和模块中的actions的区别
 * 如果存在相同的方法,那么先调用的是总的action,然后再调用模块中的action
 * 
 * 
 */