import request from "@/utils/request";


//1, 增
export function api_sys_permission_add(data) {
  return request({
    url: '/sysPermissionCtrl/sys_permission/add',
    method: 'post',
    data
  });
}
export function api_sys_permission_delete(data) {
  return request({
    url: '/sysPermissionCtrl/sys_permission/delete',
    method: 'post',
    data
  });
}
export function api_sys_permission_change(data) {
  return request({
    url: '/sysPermissionCtrl/sys_permission/change',
    method: 'post',
    data
  });
}
export function api_sys_permission_list(data) {
  return request({
    url: '/sysPermissionCtrl/sys_permission/list',
    method: 'post',
    data
  });
}
