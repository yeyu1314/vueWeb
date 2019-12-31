<template>
  <div class="header df">
    <div class="logo df">
      <i class="el-icon-menu" @click="handleChangeCollapse"></i>logo</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleChangeCollapse () {
      this.$store.commit('changeCollapse')
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 100%;
  .logo {
    width: 145px;
    height: 100%;
    cursor: pointer;
    font-size: 30px;
  }
}
</style>
