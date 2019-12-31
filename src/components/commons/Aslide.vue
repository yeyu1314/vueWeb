<template>
  <div class="menu">
    <el-menu
      class="el-menu-admin"
      :default-active="active"
      :default-openeds="openeds"
      :unique-opened="true"
      :router="true"
      :collapse="isCollapse"
      ref="menuchild">
      <!-- 菜单栏包含单个选项 -->
      <el-menu-item
        v-for="(item, pindex) in menuList"
        :key="+new Date() + pindex"
        :index="item.path"
        v-if="!item.itemGroup">
        <i :class="item.icon"></i>
        <span slot="title">{{item.text}}</span>
      </el-menu-item>
      <!-- 菜单栏包含多个选项 -->
      <el-submenu
        v-for="(item, pindex) in menuList"
        :key="pindex"
        :index="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.text}}</span>
        </template>
          <!-- 菜单栏只有二级菜单 -->
          <el-menu-item
            v-for="(subitem, subindex) in item.itemGroup"
            :key="subindex"
            :route="subitem.path"
            :index="subitem.path"
            v-if="!subitem.items"
          >{{subitem.text}}</el-menu-item>
          <!-- 菜单栏有三级菜单 -->
          <el-submenu
            v-for="(subitem, subindex) in item.itemGroup"
            :key="subindex"
            :index="subitem.path"
            v-if="subitem.items">
            <!-- 第三项分组标题 -->
            <template slot="title">{{subitem.text}}</template>
            <!-- 第三项分组的items -->
            <el-menu-item
              v-for="(s_subitem, s_subindex) in subitem.items"
              :key="s_subindex"
              :route="s_subitem.path"
              :index="s_subitem.path"
            >{{s_subitem.text}}</el-menu-item>
          </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {

  data () {
    return {
      openeds: []
    }
  },

  watch: {
    // 监听路由变化
    $route (to, from) { // 页面刷新后，也依然要保持菜单栏的点击和展开状态
      this.setMenulist(to)
    }
  },
  computed: {
    ...mapGetters([
      'menuList',
      'isCollapse'
    ])
  },

  created () {
    this.setMenulist(this.$route)
  },

  methods: {
    // 设置菜单栏
    setMenulist (route) {
      let _this = this
      if (route.matched[0].path !== '') {
        // 多页面菜单栏
        this.openeds = [route.matched[0].path]
        this.active = route.fullPath.split('?')[0] // 携带参数时，只匹配"?"前的路径
      } else if (route.matched[1].path !== '') {
        // 单页面菜单栏
        this.openeds = [route.matched[0].path]
        this.active = route.fullPath.split('?')[0] // 携带参数时，只匹配"?"前的路径
      } else {
        this.$nextTick(() => {
          _this.active = ''
          _this.openeds = ['']
          _this.$refs.menuchild.close(_this.active);
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .menu {
    height: 100%;
    .el-menu {
      height: 100%;
      border: 0;
    }
    .el-menu-vertical-demo {
      color: #303133;
    }
    .el-menu-item {
      box-sizing: border-box;
      border-left: 5px solid transparent;
    }
    .el-menu-item.is-active {
      border-left: 5px solid #409EFF;
    }
    .el-menu-admin:not(.el-menu--collapse) {
      width: 180px;
      /*max-height: 400px;*/
    }
  }
</style>
