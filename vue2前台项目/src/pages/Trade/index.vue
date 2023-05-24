<template>
  <div class="trade-container">
   
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">
        收件人信息
        <a href="javascript:;" style="float: right" @click="addAddress">新增收件人地址</a>
      </h5>

      <div class="address clearFix" v-for="(address, index) in userAddressList" :key="address.id">
        <span class="username" :class="{ selected: addressIndex === index }" @click="addressIndex = index">{{ address.consignee }}</span>
        <div>
          <span class="s1">{{ address.userAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-if="address.isDefault === '1'">默认地址</span>
          <div style="float: right">
            <a href="javascript:;" style="margin-right: 10px" @click="updateAddress(address)">修改</a>
            <a href="javascript:;" @click="deleteAddress(address.id)">删除</a>
          </div>
        </div>
      </div>

      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>

      <!--该订单的商品信息数据的展示-->
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="(item, index) in tradeInfo.detailArrayList" :key="item.skuId">
          <!--商品的图片-->
          <li>
            <img :src="item.imgUrl" alt="" style="width: 100px; height: 100px" />
          </li>
          <!--商品的促销活动信息-->
          <li class="activity">
            <div class="goods-suit-tit" v-if="item.activityRule != null">
              <!-- <strong>满100元,减20元</strong>
              <span class="ml20">&nbsp;返现：<em>20元</em></span>
              <strong>满18件打8折</strong>
              <span class="ml20">&nbsp;打折：<em>8折</em></span> -->
              <template v-if="item.activityRule.activityType === 'FULL_REDUCTION'">
                <strong>满{{ item.activityRule.conditionAmount }}元,减{{
                    item.activityRule.benefitAmount
                  }}元</strong>
                <span class="ml20">
                  &nbsp;返现：<em>{{ item.activityRule.benefitAmount }}元</em>
                </span>
              </template>

              <template v-else-if="item.activityRule.activityType === 'FULL_DISCOUNT'">
                <strong>满{{ item.activityRule.conditionNum }}件打{{
                    item.activityRule.benefitDiscount
                  }}折</strong>
                <span class="ml20">
                  &nbsp;打折：<em>{{ item.activityRule.benefitDiscount }}折</em>
                </span>
              </template>
            </div>
            <!--商品的名字-->
            <p>{{ item.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <!--商品的价格-->
          <li>
            <h3>￥{{ item.orderPrice }}</h3>
          </li>
          <!--商品的数量-->
          <li>X{{ item.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <!--订单备注:抓紧时间发货-->
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="orderComment"></textarea>
      </div>
      <div class="line"></div>
      <!-- 发票信息区域 -->
      <div class="linkInfo">
        <div class="step-tit">
          <h5>发票信息</h5>
        </div>
        <div class="step-cont">
          <span>普通发票（电子）</span>
          <span>个人</span>
          <span>明细</span>
        </div>
      </div>
      <!-- 优惠券选择区域 -->
      <div class="cardInfo">
        <div class="step-tit">
          <h5>使用优惠/抵用</h5>
          <div class="coupon-enable">
            <div class="c-detail" :class="couponInfoIndex === index ? 'item-selected' : ''" v-for="(couponInfo, index) in tradeInfo.couponInfoList" :key="couponInfo.id" @click="checkCouponInfo(index, couponInfo.benefitAmount)">
              <div class="c-msg c-dong c-nopointer">
                <div class="c-top-dong"></div>
                <div class="c-price">
                  <em v-if="couponInfo.couponType === 'CASH'">{{ couponInfo.benefitAmount }}元</em>
                  <em v-else-if="couponInfo.couponType === 'FULL_REDUCTION'">{{ couponInfo.benefitAmount }}元</em>
                  <em v-else-if="couponInfo.couponType === 'FULL_DISCOUNT'">{{ couponInfo.benefitDiscount }}折</em>
                  <em v-else-if="couponInfo.couponType === 'DISCOUNT'">{{ couponInfo.benefitDiscount }}折</em>
                </div>
                <div class="c-limit">
                  <span class="ctype" v-if="couponInfo.couponType === 'CASH'">现金券</span>
                  <span class="ctype" v-else-if="couponInfo.couponType === 'FULL_REDUCTION'">满减券</span>
                  <span class="ctype" v-else-if="couponInfo.couponType === 'FULL_DISCOUNT'">满件打折券</span>
                  <span class="ctype" v-else-if="couponInfo.couponType === 'DISCOUNT'">折扣券</span>
                </div>
                <div class="c-time c-time-dong">
                  <span>有效期至{{ couponInfo.expireTime }}</span>
                </div>
              </div>
              <div class="c-type c-type-dong">
                <span class="c-type-l">[东券]</span>
                <span class="c-type-r">[限品类]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单优惠信息区域 -->
    <div class="order-summary">
      <div class="static fr">
        <div class="list">
          <span><i class="number">{{ tradeInfo.totalNum }}</i>件商品，总商品金额</span>
          <em class="allprice">¥{{ tradeInfo.originalTotalAmount }}元</em>
        </div>
        <div class="list">
          <span>运费：</span>
          <em class="transport">¥0元</em>
        </div>
        <div class="list">
          <span>返现：</span>
          <em class="money">¥0元</em>
        </div>
        <div class="list">
          <span>优惠券：</span>
          <em class="transport">¥{{ couponAmount }}元</em>
        </div>
      </div>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ tradeInfo.totalAmount - couponAmount }}元</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ selectedAddress.fullAddress }}</span>
        收货人：<span>{{ selectedAddress.consignee }}</span>
        <span>{{ selectedAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a href="javascript:;" class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Trade',
  data() {
    return {
      addressIndex: null, // 用来存储选中的用户名字的索引
      couponInfoIndex: null, // 用来存储选中的优惠券的索引
      couponAmount: 0, // 当前优惠券的价格
      orderComment: '老板好帅哦,抓紧时间发货哦,亲~' // 订单的备注信息
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      // 用户地址信息数据
      userAddressList: (state) => state.user.userAddressList,
      tradeInfo: (state) => state.order.tradeInfo
    }),
    // 选中的地址信息的索引变化了,选中的地址信息对象就要跟着变化
    selectedAddress() {
      return this.userAddressList[this.addressIndex] || {}
    }
  },
  // 页面渲染完毕的生命周期回调
  mounted() {
    // 获取用户的地址信息数据
    this.getUserAddressList()
    // 获取订单页的信息数据
    this.getTradeInfo()
  },
  methods: {
    // 获取用户的地址信息数据
    async getUserAddressList() {
      await this.$store.dispatch('getUserAddressList')
      // 计算默认选中的地址信息的索引值
      this.addressIndex = this.userAddressList.findIndex(
        (address) => address.isDefault === '1'
      )
    },
    // 获取订单页的信息数据
    getTradeInfo() {
      this.$store.dispatch('getTradeInfo')
    },
    // 新增收件人的地址
    addAddress() {
      // 新增地址的组件显示出来
      this.address = this.$address()
      // 取消按钮
      this.address.cancel = () => {
        // 卸载该组件
        this.address.unmount()
      }
      // 确定按钮
      this.address.confirm = (formData) => {
        // 调用接口发送请求,实现添加新的地址
        this.$API
          .reqAddAddress(formData)
          .then(() => {
            // 成功了
            this.$message.success('添加地址成功了')
            // 重新获取地址信息
            this.getUserAddressList()
          })
          .catch((error) => {
            this.$message.error(error.message || '添加地址失败了')
          })
        // 卸载该组件
        this.address.unmount()
      }
    },
    // 修改收件人的地址
    updateAddress(address) {
      // 方法调用后,得到的是地址组件的实例对象
      this.address = this.$address()
      // 取消按钮
      this.address.cancel = () => {
        // 坑====
        this.address.clear()
        // 卸载组件
        this.address.unmount()
      }
      // 确定按钮
      this.address.confirm = async (formData) => {
        // 调用接口
        const result = await this.$API.reqUpdateAddress(formData)
        if (result.code === 200) {
          this.$message.success('修改地址成功了')

          this.address.clear()
          this.getUserAddressList()
          // 重新地址的信息数据
          this.address.unmount()
        } else {
          this.$message.error(result.message || '修改地址失败了')
        }
      }
      // 向修改组件的窗口传入当前的地址对象信息
      this.address.formData = address
    },
    // 删除收件人的地址
    async deleteAddress(addressId) {
      const result = await this.$API.reqDeleteAddress(addressId)
      if (result.code === 200) {
        this.$message.success('删除成功')
        // 重新获取地址的信息数据
        this.getUserAddressList()
      } else {
        this.$message.error('删除失败了')
      }
    },
    // 点击选中的优惠券操作(要改变选中的券及当前这个优惠券的优惠价格)
    checkCouponInfo(index, couponAmount) {
      // 判断,当前选中的券的索引和传入进来的索引是否一致
      if (this.couponInfoIndex === index) {
        // 清空选中的券的索引
        this.couponInfoIndex = null

        // 此时的这个券的价格应该清空
        this.couponAmount = 0
        // 需要把当前选中的这个券的isChecked=0
        this.tradeInfo.couponInfoList[index].isChecked = 0
      } else {
        // 存储当前的索引
        this.couponInfoIndex = index
        // 此时应该存储这个券的价格
        this.couponAmount = couponAmount
        // 需要把当前选中的这个券的isChecked=1
        this.tradeInfo.couponInfoList[index].isChecked = 1
      }
    },
    // 提交订单操作
    async submitOrder() {
      // 准备参数
      let {
        selectedAddress: { consignee, fullAddress, phoneNum, provinceId },
        tradeInfo: { detailArrayList, couponInfoList, tradeNo },
        orderComment,
        couponInfoIndex
      } = this
      // traderNo: '', // 当前的订单页信息对象中的订单编号

      // 从优惠券列表中取出当前选中的优惠券对象信息数据
      let selectedCouponInfo = couponInfoList[couponInfoIndex]
      // 判断是否存在选中的优惠券
      if (selectedCouponInfo) {
        // 把选中的优惠券对象重新的存储到优惠券列表数组中
        // bug  couponInfoList = [selectedCouponInfo]
        // couponInfoList = couponInfoList[selectedCouponInfo]
        couponInfoList = [selectedCouponInfo]
      } else {
        couponInfoList = []
      }

      const orderInfo = {
        // 订单的编号
        consignee, // 收件人名字
        consigneeTel: phoneNum, // 收件人的电话
        deliveryAddress: fullAddress, // 收件人的地址(选中后的)

        paymentWay: 'ONLINE', // 支付的方式
        orderComment, // 订单的备注

        orderDetailList: detailArrayList, // 订单中的商品列表数据
        couponInfoList, // 优惠券的列表信息数据(选中的那个,如果没有则是个空数组)
        // 收件人地址的大区的id
        provinceId
      }
      // 调用接口
      const result = await this.$API.reqSubmitOrderInfo(tradeNo, orderInfo)
      if (result.code === 200) {
        this.$message.success('订单提交成功')
        // 存储当前的订单的id
        const orderId = result.data
        // 路由跳转并传递参数(query)
        this.$router.push({ path: '/pay', query: { orderId } })
      } else {
        // this.$message.error(result.message)
        alert(result.message)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .receive {
      a {
        font-size: 12px;
        float: right;
        &:hover {
          color: #4cb9fc;
          text-decoration: underline;
        }
      }
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: '';
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      padding: 15px;
      background: #f4f4f4;
      margin: 5px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;
        background: #feedef;
        margin-bottom: 5px;
        .activity {
          width: 500px;
          strong {
            font-weight: bold;
          }
          .ml20 {
            margin-left: 20px;
            font-weight: 700;
            display: inline-block;
            border: 1px solid rgb(122, 189, 84);
            color: rgb(122, 189, 84);
            padding: 2px 5px;
          }
        }
        li {
          line-height: 30px;

          // p {
          //   margin-bottom: 20px;
          // }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .cardInfo {
      margin-bottom: 25px;
      .step-tit {
        line-height: 36px;
        margin: 15px 0;
        .coupon-enable {
          display: block;
          width: 920px;
          clear: both;
          margin-top: 10px;
          .c-detail {
            width: 200px;
            height: 120px;
            margin-left: 20px;
            display: inline-block;
            &.item-selected {
              border: 2px solid #e43a3d;
              background-image: url(//misc.360buyimg.com/user/purchase/2.0.0/css/i/coupon-selected.png);
              background-repeat: no-repeat;
              background-position: bottom right;
            }
            .c-nopointer {
              cursor: default !important;
              background-color: rgb(116, 210, 212);
              height: 85px;
              width: 100%;
              position: relative;
              border-left: 0;
              border-right: 0;
              .c-top-dong {
                height: 3px;
                width: 100%;
                background: #fff
                  url(https://misc.360buyimg.com/user/purchase/2.0.0/css/i/virtual-spite.png) -36px -6px
                  no-repeat;
              }
              .c-price {
                color: #fff;
                font: 24px Arial, Verdana, 'Microsoft YaHei', SimSun;
                display: inline;
                position: relative;
                top: 8px;
                margin-left: 12px;
                vertical-align: bottom;
                cursor: default !important;
              }
              .c-limit {
                color: #f5f5f5;
                font-size: 12px;
                display: inline;
                position: relative;
                top: 7px;
              }
              .c-time {
                padding-left: 12px;
                margin-top: 10px;
              }
            }
            .c-type {
              color: #74d2d4;
              border: 1px solid #cef0f1;
              width: 100%;
              box-sizing: border-box;
              .c-type-l {
                margin: 0 5px 0 12px;
              }
              .c-type-r {
                margin: 0;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  .order-summary {
    width: 1200px;
    overflow: hidden;
    padding-right: 20px;
    margin: 20px auto 0;
    .static {
      float: right;
      .list {
        line-height: 26px;
        span {
          float: left;
          width: 160px;
          .number {
            color: red;
          }
        }
        em {
          font-family: '微软雅黑';
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px '微软雅黑';
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>