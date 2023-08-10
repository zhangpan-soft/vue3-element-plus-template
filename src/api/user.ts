import request from '@/utils/request'
export function login(data: any) {
  return request({
    url: '/vue3-admin-template/user/login',
    method: 'post',
    data
  })
}
export function getInfo(token: string) {
  return request({
    url: '/vue3-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}
export function logout(token: string) {
  return request({
    url: '/vue3-admin-template/user/logout',
    method: 'post',
    params: { token }
  })
}

export function getPermissions(token: string) {
  return request({
    url: '/vue3-admin-template/user/permission/list',
    method: 'get',
    params: { token }
  })
}
