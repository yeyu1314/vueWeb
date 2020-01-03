<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <el-button type="danger">测试Element</el-button> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  // background-color: @bg-blue;
  height: 100%;
}
</style>
