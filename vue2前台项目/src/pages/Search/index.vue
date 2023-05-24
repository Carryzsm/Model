<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--显示搜索的结果或者是筛选的条件-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类信息相关-->
            <li class="with-x" v-if="options.categoryName">
              {{ options.categoryName }}<i @click="removeCategoryName">×</i>
            </li>
            <!--关键字信息相关-->
            <li class="with-x" v-if="options.keyword">
              {{ options.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!--关键字信息相关-->
            <li class="with-x" v-if="options.trademark">
              {{ options.trademark }}<i @click="removeTrademark">×</i>
            </li>
            <!--平台属性信息相关-->
            <li class="with-x" v-for="(prop, index) in options.props" :key="prop">
              {{ prop }}<i @click="deleteProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--显示品牌及平台属性的子级组件-->
        <SearchSelector @setTrademark="setTrademark" :setProp="setProp" />

        <!--details-->
        <div class="details clearfix">
          <!--排序的相关内容-->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: setOrderClass('1') }" @click="changeOrderFlag('1')">
                  <a href="javascript:;">综合{{ getIconText('1') }}</a>
                </li>
                <li>
                  <a href="javascript:;">销量</a>
                </li>
                <li>
                  <a href="javascript:;">新品</a>
                </li>
                <li>
                  <a href="javascript:;">评价</a>
                </li>
                <li :class="{ active: setOrderClass('2') }" @click="changeOrderFlag('2')">
                  <a href="javascript:;">价格{{ getIconText('2') }}</a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇⬆</a>
                </li> -->
              </ul>
            </div>
          </div>
          <!--显示产品信息的相关内容-->
          <div class="goods-list">
            <ul class="yui3-g">
              <!--解决页面白板突然出现图片,没有任何过渡效果的思路-->
              <!-- <li v-if="goodsList.length===0">
                  <img src="./images/白板的图片" alt="">
              </li> -->
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="javascript:;">
                      <img :src="goods.defaultImg" />
                    </a> -->
                    <!--点击图片内容进行跳转-->
                    <router-link :to="`/detail/${goods.id}`">
                      <!--原来的写法-->
                      <!-- <img :src="goods.defaultImg" /> -->
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- <a href="javascript:;" :title="goods.title">
                      {{ goods.title }}
                    </a> -->
                    <!--点击文字内容进行跳转-->
                    <router-link :title="goods.title" :to="`/detail/${goods.id}`">
                      {{ goods.title }}
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:;" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页相关内容-->
          <div class="fr page">
            <Pagination :pageConfig="{
                total: productList.total,
                showPageNo: 5,
                pageNo: options.pageNo,
                pageSize: options.pageSize,
              }" @changeCurrentPage="getProductList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Search',

  components: {
    SearchSelector
  },
  data() {
    return {
      options: {
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '', // 三级分类的id
        categoryName: '', // 分类的名字
        keyword: '', // 搜索关键字
        props: [], // 平台属性的条件 ['属性的id:属性值:属性名字'], 如:[23:4G:运行内存33]
        // trademark: '', // 品牌的条件 '品牌id:品牌名字' 如:  '5:小米'
        order: '1:desc', // 排序的方式	 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"
        pageNo: 1, // 默认第一页的数据,页码是1
        pageSize: 5 // 默认每页显示的条数
      } // 存储请求参数的对象
    }
  },
  computed: {
    // 获取商品信息对象数据
    ...mapState({
      productList: (state) => state.search.productList
    }),
    // 获取产品信息数据
    ...mapGetters(['goodsList'])
  },
  mounted() {
    // 获取路由跳转过来后传递的参数数据
    const { query, params } = this.$route
    // 准备参数
    const options = {
      ...this.options,
      ...query,
      ...params
    }
    // 更新参数数据
    this.options = options
    // 调用获取商品信息数据的方法
    this.getProductList()
  },
  // 只有数据变化了之后才会执行里面的代码
  watch: {
    // 在Vue的路由中,如果路由跳转的时候,仅仅是参数变化了(路由地址相同,仅仅是参数变化),那么当前的组件界面不会重新渲染,所以,当前的组件的生命周期的回调不会再次调用
    // 如果想要再次的实现页面的重新渲染,可以选择监视$route(路由信息对象)
    $route(to, from) {
      // to 和from 都是当前的路由信息对象
      // to 要跳转的路由信息对象
      // from 从哪里跳转过来的路由信息对象
      // console.log(to)
      // console.log(from)
      const { query, params } = to
      const options = {
        ...this.options,
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '', // 三级分类的id
        categoryName: '', // 分类的名字
        keyword: '', // 搜索关键字
        ...query,
        ...params
      }
      // 更新参数数据
      this.options = options
      // 调用获取商品信息数据的方法
      this.getProductList()
    }
  },
  methods: {
    // 获取商品信息数据
    getProductList(pageNo = 1) {
      this.options.pageNo = pageNo
      this.$store.dispatch('getProductList', this.options)
    },
    // 移除分类信息数据
    removeCategoryName() {
      // 干掉分类信息相关的参数数据
      this.options.category1Id = ''
      this.options.category2Id = ''
      this.options.category3Id = ''
      this.options.categoryName = ''
      // 分发action,发送请求
      // 直接调用接口的方式获取数据,有bug,路由的地址及参数没有变化
      // this.getProductList()
      this.$router.replace(this.$route.path)
      // console.log(this.$route.path)
    },
    // 移除搜索关键字
    removeKeyword() {
      // 干掉关键字内容
      this.options.keyword = ''
      // 路由重新跳转
      this.$router.replace({ path: '/search', query: this.$route.query })
      // 通过事件总线的方式,把Header组件中的搜索框中的内容清空
      this.$bus.$emit('removeKeyword')
    },
    // 更新品牌的参数数据
    setTrademark(trademark) {
      // 如果点击的品牌信息和之前存储的品牌信息相同则,不再发送请求
      if (this.options.trademark === trademark) return
      // 保存子级组件向父级组件传递过来品牌的信息数据
      // this.options.trademark = trademark
      // 重新获取数据
      // this.getProductList()

      // 如果当前在data中有options对象,那么options对象是响应式的数据对象,数据变化,则页面可以渲染,但是,通过下面的动态的方式为响应式对象中添加一个属性,该属性不是响应式的,所以,该属性的值变化了,页面也不会重新渲染
      // 解决: 向响应式对象中添加一个响应式的属性,即可
      // this.options.trademark = trademark

      // 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
      this.$set(this.options, 'trademark', trademark)
      this.getProductList()
    },
    // 移除品牌信息
    removeTrademark() {
      // this.options.trademark = ''
      // this.getProductList()

      // 如果上面使用的是响应式数据的添加方法的方式来添加属性
      // 那么下面删除这个属性的时候,如果使用this.options.trademark='' 并不是删除该属性,而是清空属性值
      // 怎么办
      // 下面这种方法是不能删除这个响应式的属性的
      // delete this.options.trademark
      // 最终使用下面的方式移除响应式对象中的响应式属性
      this.$delete(this.options, 'trademark')
      this.getProductList()
      // console.log('执行了')
    },
    // 更新平台属性的参数数据
    setProp(prop) {
      // 先判断,如果数组中没有这个数据,就添加这个数据
      if (this.options.props.indexOf(prop) !== -1) return
      // 把平台属性的数据存储到数组中
      this.options.props.push(prop)
      // 重新获取数据
      this.getProductList()
    },
    // 移除平台属性的参数数据
    deleteProp(index) {
      this.options.props.splice(index, 1)
      this.getProductList()
    },
    // 设置当前排序的选项有高亮显示效果
    setOrderClass(flag) {
      return this.options.order.indexOf(flag) === 0
    },
    // 点击按钮,实现排序选项切换且高亮显示及排序功能的实现
    changeOrderFlag(flag) {
      // order: '1:desc'  1---排序的标识  desc---排序的方式
      let [orderFlag, orderType] = this.options.order.split(':')
      // '1:desc' 综合  降序  排序
      // '1:asc'  综合  升序  排序
      // '2:desc' 价格 降序  排序
      // '2:asc'  价格 升序  排序
      // 判断标识是否相同
      if (flag === orderFlag) {
        // 标识相同,点击的是同一个排序菜单,只需要改变排序的方式
        orderType = orderType === 'desc' ? 'asc' : 'desc'
      } else {
        // 此时的标识不同,那么就先改变标识
        orderFlag = flag
        orderType = 'desc'
      }
      // 立刻更新order排序的参数数据
      this.options.order = orderFlag + ':' + orderType
      // 重新获取数据
      this.getProductList()
    },
    // 箭头的标识
    getIconText(flag) {
      let [orderFlag, orderType] = this.options.order.split(':')
      if (orderFlag === flag) {
        return orderType === 'desc' ? '⬇' : '⬆'
      } else {
        return ''
      }
    }

    // 分页组件需要的事件的回调
    // changeCurrentPage(pageNo){
    //   // this.options.pageNo = pageNo
    //   this.getProductList(pageNo)
    // }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        /*float: right;*/

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>