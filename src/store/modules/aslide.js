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
          },
          {
            'text': '待审核报告',
            'path': '/detectionOrderAudit'
          },
          {
            'text': '治疗单确认',
            'path': '/detectionOrderTreat'
          },
          {
            'text': '待复查工单',
            'path': '/detectionOrderReview'
          },
          {
            'text': '复查照片上传',
            'path': '/detectionOrderReviewImg'
          },
          {
            'text': '复查报告编辑',
            'path': '/detectionOrderReviewEdit'
          },
          {
            'text': '复查报告待审',
            'path': '/detectionOrderReviewAudit'
          },
          {
            'text': '完成工单列表',
            'path': '/detectionOrderFinsh'
          },
          {
            'text': '冻结工单列表',
            'path': '/detectionOrderFreeze'
          },
          {
            'text': '废弃工单列表',
            'path': '/detectionOrderAbandon'
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
      }
    ]
  },
  mutations: {
    changeCollapse (state) {
      state.isCollapse = state.isCollapse === false
    }
  }
}
