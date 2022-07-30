import request from '@/utils/request'


export function getInfo(data) {
  return request({
    url: '/login/getInfo',
    method: 'post',
    data
  });
}
