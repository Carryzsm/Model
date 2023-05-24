<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" @click="toSearch" v-show="isShowFirst">
          <div class="all-sort-list2">
            <div class="item" v-for="(c1, index) in baseCategoryList" :key="c1.categoryId" :class="{ item_on: currentIndex === index }" @mouseenter="showSubCategory(index)">
              <h3>
                <!--一级分类的信息-->

                <a href="javascript:;" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                <!-- <a href="javascript:;" @click="toSearch(c1.categoryName,c1.categoryId)">{{ c1.categoryName }}</a> -->
                <!-- <a href="javascript:;">{{ c1.categoryName }}</a> -->
                <!-- <router-link
                  :to="{
                    path: '/search',
                    query: {
                      categoryName: c1.categoryName,
                      category1Id: c1.categoryId,
                    },
                  }"
                  >{{ c1.categoryName }}</router-link
                > -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <!--二级分类的信息-->
                      <a href="javascript:;" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      <!-- <a href="javascript:;" @click="toSearch(c2.categoryName,c2.categoryId)">{{ c2.categoryName }}</a> -->
                      <!-- <a href="javascript:;">{{ c2.categoryName }}</a> -->
                      <!-- <router-link
                        :to="{
                          path: '/search',
                          query: {
                            categoryName: c2.categoryName,
                            category2Id: c2.categoryId,
                          },
                        }"
                        >{{ c2.categoryName }}</router-link
                      > -->
                    </dt>
                    <dd>
                      <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                        <!--三级分类的信息-->
                        <a href="javascript:;" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        <!-- <a href="javascript:;" @click="toSearch(c3.categoryName,c3.categoryId)">{{ c3.categoryName }}</a> -->
                        <!-- <a href="javascript:;">{{ c3.categoryName }}</a> -->
                        <!-- <router-link
                          :to="{
                            path: '/search',
                            query: {
                              categoryName: c3.categoryName,
                              category3Id: c3.categoryId,
                            },
                          }"
                          >{{ c3.categoryName }}</router-link
                        > -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
// 引入lodash库,按需引入
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  computed: {
    // 获取三级分类的数据
    ...mapState({
      baseCategoryList: (state) => state.home.baseCategoryList
    })
  },
  data() {
    return {
      currentIndex: -2, // 用来存储高亮显示的菜单的索引
      isShowFirst: true // 一级分类菜单默认显示
    }
  },
  methods: {
    // 鼠标进入,设置当前的菜单要存储的索引值
    showSubCategory: throttle(function (index) {
      if (this.currentIndex !== -2) {
        this.currentIndex = index
      }
    }, 200),
    // 点击一级分类/二级分类/三级分类的信息名字,进行路由的跳转,并传递参数数据
    toSearch(event) {
      // 获取此时点击的目标的标签对象
      const nodeTarget = event.target
      // 判断点击的是不是a标签
      if (nodeTarget.nodeName === 'A') {
        // 获取当前点击的a标签中所存储的数据
        const { category1id, category2id, category3id, categoryname } =
          nodeTarget.dataset
        // 路由跳转----进入到Search组件中,同时要进行参数的传递
        const query = {
          categoryName: categoryname
        }
        // 判断
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }

        // 路由跳转,并传递参数
        // 当前的路由的地址是不是/search,同时确定此时params参数是否存在
        // 通过路由信息对象,获取path和params对象
        const { path, params } = this.$route
        // 判断当前的路径中有没有/search
        if (path.indexOf('/search') === 0) {
          this.$router.replace({ path, query, params })
        } else {
          this.$router.push({ path: '/search', query })
        }

        // 隐藏高亮的效果
        this.currentIndex = -2
        this.isShowFirst = false
      }
    },
    // 鼠标离开失去高亮
    hideFirst() {
      this.currentIndex = -2
      // 隐藏一级分类菜单
      if (this.$route.path !== '/') {
        this.isShowFirst = false
      }
    },
    // 鼠标进入显示一级分类菜单
    showFirst() {
      this.isShowFirst = true
      this.currentIndex = -1
    }
  },
  // 页面的渲染完毕后的生命周期回调
  mounted() {
    // 判断当前的路由的路径是不是根路径
    if (this.$route.path !== '/') {
      this.isShowFirst = false
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #02a774;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>