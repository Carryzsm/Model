import Vue from 'vue';
// 引入了当前的这个组件
import AddressModelTemplate from './index.vue';
// 产生了一个组件的构造函数
const AddressModel = Vue.extend(AddressModelTemplate);

// 有了构造函数就可以new 

const address = {
  // 存储的是真实的DOM对象
  el: null,
  // 用来存储组件的实例对象
  addressModel: null,
  // 构造器
  constructor: null,
  // 初始化当前组件的实例对象
  init () {
    // 没有这个组件实例对象则创建,并复用----单例模式
    if (!this.addressModel) {
      // 此时组件实例对象已经创建了,但是没有生成真实的DOM
      this.constructor = new AddressModel();
      // 挂载生成真实的DOM
      this.addressModel = this.constructor.$mount();
      // 取出真实的DOM单独的保存起来
      this.el = this.addressModel.$el;
    }
    this.mount();
  },
  // 把真实DOM插入到body中
  mount () {
    document.body.appendChild(this.el);
  },
  // 卸载该组件
  unmount () {
    document.body.removeChild(this.el);
  },
  // 直接清除所有的表单的数据
  clear () {
    // 这种清空组件中数据的方式或者这种写法是推荐
    Object.assign(this.addressModel.$data.addressInfo, this.addressModel.$options.data().addressInfo)
  }
}
// 设置回调函数,允许传入回调函数-----确定按钮的回调
Object.defineProperty(address, 'confirm', {
  configurable: false,
  enumerable: true,
  set (value) {
    // 干掉该事件之前绑定的回调函数
    this.addressModel.$off('confirm', this.addressModel._confirm);
    this.addressModel._confirm = value; // 重新设置回调函数
    this.addressModel.$on('confirm', value); // 以事件的方式来进行绑定
  },
  get () {
    return this.addressModel._confirm;
  }
})
// 取消按钮
Object.defineProperty(address, 'cancel', {
  configurable: false,
  enumerable: true,
  set (value) {
    this.addressModel.$off('cancel', this.addressModel._cancel);
    this.addressModel._cancel = value;
    this.addressModel.$on('cancel', value);
  },
  get () {
    return this.addressModel._cancel;
  }
})
// 向组件内部传入props数据
Object.defineProperty(address, 'formData', {
  configurable: false,
  enumerable: true,
  set (value) {
    this.addressModel.$props.formData = value;
  },
  get () {
    return this.addressModel.$props.formData;
  }
})
// 全局,注册该组件了
// Vue.component('组件名字',组件对象)
Vue.prototype.$address = function () {
  address.init();
  return address;
}
// 在该项目的任何一个组件中  组件的实例对象调用$address() 即可实现该组件的显示
// var address = this.$address()
// 1. 组件使用更加灵活,无需使用组件标签的形式来使用,只需要通过js即可进行操作
// 2. 关于组件在哪个标签中嵌入显示,层级控制更加的方便