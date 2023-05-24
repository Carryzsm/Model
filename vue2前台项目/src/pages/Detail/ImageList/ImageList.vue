<template>
  <swiper
    :options="{
      slidesPerView: 5, // 显示几个图片(每次显示几屏)
      slidesPerGroup: 5, // 每次移动几个图片(每次移动几屏)
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }"
  >
    <swiper-slide v-for="(skuImg, index) in skuImageList" :key="skuImg.id">
      <img
        :src="skuImg.imgUrl"
        :alt="skuImg.imgName"
        :class="{ active: currentIndex === index }"
        @click="changeCurrentIndex(index)"
      />
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
// 引入vuex的辅助函数
import { mapGetters } from 'vuex'
export default {
  name: 'ImageList',
  data() {
    return {
      currentIndex: 0, // 图片默认被选中的索引
    }
  },
  computed: {
    ...mapGetters(['skuImageList']),
  },
  methods: {
    changeCurrentIndex(index) {
      // 每次点击小图的时候,当前的这个图片中存储选中的索引需要修改一下,修改为当前的索引
      this.currentIndex = index
      // 同时需要通知父级组件Detail,当前选中的图片的索引,改变了,直接传改变后的索引
      this.$emit('changeCurrentIndex',index)
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    // width: 56px;
    // height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>