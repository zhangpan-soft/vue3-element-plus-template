import request from '@/utils/request'

export function getList(params: any) {
  return request({
    url: '/vue3-admin-template/table/list',
    method: 'get',
    params
  })
}
