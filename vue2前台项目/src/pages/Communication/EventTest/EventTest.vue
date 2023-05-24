<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 
    原生DOM事件
        绑定原生DOM事件监听的2种情况
            在html标签上绑定DOM事件名的监听
            在组件标签上绑定DOM事件名的监听(.native), 事件绑定在组件的根标签上
        当用户操作对应的界面时, 浏览器就会自动创建并封闭包含相关数据的事件对象, 分发对应的事件, 从而触发事件监听回调函数调用
        事件对象event, 本质是 "事件数据对象"
        event对象内的数据属性: target / offsetX / offsetY / keyCode等
        $event就是浏览器创建的event对象, 默认传递给事件监听回调函数的就是它



      原生事件:是不需要手动分发的, 事件="回调" 事件触发,回调函数则自动执行
          DOM中标签里面自己定义的事件,不能直接自动的触发,所以,也不算是自定义事件

      自定义事件:自己自定义的, 事件="回调"  事件需要手动分发,回调才会执行(相对于Vue中的组件而言的),
                组件上使用的是系统的事件,但是没有使用.native修饰,此时该事件仍然是自定义事件,需要手动分发


     -->
    <!--DOM的原生事件,事件对应的回调在事件触发的时候会自动的执行-->
    <button @click="showMsg1">DOM原生事件1</button>
    <!--啥也不是-->
    <!-- <button @xxx="showMsg2">DOM原生事件</button> -->
    <button @click="showMsg2($event)">DOM原生事件2</button>
    <hr color="red" />
    <!-- 
      vue自定义事件
        绑定vue自定义事件监听
            只能在组件标签上绑定
            事件名是任意的, 可以与原生DOM事件名相同
        只有当执行$emit('自定义事件名', data)时分发自定义事件, 才会触发自定义事件监听函数调用
        $event: 就是分发自定义事件时指定的data数据
        $event可以是任意类型, 甚至可以没有
    -->
    <hr />
    <hr />

    <!-- 
1. 绑定事件监听
  事件名
  回调函数: 接收数据/事件对象, 处理事件
2. 分发事件
  事件名
  包含事件相关数据的对象(事件/event对象)
 -->

    <!-- 
   2个问题
  1. 区别原生事件与自定义事件
  2. 区别原生的$event与自定义的$event

  -->
  

    <!--原生事件,组件上使用了系统的事件,然后使用了.native修饰,此时属于原生事件-->
    <Event1 @click.native="showMsg3" />

    <hr />
    <!--组件中使用了系统自带的事件,没有使用.native修饰,那么此时是一个自定义事件
      组件中使用了自己定义的一个事件,即使这个事件使用了.native修饰,那么仍然是自定义事件
    -->
    <Event2 @click="showMsg4" @xxx="xxx" />
  
  
  
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  name: 'EventTest',

  components: {
    Event1,
    Event2,
  },

  methods: {
    showMsg1() {
      console.log('DOM的原生事件1')
    },
    showMsg2(event) {
      console.log('DOM的原生事件2', event)
    },
    showMsg3(){
      console.log('杨哥好帅哦')
    },
    showMsg4(txt){
      console.log('华哥好猥琐啊',txt)
    },
    xxx(txt){
      console.log('静哥比较龌龊',txt)
    }
  },
}
</script>
