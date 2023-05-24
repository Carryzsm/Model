<template>
  <ul>
    <!-- <li v-for="(item, index) in data" :key="index"> -->
      <!-- 
        <slot>的所有属性都自动会传递给父组件
       -->
      <!-- <slot :row='item' :$index="index"></slot>
    </li> -->

  <li v-for="(item,index) in data" :key="item.id">
    <!--普通插槽-->
    <!-- <slot /> -->
    <!--命名插槽(具名插槽)-->
    <!-- <slot name="right"> -->



      <slot :row="item" :$index="index" />

  </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array
  }
}
</script>