<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              $route.query.orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ codeInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
        </ol>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li>
              <a
                :href="`http://api.atguigu.cn/api/payment/alipay/submit/${payInfo.id}`"
              >
                <img src="./images/pay2.jpg" />
              </a>
            </li>
            <li><img src="./images/pay3.jpg" @click="pay" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入生成二维码的插件qrcode
import QRCode from 'qrcode'
export default {
  name: 'Pay',
  data() {
    return {
      payInfo: {}, // 支付订单的信息对象
      codeInfo: {}, // 微信支付的相关信息,codeUrl 支付的地址(生成二维码)
    }
  },
  async mounted() {
    // 获取当前的订单的id
    const { orderId } = this.$route.query
    // 调用接口,获取当前的订单的详情的信息数据
    const result = await this.$API.reqOrderDetail(orderId)
    if (result.code === 200) {
      // 保存当前的订单的相关信息数据
      this.payInfo = result.data
      // 获取支付的相关的信息数据
      const codeResult = await this.$API.reqPayInfo(this.payInfo.id)
      if (codeResult.code === 200) {
        this.codeInfo = codeResult.data
      }
    }
  },
  methods: {
    // 支付操作
    pay() {
      let flag = false
      // 生成一个二维码的图片的地址
      QRCode.toDataURL(this.codeInfo.codeUrl)
        .then((url) => {
          // url是一个图片的地址
          this.$alert(`<img src="${url}" />`, '微信扫码支付', {
            dangerouslyUseHTMLString: true, // 使用html的方式进行解析
            showClose: false, // 隐藏右上角的关闭按钮
            showCancelButton: true, // 显示取消按钮
            showConfirmButton: true, // 显示确定按钮
            cancelButtonText: '支付遇到问题', // 取消按钮的内容
            confirmButtonText: '支付完成', // 确定按钮的内容
            center: true, // 居中显示
          })
            .then(() => {
              // 清空定时器
              clearInterval(this.timeId)
              this.timeId = null
              // 相当于点击了确定按钮
              if (flag) {
                this.$message.success('支付成功')
                // 跳转界面
                this.$router.push('/paysuccess')
                // 清空购物车数据
                this.$store.dispatch('deleteCartItems')
              }
            })
            .catch(() => {
              // 相当于点击了取消按钮
              this.$message.error('支付遇到问题,请联系前台客服小妹妹')
              // 清空定时器
              clearInterval(this.timeId)
              this.timeId = null
            })

          this.timeId = setInterval(() => {
            // 进行支付
            this.$API
              .reqPayStatus(this.$route.query.orderId)
              .then((result) => {
                // 判断结果是否为200
                if (result.code === 200) {
                  flag = true
                  this.$message.success('支付成功')
                  // 关闭对话框
                  this.$msgbox.close()
                  // 清空定时器
                  clearInterval(this.timeId)
                  this.timeId = null
                  // 跳转界面
                  this.$router.push('/paysuccess')
                  // 清空购物车数据
                  this.$store.dispatch('deleteCartItems')
                }
              })
              .catch((error) => {
                this.$message.error(error.message || '支付失败了')
                // 清空定时器
                clearInterval(this.timeId)
                this.timeId = null
              })
          }, 1000)
        })
        .catch((err) => {
          this.$message.error(err.message || '生成微信支付二维码失败了')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px '微软雅黑';
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>