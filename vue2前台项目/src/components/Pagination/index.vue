<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total > 0">
    <!--上一页-->
    <button :disabled="currentPage === 1" @click="changeCurrentPage(currentPage - 1)">
      上一页
    </button>
    <!--第一页-->
    <button v-if="startEnd.start > 1" @click="changeCurrentPage(1)">1</button>
    <!--第一个省略号-->
    <button disabled v-if="startEnd.start > 2">...</button>
    <!--连续页码-->
    <button v-if="num >= startEnd.start" v-for="(num, index) in startEnd.end" :key="num" :class="{ active: currentPage === num }" @click="changeCurrentPage(num)">
      {{ num }}
    </button>

    <!--第二个省略号-->
    <button disabled v-if="startEnd.end < totalPage - 1">...</button>
    <!--最后一页-->
    <button v-if="startEnd.end < totalPage" @click="changeCurrentPage(totalPage)">
      {{ totalPage }}
    </button>
    <!--下一页-->
    <button :disabled="currentPage === totalPage" @click="changeCurrentPage(currentPage + 1)">
      下一页
    </button>
    <!--总条数-->
    <button disabled style="margin-left: 30px">
      共{{ pageConfig.total }}条
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  // 接收外部传入进来的数据
  props: {
    pageConfig: {
      // 设置当前组件所需的数据的默认值
      default: () => ({
        total: 0, // 总条数0
        pageNo: 1, // 默认的选中的页码是第一页
        pageSize: 5, // 默认每页是5条数据
        showPageNo: 5 // 默认连续的页码数是5个(5个连续的页码)
      })
    }
  },
  data() {
    return {
      // 组件内部设置默认的选中的页码数
      currentPage: this.pageConfig.pageNo
    }
  },
  // 监视
  watch: {
    'pageConfig.pageNo'(val) {
      // 立刻更新当前选中的页码数
      this.currentPage = val
    }
  },
  // 计算属性
  computed: {
    // 计算总页数
    totalPage() {
      // 获取总条数,每页显示数据的条数
      const { total, pageSize } = this.pageConfig
      // 一共13条数,每页2条数据,一共多少页   13/2 = 取整6 向上取整
      // 最好判断数据有效
      if (total < 0 || pageSize < 0) return
      return Math.ceil(total / pageSize)
    },
    // 计算连续页码的开始页码和结束页码
    startEnd() {
      // 获取总页码数/连续页码数/当前选中的页码数
      const {
        currentPage,
        totalPage,
        pageConfig: { showPageNo }
      } = this
      // 开始页码 = 当前选中页码数 - 向下取整(连续页码数/2)
      let start = currentPage - Math.floor(showPageNo / 2)
      // 判断
      if (start < 1) {
        start = 1
      }
      // 结束页码 = 当前选中的页码数 + 向下取整(连续页码数/2)
      // let end = currentPage + Math.floor(showPageNo/2)
      //  当前页码   7   开始页码 5  结束页码 9
      let end = start + showPageNo - 1
      // 判断,连续页码的结束页码如果大于了总的页码数,设置为总页码数
      if (end > totalPage) {
        end = totalPage
        // 需要重新计算开始页码
        // 0 1  2  3  4
        start = end - showPageNo + 1
        // 再次判断
        if (start < 1) {
          start = 1
        }
      }
      return { start, end }
    }
  },
  methods: {
    // 点击各种按钮修改当前选中的页码
    changeCurrentPage(currentPage) {
      // 更新页码数
      this.currentPage = currentPage
      // 通知父级组件,页码数改变了
      this.$emit('changeCurrentPage', currentPage)
    }
  }

  // 数据初始化之后的生命周期回调
  // created () {
  //   console.log(this.pageConfig.pageNo)
  // },
}

/**
 *
 * 分页的组件
 * 该分页组件中需要其他开发者传入什么样的数据
 *  1.总数据的条数---total
 *  2.默认的页码----pageNo
 *  3.每页显示数据的条数---pageSize
 *  4.连续的页码数(奇数)----showPageNo
 * 封装传入的数据到一个对象中
 * 当前的组件自己需要什么样子的数据,自己定义出来
 *
 *  该组件中可以自动的计算出 页码数(总的页数)
 *
 * 该分页组件中需要其他开发者传入什么样的事件
 *
 * 该分页组件中有一些数据是默认的
 *
 *
 *
 *
 */
</script>


<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
