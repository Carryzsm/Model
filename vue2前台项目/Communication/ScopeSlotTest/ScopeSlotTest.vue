<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>

    <!-- 
        slot-scope: 指定接收子组件中<slot>所有属性数据的对象
          scope对象的结构: {row, $index}
       -->
    <List :data="todos">
      <!-- <template v-slot:default="slotProps"> -->
      <template slot-scope="slotProps">
        <span v-if="slotProps.row.isComplete" style="color: green">{{
          slotProps.row.text
        }}</span>
        <span v-else>{{ slotProps.row.text }}</span>
      </template>
    </List>
    <hr />

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <!-- 
        slot-scope: 指定接收子组件中<slot>所有属性数据的对象
          scope对象的结构: {row, $index}
       -->
    <List :data="todos">
      <!-- <template v-slot:default="slotProps"> -->
      <template slot-scope="{ row, $index }">
        <span :style="{ color: $index % 2 === 0 ? 'green' : 'blue' }">{{
          row.text
        }}</span>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
import List from './List'
export default {
  name: 'ScopeSlotTest',
  data() {
    return {
      todos: [
        { id: 1, text: 'AAA', isComplete: false },
        { id: 2, text: 'BBB', isComplete: true },
        { id: 3, text: 'CCC', isComplete: false },
        { id: 4, text: 'DDD', isComplete: false },
      ],
    }
  },

  components: {
    List,
  },
}
</script>
