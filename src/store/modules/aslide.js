/**
 * @description 侧边栏状态库
 * @author chaizhiyang
 */
const aslide = {
  state: {
    isCollapse: false,
    menuList: [
      {
        "text": "概况",
        "path": "",
        "icon": "el-icon-c-scale-to-original",
        "itemGroup": [
          {
            "text": "概况数据",
            "path": "/index"
          }
        ]
      },
      {
        "text": "菜单",
        "path": "menu",
        "icon": "el-icon-s-operation",
        "itemGroup": [
          {
            "text": "菜单列表",
            "path": "/menu_list"
          }
        ]
      },
      {
        "text": "文章",
        "path": "article",
        "icon": "el-icon-document",
        "itemGroup": [
          {
            "text": "文章列表",
            "path": "/article_list"
          },
          {
            "text": "详情",
            "path": "/article_detail"
          }
        ]
      }
    ]
  },
  mutations: {
    changeCollapse(state) {
      state.isCollapse = state.isCollapse == false ? true : false
    },
  }
}

export default aslide
