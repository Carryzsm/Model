<template>
  <div style="background: green; height: 80px;">
    <h2>Event2组件</h2>
    <button @click="$emit('click','我就这样')">分发自定义click事件</button><br>
    <button @click="$emit('xxx','真好啊')">分发自定义xxx事件</button><br>
  </div>
</template>
