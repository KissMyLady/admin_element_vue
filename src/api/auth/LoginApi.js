import request from '@/utils/request'


export function api_login(data) {
  return request({
    url: '/login/auth',
    method: 'post',
    data
  });
}

export function api_getInfo(data) {
  return request({
    url: '/login/getInfo',
    method: 'post',
    data
  });
}
