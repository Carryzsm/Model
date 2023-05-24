export const cpMixin = {
  methods: {
    borrowMoney(count) {
      this.money -= count
    },
    giveMoney(count) {
      this.money -= count
      this.$parent.money += count
    },
  },
}