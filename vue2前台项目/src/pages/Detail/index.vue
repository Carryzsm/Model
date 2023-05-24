<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span>{{ categoryView.category1Name }}</span>
        <span>{{ categoryView.category2Name }}</span>
        <span>{{ categoryView.category3Name }}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom v-if="skuImageList.length > 0" :smallImg="skuImageList[currentIndex].imgUrl" :bigImg="skuImageList[currentIndex].imgUrl" />
          <!-- 小图列表 -->
          <ImageList @changeCurrentIndex="changeCurrentIndex" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
              {{ skuInfo.skuName }}
            </h3>
            <p class="news">
              推荐选择下方[移动优惠购],手机套餐齐搞定,不用换号,每月还有花费返
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">价 格</div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>

              <!--优惠券相关-->
              <div class="couponWrap" v-if="couponInfoList.length > 0" @click="isShow = !isShow">
                <div class="fl title">
                  <i>优 惠 券</i>
                </div>
                <div class="fl fix-width">
                  <div class="fl fix-width">
                    <a href="javascript:;" :title="couponInfo.couponName" v-for="(couponInfo, index) in couponInfoList" :key="couponInfo.id">
                      <i class="red-bg i-coupon" v-if="couponInfo.couponType === 'CASH'">现金券{{ couponInfo.benefitAmount }}元</i>
                      <i class="red-bg i-coupon" v-else-if="couponInfo.couponType === 'FULL_REDUCTION'">满{{ couponInfo.conditionAmount }}减{{couponInfo.benefitAmount}}元</i>
                      <i class="red-bg i-coupon" v-else-if="couponInfo.couponType === 'FULL_DISCOUNT'">满{{ couponInfo.conditionNum }}件打{{  couponInfo.benefitDiscount }}折</i>
                      <i class="red-bg i-coupon" v-else-if="couponInfo.couponType === 'DISCOUNT'">折扣券{{ couponInfo.benefitDiscount }}折</i>
                    </a>
                  </div>
                </div>
              </div>

              <!--活动列表促销相关-->
              <div class="activityWrap" v-if="activityRuleList.length > 0">
                <div class="fl title">
                  <i>促 销</i>
                </div>
                <div class="fl fix-width">
                  <div v-for="(activity, index) in activityRuleList" :key="activity.id">
                    <i class="red-bg">
                      {{
                        activity.activityType === 'FULL_REDUCTION'
                          ? '满减'
                          : '折扣'
                      }}
                    </i>
                    <em class="t-gray" v-if="activity.activityType === 'FULL_REDUCTION'">
                      满{{ activity.conditionAmount }}减{{
                        activity.benefitAmount
                      }}元
                    </em>
                    <em class="t-gray" v-else-if="activity.activityType === 'FULL_DISCOUNT'">
                      满{{ activity.conditionNum }}件打{{
                        activity.benefitDiscount
                      }}折
                    </em>
                  </div>
                </div>
              </div>
            </div>
            <!--这里有产品的重量信息-->
            <div class="support">
              <div class="supportArea">
                <div class="title">支 持</div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">北京市 昌平区 宏福苑</div>
              </div>
              <div class="supportArea">
                <div class="title">重量</div>
                <div class="fixWidth">{{ skuInfo.weight }}</div>
              </div>
            </div>
          </div>
          <!--销售属性值数据相关-->
          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="(attr, index) in spuSaleAttrList" :key="attr.id">
                <dt class="title">{{ attr.saleAttrName }}</dt>
                <dd changepirce="0" :class="{ active: val.isChecked === '1' }" v-for="val in attr.spuSaleAttrValueList" :key="val.id" @click="setVal(val, attr, index)">
                  {{ val.saleAttrValueName }}
                  <!-- <span title="点击取消选择" :class="{cancel:val.isChecked==='1'}"></span> -->
                  <span title="点击取消选择" class="cancel" v-show="val.isChecked === '1'"></span>
                </dd>
              </dl>
            </div>

            <!--关于修改数量的相关内容-->
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="skuNum" @change="chekcSkuNum" />
                <a href="javascript:" class="plus" @click="changeSkuNum(1)">+</a>
                <a href="javascript:" class="mins" @click="changeSkuNum(-1)">-</a>
              </div>
              <div class="add">
                <a href="javascript:" v-if="isAddCart" @click="addToCart">加入购物车</a>
                <a href="javascript:" v-else style="background-color: #c6c6c6">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--侧栏面板开始-->
    <div class="J-global-toolbar">
      <div class="toolbar-wrap J-wrap">
        <div class="toolbar" :style="isShow ? 'width: 270px' : ''">
        <!-- <div class="toolbar" style="width: 270px"> -->
          <div class="toolbar-panels J-panel">
            <div id="coupon-div" class="J-content toolbar-panel tbar-panel-history toolbar-animate-in">
              <h3 class="tbar-panel-header J-panel-header coupon-more">
                <a href="#none" class="title">
                  <i></i>
                  <em class="title">我的优惠券</em>
                </a>
                <span class="close-panel J-close"></span>
              </h3>
              <div class="tbar-panel-main">
                <div class="tbar-panel-content J-panel-content">
                  <div class="jt-history-wrap" style="height: 1000px; overflow-y: scroll">
                    <ul style="overflow: auto">
                      <li class="jth-item" style="width: 190px; height: 100%; padding: 10px" v-for="(couponInfo, index) in couponInfoList" :key="couponInfo.id">
                        <div class="coupon-price">
                          <span class="token" v-if="couponInfo.couponType === 'CASH'">{{ couponInfo.benefitAmount }}元</span>
                          <span class="token" v-else-if="
                              couponInfo.couponType === 'FULL_REDUCTION'
                            ">{{ couponInfo.benefitAmount }}元</span>
                          <span class="token" v-else-if="
                              couponInfo.couponType === 'FULL_DISCOUNT'
                            ">{{ couponInfo.benefitDiscount }}折</span>
                          <span class="token" v-else-if="couponInfo.couponType === 'DISCOUNT'">{{ couponInfo.benefitDiscount }}折</span>

                          <span class="coupon-name" v-if="couponInfo.couponType === 'CASH'">现金券</span>
                          <span class="coupon-name" v-else-if="
                              couponInfo.couponType === 'FULL_REDUCTION'
                            ">满减券</span>
                          <span class="coupon-name" v-else-if="
                              couponInfo.couponType === 'FULL_DISCOUNT'
                            ">满件打折券</span>
                          <span class="coupon-name" v-else-if="couponInfo.couponType === 'DISCOUNT'">折扣券</span>
                        </div>
                        <div class="coupon-info">
                          <span class="condition" v-if="couponInfo.couponType === 'CASH'">现金券{{ couponInfo.benefitAmount }}元</span>
                          <span class="condition" v-else-if="
                              couponInfo.couponType === 'FULL_REDUCTION'
                            ">满{{ couponInfo.conditionAmount }}减{{
                              couponInfo.benefitAmount
                            }}元</span>
                          <span class="condition" v-else-if="
                              couponInfo.couponType === 'FULL_DISCOUNT'
                            ">满{{ couponInfo.conditionNum }}件打{{
                              couponInfo.benefitDiscount
                            }}折</span>
                          <span class="condition" v-else-if="couponInfo.couponType === 'DISCOUNT'">折扣券{{ couponInfo.benefitDiscount }}折</span>

                          <p>{{ couponInfo.rangeDesc }}</p>
                        </div>
                        <p class="coupon-time">
                          过期时间：{{ couponInfo.expireTime }}
                        </p>
                        <div class="coupon-seal" v-if="
                            couponInfo.isGet > 0 &&
                            couponInfo.couponStatus === 'NOT_USED'
                          "></div>
                        <div class="coupon-term" v-if="
                            couponInfo.isGet > 0 &&
                            couponInfo.couponStatus === 'USED'
                          "></div>

                        <button type="button" class="sui-btn btn-primary btn-large hm-action-statistics" v-if="couponInfo.isGet === 0" @click="receiveCouponInfo(couponInfo.id, couponInfo)">
                          领&nbsp;取
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="tbar-panel-footer J-panel-footer"></div>
            </div>
          </div>
          <div class="toolbar-header"></div>
          <div class="toolbar-tabs J-tab">
            <div data="购物车" tag="cart" class="toolbar-tab tbar-tab-cart">
              <i class="tab-ico"></i>
              <em class="tab-text"></em>
              <span id="tab-sub-cart-count" class="tab-sub J-count">0</span>
            </div>
            <div data="我的关注" tag="follow" class="toolbar-tab tbar-tab-follow">
              <i class="tab-ico"></i>
              <em class="tab-text"></em>
              <span class="tab-sub J-count hide">0</span>
            </div>
            <div data="我的足迹" tag="history" class="toolbar-tab tbar-tab-history">
              <i class="tab-ico"></i>
              <em class="tab-text"></em>
              <span class="tab-sub J-count hide">0</span>
            </div>
          </div>
          <div class="toolbar-footer">
            <div class="toolbar-tab tbar-tab-top">
              <a href="#">
                <i class="tab-ico"></i>
                <em class="footer-tab-text">顶部</em>
              </a>
            </div>
            <div class="toolbar-tab tbar-tab-feedback">
              <a href="#" target="_blank">
                <i class="tab-ico"></i>
                <em class="footer-tab-text">反馈</em>
              </a>
            </div>
          </div>
          <div class="toolbar-mini"></div>
        </div>
        <div id="J-toolbar-load-hook"></div>
      </div>
    </div>

    <!-- 内容详情页 -->
    <!-- <section class="product-detail">
      <aside class="aside">
        <div class="tabWraped">
          <h4 class="active">相关分类</h4>
          <h4>推荐品牌</h4>
        </div>
        <div class="tabContent">
          <div class="tab-pane active">
            <ul class="partList">
              <li>手机</li>
              <li>手机壳</li>
              <li>内存卡</li>
              <li>Iphone配件</li>
              <li>贴膜</li>
              <li>手机耳机</li>
              <li>移动电源</li>
              <li>平板电脑</li>
            </ul>
            <ul class="goodsList">
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part01.png" />
                  </div>
                  <div class="attr">Apple苹果iPhone 6s (A1699)</div>
                  <div class="price">
                    <em>¥</em>
                    <i>6088.00</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-pane">
            <p>推荐品牌</p>
          </div>
        </div>
      </aside>
      <div class="detail">
        <div class="fitting">
          <h4 class="kt">选择搭配</h4>
          <div class="good-suits">
            <div class="master">
              <img src="./images/l-m01.png" />
              <p>￥5299</p>
              <i>+</i>
            </div>
            <ul class="suits">
              <li class="suitsItem">
                <img src="./images/dp01.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="39" />
                  <span>39</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp02.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="50" />
                  <span>50</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp03.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="59" />
                  <span>59</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp04.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="99" />
                  <span>99</span>
                </label>
              </li>
            </ul>
            <div class="result">
              <div class="num">已选购0件商品</div>
              <div class="price-tit">套餐价</div>
              <div class="price">￥5299</div>
              <button class="addshopcar">加入购物车</button>
            </div>
          </div>
        </div>
        <div class="intro">
          <ul class="tab-wraped">
            <li class="active">
              <a href="###">商品介绍</a>
            </li>
            <li>
              <a href="###">规格与包装</a>
            </li>
            <li>
              <a href="###">售后保障</a>
            </li>
            <li>
              <a href="###">商品评价</a>
            </li>
            <li>
              <a href="###">手机社区</a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <ul class="goods-intro">
                <li>分辨率：1920*1080(FHD)</li>
                <li>后置摄像头：1200万像素</li>
                <li>前置摄像头：500万像素</li>
                <li>核 数：其他</li>
                <li>频 率：以官网信息为准</li>
                <li>品牌： Apple</li>
                <li>商品名称：APPLEiPhone 6s Plus</li>
                <li>商品编号：1861098</li>
                <li>商品毛重：0.51kg</li>
                <li>商品产地：中国大陆</li>
                <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
                <li>系统：苹果（IOS）</li>
                <li>像素：1000-1600万</li>
                <li>机身内存：64GB</li>
              </ul>
              <div class="intro-detail">
                <img src="./images/intro01.png" />
                <img src="./images/intro02.png" />
                <img src="./images/intro03.png" />
              </div>
            </div>
            <div id="two" class="tab-pane">
              <p>规格与包装</p>
            </div>
            <div id="three" class="tab-pane">
              <p>售后保障</p>
            </div>
            <div id="four" class="tab-pane">
              <p>商品评价</p>
            </div>
            <div id="five" class="tab-pane">
              <p>手机社区</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import ImageList from './ImageList/ImageList'
import Zoom from './Zoom/Zoom'
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Detail',
  components: {
    ImageList,
    Zoom
  },
  data() {
    return {
      isShow: false, // 隐藏或者显示侧边栏的标识
      currentIndex: 0, // 用来保存轮播图图片改变后的索引
      selectedSpuSaleAttrValueList: [], // 存储的是当前点击(选中)的属性值对象中的id(属性值对应的id)
      isAddCart: true, // 设置  加入购物车 按钮 是否高亮显示,默认是高亮的
      skuNum: 1 // 商品的数量
    }
  },
  // 计算属性
  computed: {
    // 获取优惠券和活动列表的数据
    ...mapState({
      // 优惠券
      couponInfoList: (state) => state.detail.couponInfoList,
      // 活动列表促销券
      activityRuleList: (state) => state.detail.activityRuleList,
      // 获取用户信息数据
      userInfo: (state) => state.user.userInfo
    }),
    // 获取一坨json格式的属性值对应产品skuId的键值对数据
    // 分类信息对象,销售属性值数组,产品详情信息对象,轮播图数据
    ...mapGetters([
      'valuesSkuJson',
      'categoryView',
      'spuSaleAttrList',
      'skuInfo',
      'skuImageList'
    ])
  },
  // 默认情况下,监视对象中的代码是不会执行的,只有监视的数据,变化了,然后才执行
  // 希望默认的情况下,就让监视的代码执行一次,此时可以设置
  // 监视路由信息对象
  watch: {
    $route: {
      // 该回调将会在侦听开始之后被立即调用
      handler(route) {
        // 获取路由地址中的params的参数skuId
        const skuId = route.params.skuId
        // 分发对应的action,action内部调用api接口,发送请求获取数据
        // 根据skuId获取商品的详情信息数据
        this.$store.dispatch('getDetailInfo', skuId)
        // 根据skuId获取当前的这个产品能够使用到的优惠券和促销(获取活动列表中的优惠券)的信息
        this.$store.dispatch('getCouponActivityList', skuId)
      },
      immediate: true
    },
    // 监视销售属性数组数据
    spuSaleAttrList: {
      // 该代码应该可以进行优化
      handler(spuSaleAttrList1) {
        // 每次数据变化的时候,先把数组中之前的数据清空
        this.selectedSpuSaleAttrValueList = []
        spuSaleAttrList1.forEach((attr) => {
          attr.spuSaleAttrValueList.forEach((val) => {
            // 把当前属性值对象中的isChecked为'1'的对应的id存储到数组中
            if (val.isChecked === '1') {
              this.selectedSpuSaleAttrValueList.push(val.id)
            }
          })
        })
        // console.log(this.selectedSpuSaleAttrValueList)
      },
      // 深度监视
      deep: true
    },
    // 监视商品的数量
    skuNum(value) {
      // 非数字的正则
      const reg = /^0+|\D+0*/g
      // 转成字符串
      value += ''
      // 判断不能是空串内容
      if (value === '') {
        this.skuNum = 1
      } else if (value.match(reg)) {
        this.skuNum = parseInt(value.replace(reg, '')) || 1
      }
      console.log(value)
    }
  },
  //
  methods: {
    // 改变选中图片索引的自定义事件对应的回调函数
    changeCurrentIndex(index) {
      // 把改变后的图片的索引,保存起来
      this.currentIndex = index
    },
    // 点击属性值,修改选中项,同时发送请求获取属性值对应的商品
    setVal(val, attr, index) {
      // 把当前的属性值对象所在的数组进行遍历
      attr.spuSaleAttrValueList.forEach((value) => (value.isChecked = '0'))
      // 当前点击的这个属性值对象的isChecked设置为'1'
      val.isChecked = '1'
      // 获取当前点击的属性值对应的id
      const valId = val.id
      // 获取存储属性值及skuId的键值对的对象
      const valuesSkuJson = JSON.parse(this.valuesSkuJson)
      // 把属性值的id保存在数组容器中
      this.selectedSpuSaleAttrValueList[index] = valId
      // 把数组中的所有的数据,变成字符串,中间以|的方式隔开  "15679|15689"
      const selectedSpuSaleAttrValue =
        this.selectedSpuSaleAttrValueList.join('|')
      // 在 存储属性值及skuId的键值对的对象 中找对应的key
      const currentSkuId = valuesSkuJson[selectedSpuSaleAttrValue]
      // 判断当前的键值对中的currentSkuId是否存在
      if (currentSkuId) {
        // 判断当前的currentSkuId和路由地址上的skuId是否一致
        // if (currentSkuId != this.$route.params.skuId) {
        // 跳转界面
        this.$router.replace(`/detail/${currentSkuId}`)
        // }
        // 修改  加入购物车  按钮的  高亮显示效果-----红色
        this.isAddCart = true
      } else {
        // 不存在,则修改  加入购物车  按钮的  高亮显示效果-----灰色的
        this.isAddCart = false
      }
    },
    // 领券操作
    async receiveCouponInfo(couponInfoId, couponInfo) {
      // 获取当前的skuId
      const skuId = this.$route.params.skuId
      // console.log(this.$store.state.user.userInfo)
      // 判断是否登录
      if (!this.userInfo.name) {
        // 未登录,则跳转到登录界面,同时传入一个query参数,记录当前的路由地址信息
        this.$router.replace(`/login?redirect=/detail/${skuId}`)
      } else {
        // 如果已经登录了,则先领券--直接调用领券的api接口函数
        const result = await this.$API.reqGetCouponInfo(couponInfoId)
        if (result.code === 200) {
          this.$store.dispatch('getCouponActivityList', skuId)
          // 优惠券是没有使用的
          couponInfo.couponStatus = 'NOT_USED'
        }
      }

      // 判断领券是否成功
      // 失败了,则提示,领券失败
      // 领券成功了,则重新根据当前的skuId获取领券的相关信息
    },
    // 加入购物车
    async addToCart() {
      // 获取skuId和skuNum
      const skuId = this.$route.params.skuId
      const skuNum = this.skuNum
      try {
        // 分发action,(异步操作)把商品添加到购物车
        await this.$store.dispatch('addToCart', { skuId, skuNum })
        // 此时添加购物车操作已经成功了
        // 路由跳转/addcartsuccess界面---路由组件,并传参
        this.$router.replace({ name: 'addcartsuccess', query: { skuNum } })
        // 把产品信息缓存到浏览器中
        sessionStorage.setItem('SKUINFO_KEY', JSON.stringify(this.skuInfo))
      } catch (error) {
        // 提示添加购物车操作失败了($message是element-ui中的某个组件)
        this.$message.error(error.message || '添加购物车失败')
        // alert(error.message||'添加购物车失败')
      }
    },
    // 改变商品数量
    changeSkuNum(skuNum) {
      this.skuNum += skuNum * 1
    },
    // 失去光标事件
    chekcSkuNum() {
      this.skuNum = this.skuNum * 1
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: '/\00a0';
        padding: 0 5px;
        color: #ccc;
      }

      .skuDesc {
        color: #999;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }

          .couponWrap,
          .activityWrap {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;
            .fl {
              float: left;
            }

            .title {
              margin-right: 15px;
              float: left;
            }

            .fix-width {
              width: 520px;
              float: left;
              color: #999;
              .i-coupon {
                background: #ffdedf;
                border: 1px solid #df3033;
                font-size: 12px;
                color: #df3033;
                padding: 3px 12px;
                margin-right: 12px;
              }
            }
          }

          .activityWrap {
            .red-bg {
              background: #c81623;
              color: #fff;
              padding: 3px;
            }
            .t-gray {
              margin-left: 5px;
              color: #999;
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                position: relative;
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: green;
                  border: 1px solid green;
                  span {
                    background: url(./images/choosed.png) no-repeat;
                  }
                }
                .cancel {
                  width: 13px;
                  height: 13px;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  overflow: hidden;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .product-detail {
    width: 1200px;
    margin: 30px auto 0;
    overflow: hidden;

    .aside {
      width: 210px;
      float: left;
      border: 1px solid #ccc;

      .tabWraped {
        height: 40px;

        h4 {
          border-top: 3px solid #fff;
          float: left;
          line-height: 37px;
          width: 105px;
          text-align: center;
          border-bottom: 1px solid #ccc;

          &.active {
            border-top: 3px solid #e1251b;
            border-bottom: 0;
            font-weight: normal;
          }
        }
      }

      .tabContent {
        padding: 10px;

        .tab-pane {
          display: none;

          &.active {
            display: block;
          }

          &:nth-child(1) {
            .partList {
              overflow: hidden;

              li {
                width: 50%;
                float: left;
                border-bottom: 1px dashed #ededed;
                line-height: 28px;
              }
            }

            .goodsList {
              & > li {
                margin: 5px 0 15px;
                border-bottom: 1px solid #ededed;
                padding-bottom: 5px;

                .list-wrap {
                  .p-img {
                    text-align: center;

                    img {
                      width: 152px;
                    }
                  }

                  .price {
                    font-size: 16px;
                    color: #c81623;
                  }

                  .operate {
                    text-align: center;
                    margin: 5px 0;

                    a {
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;
                      display: inline-block;
                      padding: 2px 14px;
                      line-height: 18px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail {
      width: 980px;
      float: right;

      .fitting {
        border: 1px solid #ddd;
        margin-bottom: 15px;

        .kt {
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          padding: 5px 0 5px 15px;
        }

        .good-suits {
          height: 170px;
          padding-top: 10px;

          .master {
            width: 127px;
            height: 165px;
            text-align: center;
            position: relative;
            float: left;

            img {
              width: 87px;
            }

            p {
              color: #c81623;
              font-size: 16px;
              font-weight: 700;
            }

            i {
              position: absolute;
              top: 48px;
              right: -25px;
              font-size: 16px;
            }
          }

          .suits {
            width: 668px;
            height: 165px;
            float: left;

            .suitsItem {
              float: left;
              width: 127px;
              padding: 0 20px;
              text-align: center;

              img {
                width: 120px;
                height: 130px;
              }

              p {
                font-size: 12px;
              }

              label {
                display: block;
                position: relative;

                input {
                  vertical-align: middle;
                }

                span {
                  vertical-align: middle;
                }
              }
            }
          }

          .result {
            border-left: 1px solid #ddd;
            width: 153px;
            height: 165px;
            padding-left: 20px;
            float: left;

            .num {
              font-size: 14px;
              margin-bottom: 10px;
              margin-top: 10px;
            }

            .price-tit {
              font-weight: bold;
              margin-bottom: 10px;
            }

            .price {
              color: #b1191a;
              font-size: 16px;
              margin-bottom: 10px;
            }

            .addshopcar {
              background-color: #e1251b;
              border: 1px solid #e1251b;
              padding: 10px 25px;
              font-size: 16px;
              color: #fff;
              display: inline-block;
              box-sizing: border-box;
            }
          }
        }
      }

      .intro {
        .tab-wraped {
          background: #ededed;
          // border: 1px solid #ddd;
          overflow: hidden;

          li {
            float: left;

            & + li > a {
              border-left: 1px solid #ddd;
            }

            &.active {
              a {
                // border: 0;
                background: #e1251b;
                color: #fff;
              }
            }

            a {
              display: block;
              height: 40px;
              line-height: 40px;
              padding: 0 11px;
              text-align: center;
              color: #666;
              background: #fcfcfc;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
            }
          }
        }

        .tab-content {
          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .goods-intro {
                padding-left: 10px;

                li {
                  margin: 10px 0;
                }
              }

              .intro-detail {
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }

  .J-global-toolbar {
    .toolbar-wrap {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9990;
      width: 35px;
      height: 100%;
      .toolbar {
        position: absolute;
        right: 0;
        top: 0;
        width: 29px;
        height: 100%;
        border-right: 6px solid #7a6e6e;
        transition: width 400ms ease;
        .toolbar-panels {
          position: absolute;
          left: 35px;
          top: 0;
          width: 270px;
          height: 100%;
          z-index: 2;
          background: #eceaea none repeat scroll 0 0;
          .toolbar-panel {
            width: 270px;
            height: 100%;
            position: absolute;
            background: #eceaea none repeat scroll 0 0;
            .tbar-panel-header {
              position: relative;
              width: 270px;
              height: 40px;
              line-height: 40px;
              background: #eceaea none repeat scroll 0 0;
              font-family: 'microsoft yahei';
              font-weight: 400;
              margin: 0;
              padding: 0;
              .title {
                display: inline-block;
                height: 40px;
                color: #5e5050;
                font: 16px/40px '微软雅黑';
                i {
                  display: inline-block;
                  background-image: url(./images/cartPanelViewIcons.png);
                  background-repeat: no-repeat;
                  margin-right: 4px;
                  margin-left: 10px;
                  vertical-align: top;
                  width: 20px;
                  height: 17px;
                  margin-top: 11px;
                  background-position: 0 -100px;
                }
                em {
                  display: inline-block;
                  vertical-align: top;
                  height: 40px;
                  color: #5e5050;
                  font: 16px/40px '微软雅黑';
                  margin-right: 15px;
                }
              }
              .close-panel {
                width: 12px;
                height: 12px;
                background-position: 0 -250px;
                position: absolute;
                right: 8px;
                top: 16px;
                cursor: pointer;
                transition: transform 0.2s ease-out 0s;
                display: inline-block;
                font-style: normal;
                background-image: url(./images/cartPanelViewIcons.png);
                background-repeat: no-repeat;
              }
            }
            .tbar-panel-main {
              position: relative;
              margin: 0;
              padding: 0;
              font: 12px/150% Arial, Verdana, '宋体';
              color: #666;
              .tbar-panel-content {
                width: 270px;
                overflow-y: auto;
                overflow-x: hidden;
                position: relative;
                .hide {
                  display: none;
                }
                .tbar-tipbox {
                  .tip-inner {
                    padding: 6px 5px;
                    border: 1px solid #edd28b;
                    background: #fffdee none repeat scroll 0 0;
                    text-align: center;
                    .tip-text {
                      display: inline-block;
                      line-height: 20px;
                      vertical-align: middle;
                      color: #333;
                    }
                    .tip-btn {
                      display: inline-block;
                      height: 20px;
                      line-height: 20px;
                      padding: 0 5px;
                      margin-left: 5px;
                      color: #fff;
                      vertical-align: middle;
                      background: #c81623 none repeat scroll 0 0;
                    }
                  }
                }
                .jt-history-wrap {
                  height: 1000px;
                  overflow-y: scroll;
                  width: 235px;
                  margin: 0 auto;
                  .jth-item {
                    float: left;
                    position: relative;
                    width: 190px;
                    height: 100%;
                    padding: 10px;
                    margin-right: 15px;
                    background: #fff none repeat scroll 0 0;
                    margin-bottom: 15px;
                    .coupon-price {
                      float: left;
                      width: 180px;
                      font-family: Arial;
                      font-size: 0;
                      font-weight: 700;
                      display: inline;
                      color: #74d2d4;
                      .token {
                        position: relative;
                        font-size: 16px;
                        font-family: 'microsoft yahei';
                        top: -8px;
                        left: 2px;
                        font-weight: 400;
                        color: #74d2d4;
                      }
                      .coupon-name {
                        font-size: 12px;
                        font-family: 'Microsoft Yahei';
                        font-weight: normal;
                        padding-left: 8px;
                        color: #74d2d4;
                      }
                    }
                    .coupon-info {
                      float: left;
                      display: inline;
                      width: 180px;
                      margin: 0 2px 0 0;
                      height: auto;
                      line-height: 18px;
                      color: #666;
                      font-family: 'Microsoft Yahei';
                      position: relative;
                    }
                    .coupon-time {
                      clear: both;
                      color: #999;
                      font-family: 'Microsoft Yahei';
                      width: 190px;
                    }
                    .coupon-seal {
                      position: absolute;
                      right: 12px;
                      bottom: 5px;
                      width: 47px;
                      height: 47px;
                      background: url(https://static.360buyimg.com/item/default/1.0.37/components/toolbar/i/coupon-new.png)
                        no-repeat;
                    }
                    .coupon-term {
                      position: absolute;
                      right: 12px;
                      bottom: 5px;
                      z-index: 2;
                      width: 55px;
                      height: 55px;
                      background: url(https://static.360buyimg.com/item/default/1.0.37/components/toolbar/i/coupon-new.png)
                        no-repeat -176px 0;
                    }
                    .sui-btn {
                      display: inline-block;
                      box-sizing: border-box;
                      margin-bottom: 0;
                      text-align: center;
                      vertical-align: middle;
                      cursor: pointer;
                      border-radius: 2px;
                      user-select: none;
                      border: 1px solid #1299ec;
                      color: #fff;
                      background-color: #28a3ef;
                      padding: 2px 14px;
                      line-height: 22px;
                      font-size: 14px;
                    }
                  }
                }
              }
            }
          }
        }
        .toolbar-tab {
          position: relative;
          width: 35px;
          height: 35px;
          margin-bottom: 1px;
          cursor: pointer;
          background-color: #7a6e6e;
          border-radius: 3px 0 0 3px;
          font: 12px/150% Arial, Verdana, '宋体';
          color: #666;
          display: inline-block;
          background-image: url(./images/cartPanelViewIcons.png);
          background-repeat: no-repeat;
          .tab-text {
            width: 62px;
            height: 35px;
            line-height: 35px;
            color: #fff;
            text-align: center;
            font-family: '微软雅黑';
            position: absolute;
            z-index: 1;
            left: 35px;
            top: 0;
            background-color: #7a6e6e;
            border-radius: 3px 0 0 3px;
            transition: left 0.3s ease-in-out 0.1s;
            font-style: normal;
            margin: 0;
            padding: 0;
            cursor: pointer;
          }
          .tab-sub {
            position: absolute;
            z-index: 3;
            right: 2px;
            top: -5px;
            height: 11px;
            padding: 1px 2px;
            border: 1px solid #e1251b;
            overflow: hidden;
            color: #fff;
            font: 11px/11px verdana;
            text-align: center;
            min-width: 11px;
            border-radius: 10px;
            background-color: #e1251b;
            cursor: pointer;
          }
        }
        .tab-ico {
          width: 34px;
          height: 35px;
          margin-left: 1px;
          position: relative;
          z-index: 2;
          background-color: #7a6e6e;
        }
        .toolbar-tabs {
          position: absolute;
          top: 50%;
          left: 0;
          width: 35px;
          margin-top: -61px;
          .tbar-tab-cart {
            background-position: -50px 0;
          }
          .tbar-tab-follow {
            background-position: -50px -50px;
          }
          .tbar-tab-history {
            background-position: -50px -100px;
          }
        }
        .toolbar-footer {
          position: absolute;
          bottom: -1px;
          width: 100%;
          margin: 0;
          padding: 0;
          font: 12px/150% Arial, Verdana, '宋体';
          color: #666;
          .tbar-tab-top {
            background-position: -50px -250px;
          }
          .tbar-tab-feedback {
            background-position: -50px -300px;
          }
          a {
            margin: 0;
            padding: 0;
            font: 12px/150% Arial, Verdana, '宋体';
            color: #666;
            text-decoration: none;
          }
          .footer-tab-text {
            width: 50px;
            height: 35px;
            line-height: 35px;
            color: #fff;
            text-align: center;
            font-family: '微软雅黑';
            position: absolute;
            z-index: 1;
            left: 35px;
            top: 0;
            background-color: #7a6e6e;
            border-radius: 3px 0 0 3px;
            transition: left 0.3s ease-in-out 0.1s;
            font-style: normal;
            margin: 0;
            padding: 0;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
