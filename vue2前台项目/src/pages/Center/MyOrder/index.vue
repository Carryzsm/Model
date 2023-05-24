<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table
        class="order-item"
        v-for="(order, index) in orderList"
        :key="order.id"
      >
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >{{ order.createTime }}　订单编号：{{ order.outTradeNo }}
                <span class="pull-right delete"
                  ><img src="./images/delete.png" /> </span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.orderDetailList" :key="item.id">
            <td width="60%">
              <div class="typographic">
                <img :src="item.imgUrl" style="width: 100px; height: 100px" />
                <a
                  href="javascript:;"
                  class="block-text"
                  @click="$router.replace(`/detail/${item.skuId}`)"
                  >{{ item.skuName }}</a
                >
                <span>x{{ item.skuNum }}</span>
                <ul class="unstyled list-inline">
                  <li
                    v-if="
                      order.orderStatus === 'PAID' ||
                      order.orderStatus === 'WAITING_DELEVER'
                    "
                  >
                    <router-link
                      v-if="
                        item.refundStatus === '' ||
                        item.refundStatus === 'NOT_APPROVED'
                      "
                      :to="`/center/refund?orderId=${order.id}&refundType=1&orderDetailId=${item.id}`"
                      >退款</router-link
                    >
                    <!--是审核中啊还是退款结束了呢!-->
                    <span v-else>{{ item.refundStatusString }}</span>
                  </li>
                  <li
                    v-if="
                      order.orderStatus === 'DELEVERED' ||
                      order.orderStatus === 'FINISHED'
                    "
                  >
                    <router-link
                      v-if="
                        item.refundStatus === '' ||
                        item.refundStatus === 'NOT_APPROVED'
                      "
                      :to="`/center/refund?orderId=${order.id}&refundType=2&orderDetailId=${item.id}`"
                      >退货</router-link
                    >
                    <!--是审核中啊还是退货结束了呢!-->
                    <span v-else>{{ item.refundStatusString }}</span>
                  </li>
                </ul>
              </div>
            </td>
            <template v-if="index === 0">
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
              >
                {{ order.consignee }}
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount }}</li>
                  <li>
                    {{
                      order.paymentWay === 'ONLINE' ? '在线支付' : '货到付款'
                    }}
                  </li>
                </ul>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
              >
                <span>{{ order.orderStatusName }}</span>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li v-if="order.orderStatus === 'UNPAID'">
                    <!-- <a href="mycomment.html" target="_blank">去支付</a> -->
                    <router-link
                      :to="{ path: '/pay', query: { orderId: order.id } }"
                      >去支付</router-link
                    >
                  </li>
                  <li>
                    <a href="javascript:;"></a>
                    <router-link :to="`/center/orderdetail/${order.id}`"
                      >订单详情</router-link
                    >
                  </li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="choose-order">
      <!--分页-->
      <Pagination
        :pageConfig="{
          total: total,
          showPageNo: 5,
          pageNo: page,
          pageSize: limit,
        }"
        @changeCurrentPage="getMyOrderList"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyOrder',
  data() {
    return {
      page: 1, // 页面
      limit: 5, // 每页的条数
      orderList: [], // 订单列表数据
      total: 0, // 总条数
    }
  },
  mounted() {
    // 调用获取订单列表的接口
    this.getMyOrderList()
  },
  methods: {
    async getMyOrderList(page = 1) {
      this.page = page
      // 调用接口
      const result = await this.$API.reqOrderList(this.page, this.limit)
      console.log(result)
      if (result.code === 200) {
        // 订单列表数据及总条数数据
        const { records, total } = result.data
        // 保存订单列表数据和总条数
        this.orderList = records
        this.total = total
      } else {
        this.$message.error('获取订单列表失败了')
      }
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
//订单部分
.order-content {
  margin: 0 20px;
  color: #666;

  //标题
  .title {
    margin-bottom: 22px;
    border: 1px solid #ddd;

    h3 {
      padding: 12px 10px;
      font-size: 15px;
      background-color: #f1f1f1;
    }
  }

  //表头
  .chosetype {
    margin-bottom: 15px;
    color: #666;

    table {
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-radius: 2px;
      width: 100%;
      max-width: 100%;
      border-spacing: 0;

      th {
        padding: 6px 8px;
        color: #666;
        font-weight: 700;
        vertical-align: bottom;
        background-color: #f4f4f4;
        line-height: 18px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-align: left;
      }
    }
  }

  // 表单内容
  .orders {
    font-size: 12px;

    a {
      &:hover {
        color: #4cb9fc;
      }
    }

    table {
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
      border-radius: 2px;
      width: 100%;
      margin-bottom: 18px;
      max-width: 100%;

      th {
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: bottom;
        background-color: #f4f4f4;
        font-size: 12px;
        color: #666;

        .pull-right {
          float: right;
          cursor: pointer;

          img {
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }

      td {
        font-size: 12px;
        color: #666;
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: middle;
        border: 1px solid #e6e6e6;

        &.center {
          text-align: center;
        }

        .typographic {
          img {
            float: left;
            margin-right: 10px;
          }

          a {
            float: left;
            min-width: 80px;
            max-width: 250px;
            color: #e1251b;

            &.service {
              color: #666;
            }
          }

          span {
            float: left;
            min-width: 80px;
            max-width: 250px;
            text-align: center;
          }
        }
      }
    }
  }

  // 分页
  .choose-order {
    .pagination {
      margin: 38px 0;

      ul {
        font-size: 0;
        display: inline-block;

        li {
          display: inline-block;
          padding: 4px 9px;
          font-size: 14px;
          border: 1px solid #e0e9ee;

          &.prev,
          &.next {
            background-color: #fafafa;
          }

          &.prev {
            border-right-color: #28a3ef;
          }

          &.page {
            border-color: #28a3ef;
            border-left: 0;

            &.actived {
              background-color: #28a3ef;

              a {
                color: #fff;
              }
            }
          }
        }
      }

      div {
        display: inline-block;
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>