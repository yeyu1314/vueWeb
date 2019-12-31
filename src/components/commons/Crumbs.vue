<template>
  <div class="crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item,index) in crumbsList"
        :key="+new Date() + index"
        :to="item.redirect?item.redirect:item.path">
          {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {
      crumbsList: []
    }
  },
  watch: {
    $route () {
      this.getCrumbs()
    }
  },
  methods: {
    getCrumbs () {
      this.crumbsList = this.$route.matched
    }
  },
  created () {
    this.getCrumbs()
  }
}
</script>
<style lang="less" scoped>
</style>
