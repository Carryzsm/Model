<template>
  <a href="javascript:;" :title="title">
     <el-button v-bind="$attrs" v-on="$listeners">主要按钮</el-button>
  </a>
</template>

<script>
export default {
  name: 'HintButton',
  props:['title'],
  created () {
    // 父级组件向子级组件中传递的数据中除了props接收的/class/style 其他的都可以获取到
    console.log(this.$attrs,this.$listeners)
  }
}





// <img v-bind:src="imageSrc">

// <button v-bind:[key]="value"></button>

// var obj = {
//   name:'小明'
// }

// obj.name
// var key = 'name'
// console.log(obj[key])
</script>