import request from "@/utils/request";


export function getUserInfo(data) {
  return request({
    url: '/applyEmailCtrl/getUserFullInfo',
    method: 'post',
    data
  });
}

//获取角色(岗位), 返回岗位表, 需要列表权限
export function getGroupApi(data) {
  return request({
    url: '/authGroupCtrl/getGroup',
    method: 'post',
    data
  });
}


//获取单位数据
export function getOrganizationApi(data) {
  return request({
    url: '/authGroupCtrl/getOrganization',
    method: 'post',
    data
  });
}

//获取人员 getUserList
export function getUserListApi(data) {
  return request({
    url: '/authGroupCtrl/getUserList',
    method: 'post',
    data
  });
}
