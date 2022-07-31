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

  //设置页面标题
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done();
    }

    //拦截
    else {
      let roleData = store.getters.userId;
      if (roleData) {
        next()
      }
      // 本地存储无用户数据, 重新获取用户信息
      else {
        try {
          let sendData = {
            "token": hasToken
          }
          store.dispatch('user/GetInfo', sendData).then(() => {
            next({...to})
          })

          // const { roles } = await store.dispatch('user/getInfo')
          // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // router.addRoutes(accessRoutes)
          // next({ ...to, replace: true })
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
