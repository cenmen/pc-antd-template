// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/profile/basic',
    children: [

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile' },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic'),
            meta: { title: '基础详情页', permission: [ 'profile' ] }
          },
          {
            path: '/profile/option',
            name: 'option',
            component: () => import('@/views/profile/option'),
            meta: { title: '操作记录', keepAlive: true, permission: [ 'option' ] }
          },
        ]
      },
      
      // other
      {
        path: '/author',
        component: PageView,
        meta: { title: '权限管理', icon: 'team', permission: [ 'author' ] },
        redirect: '/author/permission-list',
        children: [
          {
            path: '/author/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/author/PermissionList'),
            meta: { title: '权限列表', keepAlive: true }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'center' ] }
          },
          {
            path: '/account/detail',
            name: 'detail',
            component: () => import('@/views/account/detail'),
            meta: { title: '详细介绍', keepAlive: true, permission: [ 'detail' ] }
          },
        ]
      },
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
  }

]
