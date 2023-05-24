<template>
  <div>
    <h2>深入v-model</h2>

    <!-- html标签上的v-model本质: 动态value属性 + 原生input监听(将输入的最新值保存到属性上) -->

    <input type="text" v-model="msg1" />
    <p>{{ msg1 }}</p>

    <hr color="green" />

    <input type="text" :value="msg2" @input="msg2 = $event.target.value" />
    <p>{{ msg2 }}</p>
    <!-- 组件标签上的v-model本质: 动态value属性 + 自定义input监听(将子组件分发数据保存父组件的属性上) -->

    <hr color="red" />

    <!--

      v-model在组件标签中使用的时候,实际上是传入了input事件和value属性
    -->
    <CustomInput v-model="msg3" />
    <p>{{ msg3 }}</p>

    <hr clor="red" />
    <CustomInput :value="msg4" @input="(e) => (msg4 = e)" />
    <p>{{ msg4 }}</p>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  data() {
    return {
      msg1: '嘎嘎',
      msg2: '哈哈',
      msg3: '嘿嘿',
      msg4: '嘻嘻',
    }
  },
  components: {
    CustomInput,
  },
}
</script>
