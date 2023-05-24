<template>
  <div>
    <h2>祖组件标题</h2>
    <p @click="msg1 += '--'">{{ msg1 }}</p>
    <p @click="msg2 = { color: '++++' }">{{ msg2.color }}</p>
    <hr />
    <Child />
  </div>
</template>

<script>
import Child from './Child'
export default {
  name: 'ProvideInjectTest',

  data() {
    return {
      msg1: 'abc',
      msg2: {
        color: 'red',
      },
    }
  },
  // 提供
  provide() {
    return {
      // 声明向所有后代提供2个数据
      msg11: this.msg1,
      msg22: this.msg2,
      updateMsg: this.updateMsg,
    }
  },

  methods: {
    updateMsg(msg) {
      this.msg1 += msg
    },
  },

  components: {
    Child,
  },
}
</script>

<style lang="less" scoped>
</style>
