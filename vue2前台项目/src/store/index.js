// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入state
import state from './state'
// 引入mutations
import mutations from './mutations'
// 引入actions
import actions from './actions'
// 引入getters
import getters from './getters'
import modules from './modules'
// const home ={
//   state,
//   mutations,
//   actions,
//   getters
// }
// const search = {
//   state,
//   mutations,
//   actions,
//   getters
// }
// const modules= {
//   home,
//   search
// }
// 声明使用vuex
Vue.use(Vuex)
// 实例化Store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})