import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist


//路由拦截
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done();
    }
    else {
      let roleData = store.getters.roles;
      console.log("获取用户角色a打印: ", roleData);

      const hasRoles = roleData && roleData.length > 0;

      if (hasRoles) {
        next()
      }
      // 本地存储无用户数据, 重新获取用户信息
      else {
        try {
          //admin
          const { roles } = await store.dispatch('user/getInfo')

          //获取路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          //拼接路由
          router.addRoutes(accessRoutes)

          // 将replace设置为true，这样导航将不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  }
  //无token, 用户未登录
  else {
    //路由白名单
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      //登录, 后重定向
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
