<template>
  <div class="spec-preview">
    <img :src="smallImg" />
    <div class="event" ref="event" @mousemove="handlerMove"></div>
    <div class="big">
      <img :src="bigImg" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: {
    smallImg: String, // 小图
    bigImg: String, // 大图
  },
  // 页面渲染后的生命周期钩子--回调
  mounted() {
    // 页面加载后获取将来遮挡层的宽度
    this.maskWidth = this.$refs.event.clientWidth / 2
  },
  methods: {
    // 鼠标移动事件的回调函数
    handlerMove(event) {
      // 获取鼠标移动的时候的横纵坐标
      const { offsetX, offsetY } = event
      // 获取遮挡层的对象
      const mask = this.$refs.mask
      // 获取大图
      const bigImg = this.$refs.bigImg
      // 获取遮挡层的宽度
      const maskWidth = this.maskWidth
      // 设置鼠标在遮挡层的正中间的位置
      // 设置left和top的值
      let left = offsetX - maskWidth / 2
      let top = offsetY - maskWidth / 2
      // 限制边界
      left = left < 0 ? 0 : left > maskWidth ? maskWidth : left
      top = top < 0 ? 0 : top > maskWidth ? maskWidth : top
      // 设置当前遮挡层的坐标
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      // 移动大图
      bigImg.style.left = -left * 2 + 'px'
      bigImg.style.top = -top * 2 + 'px'
    },
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>