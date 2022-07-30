import { asyncRoutes, constantRoutes } from '@/router'


//判断用户是否拥有此菜单
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }

  //如果这个路由有menu属性,就需要判断用户是否拥有此menu权限
  // if (route.menu) {
  //   let menus = route;
  //   return menus.indexOf(route.menu) > -1;
  // } else {
  //   return true
  // }


}


export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes;

      //默认就是admin
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    });

    // let userPermission = roles;
    // return new Promise(resolve => {
    //   const menus = userPermission.menuList;
    //   //声明 该角色可用的路由
    //   let accessedRouters
    //   //筛选出本角色可用的路由
    //   accessedRouters = filterAsyncRoutes(asyncRoutes, menus)
    //   //执行设置路由的方法
    //   commit('SET_ROUTES', accessedRouters)
    //   resolve()
    // })


  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
