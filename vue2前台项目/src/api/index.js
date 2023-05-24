// 封装api接口请求函数
// 引入axios
import ajax from './ajax'
import ajaxMock from './ajaxMock'
// 获取首页三级分类信息的api接口函数
export const reqBaseCategoryList = () => ajax.get(`/product/getBaseCategoryList`)
// 获取首页的广告轮播图数据的api接口
export const reqBanners = () => ajax.get('/cms/banner')

// 获取今日推荐的数据的接口---mockjs的方式来获取数据
export const reqRecommends = () => ajaxMock.get('/recommends')
// 获取楼层的数据的接口---mockjs的方式来获取数据
export const reqFloors = () => ajaxMock.get('/floors')
// 获取商品信息对象的api接口
export const reqProductList = (searchParams) => ajax.post('/list', searchParams)

// 根据skuId获取当前产品的详情信息接口
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)
// 根据skuId获取当前产品的优惠券和活动券的接口
export const reqCouponActivityList = (skuId) => ajax.get(`/activity/findActivityAndCoupon/${skuId}`)
// 根据优惠券的id来领取优惠券的接口
export const reqGetCouponInfo = (couponId) => ajax.get(`/activity/auth/getCouponInfo/${couponId}`)



// 登录接口
export const reqLogin = (phone, password) => ajax.post(`/user/passport/login`, { phone, password })
// 获取用户信息接口
export const reqGetUserInfo = () => ajax.get(`/user/passport/auth/getUserInfo`)
// 注册接口
export const reqRegister = (userInfo) => ajax.post(`/user/passport/register`, userInfo)
// 退出接口
export const reqLogout = () => ajax.get(`/user/passport/logout`)
// 发送验证码的接口
export const reqSendCode = (phone) => ajax.get(`/user/passport/sendCode/${phone}`)



// 添加购物车的api接口函数(不仅可以实现添加购物车,也可以修改商品的数量),
// skuNum是-1 数量减1  skuNum是1 数量加1
export const reqAddtoCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取购物车列表数据的接口
export const reqGetShopCartList = () => ajax.get('/cart/cartList')

// 修改购物项的选中状态
export const reqChangeCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
// 批量修改购物项的选中状态
export const reqChangeCheckCartItems = (skuIdList, isChecked) => ajax.post(`/cart/batchCheckCart/${isChecked}`, skuIdList)
// 删除购物项的接口
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)
// 批量删除购物项的接口
export const reqDeleteCartItems = (skuIdList) => ajax.delete(`/cart/batchDeleteCart`, { data: skuIdList })

// 获取订单页的信息数据的api接口函数
export const reqTradeInfo = () => ajax.get(`/order/auth/trade`)
// 获取用户地址信息数据的api接口函数
export const reqUserAddressList = () => ajax.get(`/user/userAddress/auth/findUserAddressList`)
// 获取大区的地址信息数据的api接口函数
export const reqAddressBaseRegion = () => ajax.get(`/user/userAddress/auth/findBaseRegion`)
// 根据大区的地址的id获取对应的省份信息数据的api接口函数
export const reqAddressBaseProvince = (regionId) => ajax.get(`/user/userAddress/auth/findBaseProvinceByRegionId/${regionId}`)
// 新增用户地址信息数据的api接口函数
export const reqAddAddress = (userAddressInfo) => ajax.post(`/user/userAddress/auth/save`, userAddressInfo)
// 删除用户地址信息数据的api接口函数
export const reqDeleteAddress = (userAddressId) => ajax.get(`/user/userAddress/auth/delete/${userAddressId}`)
// 更新用户地址信息数据的api接口函数--坑
export const reqUpdateAddress = (userAddressId) => ajax.post(`/user/userAddress/auth/update`, userAddressId)

// 提交订单的api接口函数
export const reqSubmitOrderInfo = (tradeNo, orderInfo) => ajax({
  method: 'POST', // 方式
  url: '/order/auth/submitOrder', // 地址
  params: { tradeNo }, // 参数
  data: orderInfo // 数据对象
})

// 获取订单详情的相关信息的接口函数
export const reqOrderDetail = (orderId) => ajax.get(`/order/auth/getOrderDetail/${orderId}`)

// 获取订单支付的相关信息
export const reqPayInfo = (payInfoId) => ajax.get(`/payment/weixin/createNative/${payInfoId}`)

// 查询支付的状态
export const reqPayStatus = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 获取订单的列表数据的接口
export const reqOrderList = (page, limit) => ajax.get(`/order/auth/${page}/${limit}`)

// 获取订单详细信息的接口
export const reqOrderDetailInfo = (orderId) => ajax.get(`/order/auth/${orderId}`)


// 获取退款列表数据的api接口
export const reqRefundList = (page, limit) => ajax.get(`/order/orderRefundInfo/auth/${page}/${limit}`)


// 退货后的发货
export const reqOrderRefundInfo = (id, trackingNo) => ajax.post(`/order/orderRefundInfo/auth/delevered/${id}/​${trackingNo}`)

// 发起退货/退款的接口
export const reqRefundInfo = (orderRefundInfo) => ajax.post(`/order/orderRefundInfo/auth/save`, orderRefundInfo)