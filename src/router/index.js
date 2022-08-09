import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'


//默认路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
        menu: 'dashboard'
      }
    ]
  },
]


//异步, admin角色的路由
export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/article',
    name: '功能模块',
    meta: {title: '功能模块', icon: 'tree'},
    children: [
     {
        path: 'article',
        name: '文章',
        component: () => import('@/views/article/article'),
        meta: {title: '文章', icon: 'list'},
        menu: 'article'
      },
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/example/list'),
        meta: { title: '按钮权限demo', icon: 'list' },
        menu: "option"
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '',
    meta: {title: '用户权限', icon: 'table'},
    children: [
      {
        path: '',
        name: '用户列表',
        component: () => import('@/views/user/user'),
        meta: { title: '用户列表', icon: 'peoples' },
        menu: "option"
      },
      {
        path: 'role',
        name: '角色权限',
        component: () => import('@/views/user/role'),
        meta: { title: '角色权限', icon: 'lock' },
        menu: "option"
      },
      {
        path: 'permission',
        name: '菜单权限',
        component: () => import('@/views/user/sys_permission'),
        meta: { title: '菜单权限', icon: 'lock' },
        menu: "option"
      }
    ]
  },

  // 404页必须放在最底部
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
