// 引入api接口
import { reqDetailInfo, reqCouponActivityList } from '@/api'
const state = {
  detailInfo: {}, // 商品的详情信息对象
  couponInfoList: [], // 优惠券的列表数据数组
  activityRuleList: [] // 获取活动列表的数据数组
}
const mutations = {
  // 修改商品详情信息对象的数据
  RECEIVE_DETAIL_INFO (state, detailInfo) {
    state.detailInfo = detailInfo
  },
  // 修改优惠券和活动列表数据
  RECEIVE_COUPON_ACTIVITY_LIST (state, { couponInfoList, activityRuleList }) {
    state.couponInfoList = couponInfoList
    state.activityRuleList = activityRuleList
  }
}
const actions = {
  // 获取商品详情的信息数据
  async getDetailInfo ({ commit }, skuId) {
    // 调用接口,发送请求,传入skuId参数
    const result = await reqDetailInfo(skuId)
    // 判断请求是否成功
    if (result.code === 200) {
      // 提交mutation
      commit('RECEIVE_DETAIL_INFO', result.data)
    }
  },
  // 获取优惠券和活动列表的数据
  async getCouponActivityList ({ commit }, skuId) {
    // 调用接口,发送请求,传入skuId参数
    const result = await reqCouponActivityList(skuId)
    // 判断请求是否成功
    if (result.code === 200) {
      // 获取优惠券和活动列表的数据--解构出来
      const { couponInfoList, activityRuleList } = result.data
      // 提交mutation
      commit('RECEIVE_COUPON_ACTIVITY_LIST', { couponInfoList, activityRuleList })
    }

  }
}
const getters = {
  // 一坨json格式的数据---销售属性值对应产品id的键值对数据
  valuesSkuJson (state) {
    return state.detailInfo.valuesSkuJson || []
  },
  // 分类信息数据对象
  categoryView (state) {
    return state.detailInfo.categoryView || {}
  },
  // 销售属性值数组
  spuSaleAttrList (state) {
    return state.detailInfo.spuSaleAttrList || []
  },
  // 产品的详情信息对象
  skuInfo (state) {
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo : {}
  },
  // 轮播图数据数组
  skuImageList (state) {
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo.skuImageList : []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}