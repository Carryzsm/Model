<template>
  <div style="background: #ccc; height: 50px">
    <h3>儿子小明: 有存款: {{ money }}</h3>
    <button @click="giveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
import {cpMixin} from './mxins'
export default {
  name: 'Son',
  mixins: [cpMixin],

  data() {
    return {
      money: 30000,
    }
  },


  // methods: {
  //   // 自己组件有一个减少数据的方法
  //   borrowMoney(count){
  //     this.money-=count
  //   },
  //   // 儿子主动给钱
  //   giveMoney(count){
  //     this.money-=count
  //     this.$parent.money+=count

  //   }
  // }


}
</script>
