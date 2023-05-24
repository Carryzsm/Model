
// 引入api接口函数
import { reqProductList } from '@/api'
const state = {
  productList: {} // 商品信息数据对象
}
const mutations = {
  // 修改商品信息数据对象
  RECEIVE_PRODUCT_LIST (state, productList) {
    state.productList = productList
  }
}
const actions = {
  // 获取商品信息对象数据
  async getProductList ({ commit }, searchParams) {
    // 获取传入进来的参数
    searchParams = {...searchParams}
    // 过滤操作
    Object.keys(searchParams).forEach((key)=>{
      if(searchParams[key]===''|| searchParams[key] instanceof Array&& searchParams[key].length===0){
        // 如果当前的属性值是空的或者该属性是个空数组,直接干掉这个属性
        delete searchParams[key]
      }
    })
    const result = await reqProductList(searchParams)
    if (result.code === 200) {
      commit('RECEIVE_PRODUCT_LIST', result.data)
    }
  }
}
const getters = {
  // 获取品牌信息数据
  trademarkList (state) {
    return state.productList.trademarkList || []
  },
  // 获取平台属性信息数据
  attrsList (state) {
    return state.productList.attrsList || []
  },
  // 获取产品信息数组数据
  goodsList (state) {
    return state.productList.goodsList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}