<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!--遍历购物车中的购物项-->
        <ul class="cart-list" v-for="(cartItem, index) in shopCartList" :key="cartItem.createTime">
          <li v-for="(item, index) in cartItem.cartInfoList" :key="item.id">
            <ul class="shopInfo">
              <!--购物项的商品的选中操作-->
              <li class="cart-list-con1">
                <input type="checkbox" name="chk_list" :checked="item.isChecked === 1" @click="changeCheckItem(item)" />
              </li>
              <!--商品的默认图片和描述信息-->
              <li class="cart-list-con2">
                <img :src="item.imgUrl" />
                <a href="javascript:" class="item-msg" @click="$router.replace(`/detail/${item.skuId}`)">{{ item.skuName }}</a>
              </li>
              <!--单价和优惠券及促销信息-->
              <li class="cart-list-con4">
                <!--单价-->
                <span class="price">{{ item.skuPrice }}</span>
                <!--优惠券-->
                <div v-if="
                    item.couponInfoList !== null &&
                    item.couponInfoList.length > 0
                  ">
                  <a href="javascript:;" class="sales-promotion" @click="couponInfoIndex = item.id">优惠券<b></b></a>
                  <div class="promotion-tips" style="width: 315px" v-if="couponInfoIndex === item.id">
                    <div class="promotion-tit">优惠券<b></b></div>
                    <div class="promotion-cont" style="width: auto">
                      <div class="p-coupon-item p-coupon-item-gray" v-for="(couponInfo, index) in item.couponInfoList" :key="couponInfo.id">
                        <div class="coupon-price" style="border-color: rgb(231, 70, 73)">
                          <!-- <span class="txt" style="color: rgb(231, 70, 73)">200元</span> -->
                          <span class="txt" v-if="couponInfo.couponType === 'CASH'" style="color: rgb(231, 70, 73)">{{ couponInfo.benefitAmount }}元</span>
                          <span class="txt" v-else-if="
                              couponInfo.couponType === 'FULL_REDUCTION'
                            " style="color: rgb(231, 70, 73)">{{ couponInfo.benefitAmount }}元</span>
                          <span class="txt" v-else-if="
                              couponInfo.couponType === 'FULL_DISCOUNT'
                            " style="color: rgb(231, 70, 73)">{{ couponInfo.benefitDiscount }}折</span>
                          <span class="txt" v-else-if="couponInfo.couponType === 'DISCOUNT'" style="color: rgb(231, 70, 73)">{{ couponInfo.benefitDiscount }}折</span>
                        </div>
                        <div class="coupon-msg">
                          <div>
                            <!-- <span class="ctype">满减卷</span> -->
                            <span class="ctype" v-if="couponInfo.couponType === 'CASH'">现金券</span>
                            <span class="ctype" v-else-if="
                                couponInfo.couponType === 'FULL_REDUCTION'
                              ">满减券</span>
                            <span class="ctype" v-else-if="
                                couponInfo.couponType === 'FULL_DISCOUNT'
                              ">满件打折券</span>
                            <span class="ctype" v-else-if="couponInfo.couponType === 'DISCOUNT'">折扣券</span>

                            <span class="cinfo" v-if="couponInfo.couponType === 'CASH'">现金券{{ couponInfo.benefitAmount }}元</span>
                            <span class="cinfo" v-else-if="
                                couponInfo.couponType === 'FULL_REDUCTION'
                              ">满{{ couponInfo.conditionAmount }}减{{
                                couponInfo.benefitAmount
                              }}元</span>
                            <span class="cinfo" v-else-if="
                                couponInfo.couponType === 'FULL_DISCOUNT'
                              ">满{{ couponInfo.conditionNum }}件打{{
                                couponInfo.benefitDiscount
                              }}折</span>
                            <span class="cinfo" v-else-if="couponInfo.couponType === 'DISCOUNT'">折扣券{{ couponInfo.benefitDiscount }}折</span>

                            <!-- <span class="cinfo">满20000减200元</span> -->
                          </div>
                          <div class="clearfix">
                            <div class="ftx-03 J_cpitems">
                              {{ couponInfo.rangeDesc }}
                            </div>
                            <i class="zyc-ico"></i>
                          </div>
                        </div>
                        <div class="coupon-opbtns">
                          <span class="ftx-03" v-if="
                              couponInfo.isGet > 0 &&
                              couponInfo.couponStatus === 'NOT_USED'
                            ">已领取</span>
                          <!-- <span class="ftx-03" v-if="couponInfo.isGet ===0">领取</span> -->
                          <button @click="receiveCouponInfo(couponInfo.id)" class="ftx-03" v-if="couponInfo.isGet === 0">
                            领取
                          </button>
                        </div>
                      </div>
                      <div class="op-btns ac mt20">
                        <a href="javascript:" class="btn-9 ml10 del cancel-promotion" @click="closeCouponInfoAndActivity">取消</a>
                      </div>
                    </div>
                    <div class="clr"></div>
                  </div>
                </div>
                <!-- 促销区域 -->
                <div v-if="
                    cartItem.activityRuleList !== null &&
                    cartItem.activityRuleList.length > 0
                  ">
                  <a href="javascript:;" class="sales-promotion" @click="activityIndex = item.id">促销<b></b></a>
                  <div class="promotion-tips" v-if="activityIndex === item.id">
                    <div class="promotion-tit" style="width: 43px">
                      促销<b></b>
                    </div>
                    <div class="promotion-cont">
                      <ul>
                        <template v-for="(activity, index) in cartItem.activityRuleList">
                          <li :key="activity.id" v-if="activity.activityType === 'FULL_REDUCTION'">
                            <input type="radio" :name="activity.skuId" :value="index" :checked="item.isChecked" />
                            满{{ activity.conditionAmount }}减{{
                              activity.benefitAmount
                            }}元
                          </li>
                          <li :key="activity.id" v-else-if="
                              activity.activityType === 'FULL_DISCOUNT'
                            ">
                            <input type="radio" :name="activity.skuId" :value="index" :checked="item.isChecked" />
                            满{{ activity.conditionNum }}件打{{
                              activity.benefitDiscount
                            }}折
                          </li>
                        </template>
                      </ul>
                      <div class="op-btns ac mt20">
                        <a href="javascript:;" class="btn-1 select-promotion">确定</a><a href="javascript:;" class="btn-9 ml10 del cancel-promotion" @click="closeCouponInfoAndActivity">取消</a>
                      </div>
                      <div class="clr"></div>
                    </div>
                  </div>
                </div>
              </li>
              <!--数量的操作-->
              <li class="cart-list-con5">
                <a href="javascript:void(0)" class="mins" @click="updateSkuNum(item, -1)">-</a>
                <input autocomplete="off" type="text" class="itxt" :value="item.skuNum" @change="
                    updateSkuNum(
                      item,
                      $event.target.value - item.skuNum,
                      $event
                    )
                  " @input="validInput" />
                <a href="javascript:void(0)" class="plus" @click="updateSkuNum(item, 1)">+</a>
              </li>
              <!--总价格-->
              <li class="cart-list-con6">
                <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
              </li>
              <!--删除单个购物项-->
              <li class="cart-list-con7">
                <a href="javascript:;" class="sindelet" @click="deleteItem(item.skuId)">删除</a>
                <br />
                <a href="javascript:;">移到收藏</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--全选/删除所有购物项/总价格/总数量-->
    <div class="cart-tool">
      <div class="select-all">
        <input type="checkbox" class="chooseAll" v-model="allChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:" @click="deleteCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ totalCount }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a href="/trade" class="sum-btn">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  name: 'ShopCart',
  data() {
    return {
      couponInfoIndex: null, // 用来显示/隐藏优惠券列表的标识(购物项的id)
      activityIndex: null // 用来显示/隐藏促销活动列表的标识(购物项的id)
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      // 购物车中的购物项信息数据数组
      shopCartList: (state) => state.shopcart.shopCartList
    }),
    // 选中的商品的总数量/选中商品的总价格/是否全选
    ...mapGetters(['totalCount', 'totalPrice', 'isAllChecked']),
    // 全选/全不选
    allChecked: {
      get() {
        return this.isAllChecked
      },
      set(value) {
        this.$store.dispatch('changeCheckCartItems', value)
      }
    }
  },
  mounted() {
    this.$store.dispatch('getShopCartList')
  },
  methods: {
    // 修改当前商品的选中状态
    changeCheckItem: debounce(async function (item) {
      const skuId = item.skuId
      const isChecked = item.isChecked === 1 ? 0 : 1
      // 分发action
      try {
        await this.$store.dispatch('changeCheckCartItem', { skuId, isChecked })
      } catch (error) {
        this.$message.error(error.message)
      }
    }, 200),

    // 领取优惠券操作
    async receiveCouponInfo(couponInfoId) {
      const result = await this.$API.reqGetCouponInfo(couponInfoId)
      if (result.code === 200) {
        // 重新获取购物车的数据---刷新
        this.$store.dispatch('getShopCartList')
      }
    },

    // 修改当前商品的数量操作---对应着 减的按钮/加的按钮/文本框的change事件的回调
    updateSkuNum: debounce(async function (item, changeNum, event) {
      const { skuId, skuNum } = item
      // 判断当前修改的数据和原有的数据相加后的结果是否有意义
      // skuNum--->1   changeNum----   -1
      const targetNum = skuNum + changeNum
      if (targetNum > 0) {
        // 分发action
        try {
          // 修改购物项的数量
          await this.$store.dispatch('addToCart', {
            skuId,
            skuNum: changeNum,
            isGet: true
          })
          // 修改成功了,刷新页面
          // this.$store.dispatch('getShopCartList')
        } catch (error) {
          this.$message.error(error.message || '修改数量失败了')
        }
      } else {
        if (event) {
          // 文本框输入的数据是无效数据,那么失去焦点后,数据恢复到之前的样子
          event.target.value = item.skuNum
        }
      }
    }, 200),
    // 修改当前商品的数量操作----对应着的文本框的input事件的回调
    validInput(event) {
      // 获取文本框的数据
      const value = event.target.value
      // 通过正则的方式校验错误的数据后,进行替换成正确的数据,再次赋值给文本框
      event.target.value = value.replace(/^0+|\D+0*/, '')
    },
    // 删除某个选中的商品的回调
    deleteItem(skuId) {
      this.$confirm('您确定要删除当前的商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store
            .dispatch('deleteCartItem', skuId)
            .then(() => {
              this.$message.success('删除成功')
              // 重新获取购物车列表信息的数据---方法
              // this.$store.dispatch('getShopList')
            })
            .catch((error) => {
              this.$message.error(error.message)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭优惠券窗口/关闭促销活动列表窗口
    closeCouponInfoAndActivity() {
      this.couponInfoIndex = null
      this.activityIndex = null
    },
    // 删除所有选中的购物项
    deleteCartItems() {
      this.$confirm('您确定要删除所有选中的购物项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store
            .dispatch('deleteCartItems')
            .then(() => {
              this.$message.success('删除成功')
            })
            .catch((error) => {
              this.$message.error('删除失败')
            })
        })
        .catch(() => {
          this.$message.error('取消删除')
        })
    }
    // 关闭促销活动列表窗口
    // closeActivity() {
    //   this.couponInfoIndex = null
    //   this.activityIndex = null
    // },
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 15%;
      }
    }

    .cart-body {
      margin: 15px 0;

      .cart-list {
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        width: 1198px;
        margin-bottom: 30px;
        /*height:82px;*/ /*不能设置高度，如果描述内容过多会溢出，应该由内容撑开*/
        /*overflow: hidden;*/
        &:after {
          content: '';
          display: block;
          clear: both;
        }
        & > li {
          float: left;
          width: 100%;
          border-top: 1px solid #ddd;
          padding: 20px;
          box-sizing: border-box;

          .shopInfo {
            width: 100%;
            /*overflow: hidden;*/
            & > li {
              float: left;
            }
            .cart-list-con1 {
              width: 5%;
            }

            .cart-list-con2 {
              width: 35%;

              img {
                width: 82px;
                height: 82px;
                float: left;
              }

              .item-msg {
                float: left;
                width: 150px;
                margin: 0 10px;
                line-height: 18px;
              }
            }

            .cart-list-con4 {
              width: 15%;
              div {
                position: relative;
                .sales-promotion {
                  color: #e2231a;
                  display: inline-block;
                  width: 56px;
                  border: 1px solid #f9d2d3;
                  text-align: left;
                  line-height: 20px;
                  padding: 0 5px 0 5px;
                  cursor: pointer;
                  background: #fff;
                  text-decoration: none;
                  overflow: hidden;
                  position: relative;
                  b {
                    position: absolute;
                    right: 8px;
                    top: 8px;
                    width: 7px;
                    height: 4px;
                    overflow: hidden;
                    font-weight: bolder;
                    background: url(https://misc.360buyimg.com/user/cart/css/i/cart-icons-202004.png) -82px -3px;
                  }
                  &:hover {
                    color: #e2231a !important;
                  }
                }
                .promotion-tips {
                  position: absolute;
                  padding: 10px 14px 10px 10px;
                  width: 276px;
                  top: 19px;
                  box-shadow: 0 0 2px 2px #eee;
                  border: 1px solid #e4393c;
                  background: none repeat scroll 0 0 #fff;
                  text-align: left;
                  z-index: 99;
                  .promotion-tit {
                    position: absolute;
                    height: 19px;
                    line-height: 17px;
                    border: 1px solid #e4393c;
                    border-bottom: 0;
                    top: -20px;
                    left: -1px;
                    background: #fff;
                    color: #e2231a;
                    padding: 0 15px 0 8px;
                    cursor: pointer;
                    width: 43px;
                  }
                  .promotion-cont {
                    position: relative;
                    z-index: 99;
                    line-height: 23px;
                    width: 280px;
                    ul {
                      display: block;
                      li {
                        display: block !important;
                        padding: 2px 5px;
                        .input {
                          border: 1px solid #ddd;
                          cursor: pointer;
                          box-sizing: border-box;
                          padding: 0;
                        }
                      }
                    }
                    .op-btns {
                      margin-top: 20px;
                      text-align: center;
                      .select-promotion {
                        font-family: arial, Microsoft YaHei;
                        display: inline-block;
                        height: 25px;
                        line-height: 25px;
                        background-color: #e74649;
                        background-image: linear-gradient(
                          0deg,
                          #e74649 0,
                          #df3134
                        );
                        border-radius: 3px;
                        color: #fff;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 0 10px;
                        vertical-align: middle;
                        cursor: pointer;
                        border: 0;
                        float: none;
                        transition: all 0.2s ease-out;
                      }
                      .cancel-promotion {
                        margin-left: 10px;
                        transition: all 0.2s ease-out;
                        display: inline-block;
                        height: 23px;
                        line-height: 23px;
                        background-color: #f2f2f2;
                        background-image: linear-gradient(
                          0deg,
                          #f2f2f2 0,
                          #f7f7f7
                        );
                        border-radius: 3px;
                        color: #323333;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 0 9px;
                        vertical-align: middle;
                        cursor: pointer;
                        float: none;
                        border: 1px solid #e1e1e1;
                      }
                    }
                    .p-coupon-item {
                      display: block;
                      margin: 10px 0;
                      overflow: hidden;
                      .coupon-price {
                        border-color: rgb(231, 70, 73);
                        position: relative;
                        height: 29px;
                        line-height: 29px;
                        width: 54px;
                        float: left;
                        font-size: 0;
                        margin: 2px 10px 0 0;
                        border: 1px solid #f9d2d3;
                        text-align: center;
                        padding: 0 2px;
                        .txt {
                          font-size: 12px;
                          color: rgb(231, 70, 73);
                          font-weight: 700;
                        }
                      }
                      .coupon-msg {
                        float: left;
                        width: 200px;
                        line-height: 18px;
                        font-weight: 400;
                      }
                      .coupon-opbtns {
                        float: left;
                        .coupon-btn {
                          display: inline-block;
                          height: 25px;
                          line-height: 25px;
                          background-color: #e74649;
                          border-radius: 3px;
                          color: #fff;
                          font-size: 12px;
                          font-weight: 400;
                          padding: 0 10px;
                          vertical-align: middle;
                          cursor: pointer;
                          border: 0;
                          float: none;
                        }
                      }
                    }
                  }
                }
              }
            }

            .cart-list-con5 {
              width: 15%;

              .mins {
                border: 1px solid #ddd;
                border-right: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }

              input {
                border: 1px solid #ddd;
                width: 40px;
                height: 33px;
                float: left;
                text-align: center;
                font-size: 14px;
              }

              .plus {
                border: 1px solid #ddd;
                border-left: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }
            }

            .cart-list-con6 {
              width: 15%;

              .sum {
                font-size: 16px;
              }
            }

            .cart-list-con7 {
              width: 15%;

              a {
                color: #666;
              }
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
