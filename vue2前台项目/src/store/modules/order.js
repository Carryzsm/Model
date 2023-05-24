import { reqTradeInfo } from '@/api'
const state = {
  tradeInfo: {} // 订单页的信息数据对象
}
const mutations = {
  // 直接修改订单页的信息数据对象
  RECEIVE_TRDE_INFO (state, tradeInfo) {
    state.tradeInfo = tradeInfo
  }
}
const actions = {
  // 获取订单页的信息数据
  async getTradeInfo ({ commit }) {
    const result = await reqTradeInfo()
    if (result.code === 200) {
      commit('RECEIVE_TRDE_INFO', result.data)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}