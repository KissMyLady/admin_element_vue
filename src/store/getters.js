const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,

  nickname: state => state.user.nickname,
  userId: state => state.user.userId,
  roleIds: state => state.user.roleIds,
  menus: state => state.user.menus,
  permissions: state => state.user.permissions,

  permission_routes: state => state.permission.routes,
  addRouters: state => state.permission.addRoutes,
  errorLogs: state => state.errorLog.logs
}
export default getters
