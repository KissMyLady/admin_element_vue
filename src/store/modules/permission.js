import { asyncRoutes, constantRoutes } from '@/router'


//判断用户是否拥有此菜单
function hasPermission(roles, route) {
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role))
  // } else {
  //   return true
  // }

  // let menu = route.menu;
  // console.log("判断用户是否拥有此菜单route: ", menu);
  //
  // if (menu) {
  //   return route.indexOf(menu) > -1;
  // } else {
  //   return true
  // }

  return true;
}

function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    //filter,js语法里数组的过滤筛选方法
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        //如果这个路由下面还有下一级的话,就递归调用
        route.children = filterAsyncRouter(route.children, menus)
        //如果过滤一圈后,没有子元素了,这个父级菜单就也不显示了
        return (route.children && route.children.length)
      }
      return true
    }
    return false
  })
  return accessedRouters
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
  routes: [],     //本用户所有的路由,包括了固定的路由和下面的addRouters
  addRoutes: []  ,//本用户的角色赋予的新增的动态路由
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    // return new Promise(resolve => {
    //   let accessedRoutes;
    //   //默认就是admin
    //   console.log("默认就是admin, roles 打印", roles);
    //   if (roles.includes('admin')) {
    //     accessedRoutes = asyncRoutes || []
    //   } else {
    //     accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    //   }
    //   commit('SET_ROUTES', accessedRoutes)
    //   resolve(accessedRoutes)
    // });

    //生成路由
    return new Promise(resolve => {
      const menus = roles.menuList;
      //声明 该角色可用的路由
      let accessedRouters
      //筛选出本角色可用的路由
      accessedRouters = filterAsyncRouter(asyncRoutes, menus)
      //执行设置路由的方法
      console.log("generateRoutes 设置新路由: ", accessedRouters);
      commit('SET_ROUTES', accessedRouters)
      resolve()
    })


  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
