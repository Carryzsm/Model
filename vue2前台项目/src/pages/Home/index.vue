<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />

    <!--列表-->
    <ListContainer />

    <!--今日推荐-->
    <TodayRecommend />

    <!-- 商品排行 -->
    <Rank />

    <!-- 猜你喜欢 -->
    <Like />

    <!--楼层-->

    <Floor v-for="(floor,index) in floors" :key="floor.id" :floor="floor" />

    <!--楼层-->

    <!--商标-->
    <Brand />
  </div>
</template>
<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  // 页面渲染完毕后的生命周期回调
  mounted() {
    // 分发action,获取轮播图的数据
    this.$store.dispatch('getBanners')
    this.$store.dispatch('getRecommends')
    this.$store.dispatch('getFloors')
  },
  computed: {
    ...mapState({
      floors: (state) => state.home.floors
    })
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>