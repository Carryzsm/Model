<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            <span>{{ userInfo.nickName }}</span>
            <a href="javascript:;" style="margin-left: 15px" @click="logout">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <!-- <a href="###">登录</a>
            <a href="###" class="register">免费注册</a> -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="javascript:;" @click="$router.replace('/center')">我的订单</a>
          <a href="javascript:;" @click="$router.replace('/shopcart')">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a> -->
        <router-link class="logo" title="尚品汇" to="/">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      keyword: '' // 收集文本框中输入的数据
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },
  methods: {
    // 跳转到Search组件界面---路由跳转
    toSearch() {
      // 此时,如果路由跳转后,依然进行路由的重复跳转,此时会出现错误
      // this.$router.push('/search')
      // 解决方式如下:
      // 方式1: 使用一个空的成功回调
      // this.$router.push('/search',()=>{})
      // 方式2: 使用一个空的成功回调和一个空的失败回调
      // this.$router.push('/search',()=>{},()=>{})
      // 方式3: 只传入一个失败的空回调
      // this.$router.push('/search',null,()=>{})
      // 如果只使用.then是不行的
      // 方式4: 可以使用.then()和.catch()配合使用
      // this.$router.push('/search').then(()=>{}).catch(()=>{})
      // 方式5: 只有一个.catch()是可以的
      // this.$router.push('/search').catch(()=>{})
      // params的方式传参---字符串的拼接形式
      // this.$router.push(`/search/${this.keyword}`)
      // query的方式传参---字符串的拼接形式
      // this.$router.push(`/search?keyword=${this.keyword}`)

      // 无论是params还是query的方式,实际上都可以以对象的形式进行传参
      // params的方式以对象的书写形式进行传参,需要在注册路由的时候指定name属性
      // this.$router.push({name:'search',params:{keyword:this.keyword}})
      // query的方式以对象的书写形式进行传参
      // this.$router.push({path:'/search',query:{keyword:this.keyword}})
      // query的方式中可以使用name的写法
      // this.$router.push({name:'search',query:{keyword:this.keyword}})
      // params的方式中不可以使用path的写法
      // this.$router.push({path:'/search',params:{keyword:this.keyword}})
      // 判断
      // 如果有参数,那么就跳转并传参,如果没有参数,那么就跳转,不传参
      const keyword = this.keyword.trim()
      // 获取path和query参数
      const { query } = this.$route
      const location = {
        name: 'search',
        query
      }

      // 判断当前的keyword是否有值
      if (keyword) {
        // 要进行params的方式进行传参
        location.params = { keyword: this.keyword }
      }
      // 判断路由的路径是不是search
      if (this.$route.name === 'search') {
        this.$router.replace(location)
      } else {
        this.$router.push(location)
      }

      // if (keyword) {
      //   // 判断路径中是否包含/search
      //   if (path.indexOf('/search') === 0) {
      //     this.$router.push({
      //       name: 'search',
      //       params: { keyword: this.keyword },
      //       query,
      //     })
      //   } else {
      //     this.$router.push({
      //       name: 'search',
      //       params: { keyword: this.keyword },
      //     })
      //   }
      // } else {
      //   // 判断路径中是否包含/search
      //   if (path.indexOf('/search') === 0) {
      //     this.$router.push({ name: 'search', query })
      //   } else {
      //     this.$router.push({ name: 'search' })
      //   }
      // }
    },
    // 退出
    logout() {
      // 提示框
      this.$confirm('您确定要退出吗', '退出操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 提示
          this.$message.success('退出成功')
          await this.$store.dispatch('logout')
          this.$router.replace('/login')
        })
        .catch(() => {})
    }
  },
  mounted() {
    // 通过事件总线绑定一个清空搜索框内容的事件
    this.$bus.$on('removeKeyword', () => {
      this.keyword = ''
    })
  }
}

</script>
<style lang="less" rel="stylesheet/less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>