<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户{{ phoneCode }}
        <span class="go">我有账号，去
          <!-- <a href="login.html" target="_blank">登陆</a> -->
          <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" name="phone" v-validate="'required|phone'" :class="{ valid: errors.has('phone') }" />
        <button :disabled="!isRightPhone || computedTime > 0" @click="sendCode">
          {{ computedTime > 0 ? `已发送(${computedTime})s` : '获取验证码' }}
        </button>
        <span class="error-msg">{{ errors.first('phone') }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" name="code" v-validate="{ required: true, regex: /^\d{6}$/ }" :class="{ valid: errors.has('code') }" />
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="password" name="password" v-validate="{ required: true, min: 6, max: 10 }" :class="{ valid: errors.has('password') }" />
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password2" name="password2" v-validate="{ required: true, is: password }" :class="{ valid: errors.has('password2') }" />
        <span class="error-msg">{{ errors.first('password2') }}</span>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="isAgree" name="isAgree" v-validate="{ required: true }" :class="{ valid: errors.has('isAgree') }" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('isAgree') }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone: '', // 手机号码
      code: '', // 短信验证码
      password: '', // 密码
      password2: '', // 确认密码
      isAgree: true, // 是否同意的标识
      computedTime: 0, // 短信验证码发送的时候的 倒计时时间
      phoneCode: '' // 存储短信验证码
    }
  },
  computed: {
    // 验证手机号码是否正确,如果手机号码是正确,则 发送短信的按钮就可以使用
    isRightPhone() {
      return /^[1]\d{10}$/.test(this.phone)
    }
  },
  methods: {
    // 发送短信验证码
    async sendCode() {
      try {
        const result = await this.$API.reqSendCode(this.phone)
        this.phoneCode = result.data
        // console.log(result.data)
        // 提示用户信息,验证码已经发送了
        this.$message.success('短信验证码已经发送了')
        // 倒计时操作
        this.computedTime = 30
        this.timeId = setInterval(() => {
          // 判断
          if (this.computedTime <= 0) {
            clearInterval(this.timeId)
          } else {
            this.computedTime--
          }
        }, 1000)
      } catch (error) {
        // 提示用户信息, 验证码发送失败了
        this.$message.error(error.message || '短信验证码发送失败了')
        // 比较严谨的做法
        clearInterval(this.timeId)
        this.computedTime = 0
      }
    },
    // 注册功能
    async register() {
      // 所有的表单通过后,分发action,实现注册
      const success = await this.$validator.validateAll()
      clearInterval(this.timeId)
      this.computedTime = 0
      // 判断所有的表单验证是否都通过了
      if (success) {
        // 表单验证都通过了
        try {
          // 收集手机号码/密码/验证码
          const { phone, code, password } = this
          // 进行注册
          await this.$store.dispatch('register', { phone, code, password })
          this.$message.success('注册成功了')
          // 成功则跳转到登录界面
          this.$router.replace('/login')
        } catch (error) {
          this.$message.error(error.message)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
        &.valid {
          border: 1px solid red;
        }
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>