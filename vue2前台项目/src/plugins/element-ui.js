import Vue from 'vue';
// 引入部分组件
import {
  MessageBox,
  Message,
  Button
} from 'element-ui';

Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$prompt = MessageBox.prompt;