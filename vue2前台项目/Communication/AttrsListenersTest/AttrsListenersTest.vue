<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- 
      扩展双击监听:
        @dblclick="add2"
            绑定是自定义事件监听, 而el-button内部并没处理(没有绑定对应的原生监听, 没有分发自定义事件)
            双击时, 不会有响应
        @dblclick.native="add2"
            绑定的是原生的DOM事件监听, 最终是给组件的根标签<a>绑定的原生监听
            当双击a内部的<button>能响应, 因为事件有冒泡

     -->

    <!-- <el-button type="primary" icon="el-icon-plus" size="mini" title="添加" circle>主要按钮</el-button>
    <el-button type="success" icon="el-icon-success" size="small" title="编辑">成功按钮</el-button>
    <el-button type="warning" icon="el-icon-warning" size="medium" title="删除">警告按钮</el-button>
    <el-button type="danger" icon="el-icon-close" title="双击">危险按钮</el-button> -->

    <!--父级组件调用子级组件的时候,传入的数据个数不确定,传入的事件不确定,但是子级组件依然要可以正常使用-->
    <HintButton title="双击" type="primary" icon="el-icon-plus" size="mini" circle @dblclick.native="test" />
    <HintButton title="添加" type="primary" icon="el-icon-plus" size="mini" circle @click="add" />
    <HintButton title="修改" type="success" icon="el-icon-success" @click="edit" />


    <!-- <button v-on="{mouseenter:f1,mouseleave:f2}"></button> -->
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from './HintButton'
export default {
  name: 'AttrsListenersTest',

  methods: {},

  components: {
    HintButton,
  },
  methods: {
    test(){
      console.log('被双击了')
    },
    xxx(){},
    add(){
      console.log('添加了')
    },
    edit(){
      console.log('编辑了')
    }
  }
}
</script>
<style scoped>
</style>
