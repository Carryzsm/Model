<template>
  <div>
    <h4>孙组件</h4>
    <p>{{ msg11 }}</p>
    <p>{{ msg22.color }}</p>
    <button @click="updateMsg('abc')">更新祖组件的数据</button>
  </div>
</template>

<script>
export default {
  name: 'GrandChild',
  // 注入
  inject: ['msg11', 'msg22', 'updateMsg'], // 声明注入的属性就会成为组件对象的属性
}
</script>

