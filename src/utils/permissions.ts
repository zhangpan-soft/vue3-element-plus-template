import ObjectUtils from '@/utils/object-utils'
import store from '@/store'
export default (permission: string): boolean => {
  // 如果permission为空, 则直接返回true
  if (ObjectUtils.isEmpty(permission)) return true
  // 获取权限列表
  const permissions = store.getters.permissions
  // 如果权限列表为空, 则返回false
  if (ObjectUtils.isEmpty(permissions)) return false
  // 遍历权限
  for (const permissionsKey in permissions) {
    // 如果当前遍历的权限为空, 则跳过
    if (ObjectUtils.isEmpty(permissions[permissionsKey])) continue
    const _ = permissions[permissionsKey]
    // 如果当前遍历的权限等于目标权限, 则返回true
    if (_ === permission) return true
    // 拼接正则表达式
    const ss = _.split(':')
    let reg = '^'
    for (const ssKey in ss) {
      const s = ss[ssKey]
      // ^([0-9a-zA-Z]+)([:]{0,1}[0-9a-zA-Z]+[:]{0,1})([0-9a-zA-Z]+)$
      if (s === '*') {
        reg += '([0-9a-zA-Z]+)'
      } else if (s === '**') {
        reg += '([:]{0,1}[0-9a-zA-Z]+[:]{0,1})'
      } else {
        reg += s
      }
    }
    // 拼接结束符
    reg += '$'
    // 匹配
    if ((permission as string).match(new RegExp(reg))) {
      return true
    }
  }
  return false
}
