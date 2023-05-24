<template>
  <div style="background: #ccc; height: 50px">
    <h3>女儿小红: 有存款: {{ money }}</h3>
    <button @click="giveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import { cpMixin } from './mxins'
export default {
  name: 'Daughter',
  mixins: [cpMixin],
  data() {
    return {
      money: 20000,
    }
  },
  // methods: {
  //   borrowMoney(count) {
  //     this.money -= count
  //   },
  //   giveMoney(count) {
  //     this.money -= count
  //     this.$parent.money += count
  //   },
  // },
}
</script>
