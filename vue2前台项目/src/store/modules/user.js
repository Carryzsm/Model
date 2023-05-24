// 引入userTempId
import { getUserTempId, saveToken, getToken, removeToken } from '@/utils'
// 引入api接口函数
import { reqRegister, reqLogin, reqLogout, reqGetUserInfo,reqUserAddressList } from '@/api'
const state = {
  userTempId: getUserTempId(), // 用户的临时凭证id数据
  userInfo: {}, // 用户信息对象
  token: getToken(), // token信息存储
  userAddressList:[] // 用户的地址信息数据
}
const mutations = {
  // 直接修改用户信息
  RECEIVE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  // 重置用户信息(清空)
  RESET_USER_INFO (state) {
    state.userInfo = {}
  },
  // 直接修改token信息
  RECEIVE_TOKEN (state, token) {
    state.token = token
  },
  // 重置token信息(清空)
  RESET_TOKEN (state) {
    state.token = ''
  },
  // 直接修改用户的地址信息数据
  RECEIVE_ADDRESS_LIST(state,userAddressList){
    state.userAddressList = userAddressList
  }

}
const actions = {
  // 注册
  async register ({ commit }, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code !== 200) {
      // 抛出一个错误消息
      throw new Error(result.message || '注册失败')
    }
  },
  // 登录
  async login ({ commit }, { phone, password }) {
    const result = await reqLogin(phone, password)
    if (result.code === 200) {
      // 获取用户信息对象
      const userInfo = result.data
      // 获取token
      const token = userInfo.token
      // 删除userInfo对象中的token信息
      delete userInfo.token
      // 存储用户信息
      commit('RECEIVE_USER_INFO', userInfo)
      // 存储token信息---vuex
      commit('RECEIVE_TOKEN', token)
      // 缓存token信息---浏览器的缓存localStorage中
      saveToken(token)
    } else {
      throw new Error(result.message || '登录失败')
    }
  },
  // 获取用户信息
  async getUserInfo ({ commit }) {
    // 自动登录的时候调用
    const result = await reqGetUserInfo()
    if (result.code === 200) {
      // 保存用户信息
      commit('RECEIVE_USER_INFO', result.data)
    } else {
      throw new Error(result.message || '未登录')
    }
  },
  // 退出
  async logout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      // 干掉用户信息
      commit('RESET_USER_INFO')
      // 干掉token信息---vuex
      commit('RESET_TOKEN')
      // 干掉token信息---localStorage
      removeToken()
    } else {
      throw new Error(result.message || '退出失败')
    }
  },
  // 获取用户的地址信息数据
  async getUserAddressList({commit}){
    const result =await reqUserAddressList()
    if(result.code===200){
      commit('RECEIVE_ADDRESS_LIST',result.data)
    }
  }

}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}