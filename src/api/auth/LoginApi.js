import request from '@/utils/request'


export function api_login(data) {
  return request({
    url: '/login/auth',
    method: 'post',
    data
  });
}

export function getInfo(data) {
  return request({
    url: '/login/getInfo',
    method: 'post',
    data
  });
}
