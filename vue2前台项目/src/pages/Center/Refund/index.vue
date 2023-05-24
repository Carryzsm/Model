<template>
  <div>
    <div class="yui3-u-5-6">
      <div class="body userAddress">
        <div class="address-title">
          <span class="title">申请售后</span>
          <span class="clearfix"></span>
        </div>

        <div class="address-detail">
          <table class="sui-table table-bordered">
            <thead>
              <tr>
                <th>商品</th>
                <th>商品名称</th>
                <th>购买数量</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img :src="detailInfo.imgUrl" style="width: 80px" />
                </td>
                <td>{{detailInfo.skuName}}</td>
                <td>{{detailInfo.skuNum}}个</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="modal-dialog"
          style="border: 1px #ededed solid; padding: 10px 10px"
        >
          <div class="modal-content">
            <div class="modal-body">
              <form action="" class="sui-form form-horizontal">
                <div class="control-group">
                  <label class="control-label">服务类型：</label>
                  <div class="controls" style="line-height: 28px">{{refundType==='REFUND'?'退款':'退货'}}</div>
                </div>
                <div class="control-group">
                  <label class="control-label">退款方式：</label>
                  <div class="controls" style="line-height: 28px">
                    原支付方式返回
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label">退款金额：</label>
                  <div class="controls" style="line-height: 28px">
                    <!--退款的金额直接存储到orderRefundInfo.refundAmount-->
                    <!-- <input type="text" class="input-medium" v-model="orderRefundInfo.refundAmount" /> -->
                    <!--退款的金额就是之前订单详情中的商品的金额(付款的金额还是商品的总价金额,需要考虑有没有优惠券,促销信息的打折等等等....)-->
                    <input type="text" class="input-medium" v-model="detailInfo.orderPrice" />
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label">提交数量：</label>
                  <div class="controls" style="line-height: 28px">{{detailInfo.skuNum}}</div>
                </div>
                <div class="control-group">
                  <label class="control-label">提交原因：</label>
                  <div class="controls">
                    <select style="padding-right: 0px; max-width: 450px" v-model="orderRefundInfo.refundReasonType">
                      <option value="R_1301">商品损坏</option>
                      <option value="R_1302">商品描述与实际描述不一致</option>
                      <option value="R_1303">缺货</option>
                      <option value="R_1304">号码不合适</option>
                      <option value="R_1305">拍错</option>
                      <option value="R_1306">不想买了</option>
                      <option value="R_1307">其他</option>
                    </select>
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label">问题描述：</label>
                  <div class="controls">
                    <textarea
                      id="inputComment"
                      placeholder="商品是否给力？快分享你的购物心得吧~"
                      maxlength="500"
                      style="width: 500px; height: 80px"
                      v-model="orderRefundInfo.refundReasonTxt"
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div class="submit">
              <button class="sui-btn btn-danger btn-submit" @click="save">提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Refund',
  data() {
    return {
      refundType:'', // 退款/退货的标识
      orderDetailId:0, // 订单详情页的id信息
      // 退款/退货的时候需要调用的接口中所需要的对象参数
      detailInfo:{}, // 当前的订单中的商品的详情的信息数据
      orderRefundInfo: {
        orderId: 0, // 订单的id
        skuId: 1, // skuId
        refundType: '', // 类型
        refundAmount: 0, // 金额
        refundNum: 1, // 数量
        refundReasonType: '', // 退款的原因
        refundReasonTxt: '', // 退款的理由
      },
    }
  },
  // 页面渲染之前
  beforeMount() {
    // 从query中解构出所需的参数数据, orderDetailId--->翻译:订单详情的id,实际上存储的是商品的id
    const { orderId, refundType, orderDetailId } = this.$route.query
    // refundType---->1----->退款,2----->退货
    this.refundType = refundType === '1' ? 'REFUND' : 'RETURN_GOODS'
    // 把退货/退款的标识结果存储到退货的对象中
    this.orderRefundInfo.refundType=this.refundType
    // 保存订单的id
    this.orderRefundInfo.orderId = orderId
    // 保存订单详情页的id的数据
    this.orderDetailId = orderDetailId
  },
  // 页面渲染之后
  mounted () {
    // 获取订单详情的信息
    this.getOrderDetail()
  },
  methods: {
    // 页面渲染完毕后,获取订单中的商品的详情信息
    async getOrderDetail(){
      const result =await this.$API.reqOrderDetail(this.orderDetailId)
     if(result.code===200){
       // 保存当前的订单的详情的信息
       this.detailInfo = result.data
       // 保存skuId
       this.orderRefundInfo.skuId = this.detailInfo.skuId
       // 退款的金额需要保存
       this.orderRefundInfo.refundAmount = this.detailInfo.orderPrice
       // 保存退货的商品的数量
       this.orderRefundInfo.refundNum = this.detailInfo.skuNum

     }else{
       this.$message.error(result.message||'获取订单的详情的信息失败了')
     }
    },
    // 提交
    async save(){
      // 判断,退款的金额是不能大于商品的金额的
      if(this.detailInfo.orderPrice<this.orderRefundInfo.refundAmount){
        this.$message.warning('退款金额不能大于商品的金额')
        return
      }

      // 判断理由
      if(this.orderRefundInfo.refundReasonTxt===''){
        this.$message.warning('问题描述必须要填写')
        return 
      }
      // 原因不能为空
      if(this.orderRefundInfo.refundReasonType===''){
           this.$message.warning('原因是必须的要添加的')
        return 
      }
      // 调用接口
      const result =await this.$API.reqRefundInfo(this.orderRefundInfo)
      if(result.code===200){
        this.$message.success('提交成功')
        // 跳转
        this.$router.replace(`/center/refundlist`)
      }else{
        this.$message.error('失败了')
      }


    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.userAddress {
  padding: 0 25px;
  color: #555;
  .address-title {
    padding: 5px 10px;
    margin-bottom: 15px;
    line-height: 32px;
    background-color: #f1f1f1;
    .title {
      line-height: 40px;
      font-size: 15px;
      font-weight: 700;
    }
    .add-new {
      float: right;
      line-height: 24px;
      margin: 5px 0;
    }
  }
  .address-detail {
    width: 100%;
    .sui-table.table-bordered {
      width: 100%;
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-left: 0;
      border-radius: 2px;
      th {
        background-color: #f4f4f4;
        border-left: 1px solid #e6e6e6;
      }
      td {
        border-left: 1px solid #e6e6e6;
      }
      thead th {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .modal-content {
    .modal-body {
      .control-group {
        margin-bottom: 18px;
        display: flex;
        /*height: 28px;*/
        line-height: 28px;
      }
    }
    .submit {
      text-align: center;
      .btn-submit {
        width: 220px;
        height: 48px;
        line-height: 48px;
        margin-right: 10px;
        padding: 0;
        font-family: 'Microsoft YaHei';
        font-size: 18px;
        color: #fff;
        background-color: #ea4a36;
        border: 1px solid #e8351f;
      }
    }
  }
}
</style>
