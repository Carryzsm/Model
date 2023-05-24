<template>
  <div>
    <Header />
    <!--路由视图-->
    <router-view />
    <!--通过路由信息对象隐藏底部组件-->
    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'
// 引入axios
// import { reqRecommends,reqFloors } from './api'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  // 页面加载后发送异步请求,获取数据
  mounted() {
    // const url =`http://39.99.186.36/api/product/getBaseCategoryList`
    // const result = await axios.get(url)
    // console.log(result.data)
    // const result = await reqBaseCategoryList()
    // console.log(result)
    // this.$store.dispatch('xxx')
    this.$store.dispatch('getBaseCategoryList')
    // const result1 = await reqRecommends()
    // const result2 = await reqFloors()
    // console.log(result1)
    // console.log(result2)
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>