<template>
  <div class="searchContent">
    <el-input placeholder="请输入车牌号" v-model="carNumber" clearable></el-input>
    <el-button type="primary" style="background:#009688;" icon="el-icon-search">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus">新增车辆信息</el-button>
  </div>
</template>

<script>
export default {
  name: 'detectionOrderInput',
  data () {
    return {
      carNumber: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .searchContent {
    margin: 10px 0 20px 0;
    display: flex;
    flex-direction: row;
    .el-input--suffix {
      width: 200px;
      margin-right: 20px;
    }
  }
</style>
