// 引入api接口函数
import { reqBaseCategoryList, reqBanners, reqRecommends, reqFloors } from '@/api'
const state = {
  baseCategoryList: [], // 存储三级分类信息数据的数组
  banners: [], // 存储轮播图数据的数组
  recommends: [], // 今日推荐的数据
  floors: [] // 楼层的数据
}
const mutations = {
  // 修改分类信息的数据的方法
  RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
    // 截取后面的两个数据,不要了
    state.baseCategoryList = baseCategoryList.splice(0, baseCategoryList.length - 2)
  },
  // 修改轮播图的数据的方法
  RECEIVE_BANNERS (state, banners) {
    state.banners = banners
  },
  // 修改今日推荐的数据
  RECEIVE_RECOMMENDS (state, recommends) {
    state.recommends = recommends
  },

  // 修改楼层的数据
  RECEIVE_FLOORS (state, floors) {
    state.floors = floors
  },
}
const actions = {
  // 调用接口获取三级分类信息数据
  async getBaseCategoryList ({ commit }) {
    // 调用api接口函数
    const result = await reqBaseCategoryList()
    // console.log(result)
    if (result.code === 200) {
      // 提交mutation
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
    }
  },
  // 调用接口获取轮播图的数据
  async getBanners ({ commit }) {
    // 调用api接口函数,发送请求
    const result = await reqBanners()
    if (result.code === 200) {
      commit('RECEIVE_BANNERS', result.data)
    }
  },
  // 调用接口获取今日推荐的数据
  async getRecommends ({ commit }) {
    const result = await reqRecommends()
    if (result.code === 200) {
      commit('RECEIVE_RECOMMENDS', result.data)
    }
  },

  // 调用接口获取楼层的数据
  async getFloors ({ commit }) {
    const result = await reqFloors()
    if (result.code === 200) {
      commit('RECEIVE_FLOORS', result.data)
    }
  },

}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}