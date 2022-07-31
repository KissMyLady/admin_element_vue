import { asyncRoutes, constantRoutes } from '@/router'


//判断用户是否拥有此菜单
function hasPermission(menus, route) {
  //如果这个路由有menu属性,就需要判断用户是否拥有此menu权限
  if (route.menu) {
    let judge =  menus.indexOf(route.menu);
    return judge > -1;
  } else {
    return true
  }
}

function filterAsyncRouter(asyncRouterMap, menus) {

  //路由校验
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
  });
  return accessedRouters
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
    return new Promise(resolve => {
      const menus = roles.menuList;
      //筛选出本角色可用的路由
      let accessedRouters = filterAsyncRouter(asyncRoutes, menus)
      //执行设置路由的方法
      commit('SET_ROUTES', accessedRouters)
      resolve()
    });

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
