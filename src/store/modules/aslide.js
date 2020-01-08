/**
 * @description 侧边栏状态库
 * @author
 */
export default {
  state: {
    isCollapse: false,
    menuList: [
      {
        'text': '概况',
        'path': '',
        'icon': 'el-icon-c-scale-to-original',
        'itemGroup': [
          {
            'text': '概况数据',
            'path': '/index'
          }
        ]
      },
      {
        'text': '菜单',
        'path': 'menu',
        'icon': 'el-icon-s-operation',
        'itemGroup': [
          {
            'text': '菜单列表',
            'path': '/menu_list'
          }
        ]
      },
      {
        'text': '文章',
        'path': 'article',
        'icon': 'el-icon-document',
        'itemGroup': [
          {
            'text': '文章列表',
            'path': '/article_list'
          },
          {
            'text': '文章详情',
            'path': '/article_detail'
          }
        ]
      },
      {
        'text': '工单管理',
        'path': 'detectionOrder',
        'icon': 'el-icon-document',
        'itemGroup': [
          {
            'text': '检测单录入',
            'path': '/detectionOrderInput'
          },
          {
            'text': '待检测工单',
            'path': '/detectionOrderList'
          },
          {
            'text': '待上传照片',
            'path': '/detectionImgUpload'
          },
          {
            'text': '待编辑报告',
            'path': '/detectionOrderEdit'
          }
        ]
      }
    ]
  },
  mutations: {
    changeCollapse (state) {
      state.isCollapse = state.isCollapse === false
    }
  }
}
