import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

const _import = file => () => import('@/pages/' + file + '.vue')
const _import_ = file => () => import('@/components/' + file + '.vue')

// const asyncRouterMap = []

const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: _import('login/index')
  },
  {
    path: '/',
    name: '概况',
    component: _import_('commons/Layout'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: '总览',
        component: _import('home/index'),
        meta: {
          isAlive: true,
          auth: false,
          title: '概况数据'
        }
      }
    ]
  },
  {
    path: 'menu',
    name: '菜单',
    component: _import_('commons/Layout'),
    redirect: '/menu_list',
    children: [
      {
        path: '/menu_list',
        name: '菜单列表',
        component: _import('menu/index'),
        meta: {
          auth: false,
          isAlive: true,
          title: '菜单列表'
        }
      }
    ]
  },
  {
    path: 'article',
    name: '文章',
    component: _import_('commons/Layout'),
    redirect: '/article_list',
    children: [
      {
        path: '/article_list',
        name: '文章列表',
        component: _import('article/lists'),
        meta: {
          auth: false,
          isAlive: true,
          title: '文章列表'
        }
      },
      {
        path: '/article_detail',
        name: '文章详情',
        component: _import('article/detail'),
        meta: {
          auth: false,
          isAlive: true,
          title: '文章详情'
        }
      }
    ]
  },
  {
    path: 'detectionOrder',
    name: '工单管理',
    component: _import_('commons/Layout'),
    redirect: '/detectionOrderInput',
    children: [
      {
        path: '/detectionOrderInput',
        name: '检测单录入',
        component: _import('detectionOrder/detectionOrderInput'),
        meta: {
          auth: false,
          isAlive: true,
          title: '检测单录入'
        }
      },
      {
        path: '/detectionOrderList',
        name: '待检测工单',
        component: _import('detectionOrder/detectionOrderList'),
        meta: {
          auth: false,
          isAlive: true,
          title: '待检测工单'
        }
      },
      {
        path: '/detectionImgUpload',
        name: '待上传照片',
        component: _import('detectionOrder/detectionImgUpload'),
        meta: {
          auth: false,
          isAlive: true,
          title: '待上传照片'
        }
      },
      {
        path: '/detectionOrderEdit',
        name: '待编辑报告',
        component: _import('detectionOrder/detectionOrderEdit'),
        meta: {
          auth: false,
          isAlive: true,
          title: '待编辑报告'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: _import('error/index'),
    meta: {
      title: '请求页面未找到'
      // auth: false
    }
  },
  {
    path: '*',
    meta: {
      title: '请求页面未找到'
      // auth: false
    },
    redirect: '/404'
  }
]

const router = new Router({
  mode: 'history',
  routes: constantRouterMap,
  linkActiveClass: 'router-link-active'
})

export default router
