import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  // 提示的错误信息都是中文的
  messages:{
    ... zh_CN.messages,
    is:field=>`${field}和密码必须是一样的`
  },
  // 表单验证中有哪些字段是需要翻译成中文的
  attributes: {
    phone: '手机号码',
    code: '短信验证码',
    password: '密码',
    password2: '确认密码',
    isAgree: '同意'
  }
})

// 添加一个扩展的验证信息
VeeValidate.Validator.extend('phone', {
  // 提示信息
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => {
    return /^[1]\d{10}$/.test(value)
  }
});