import { get } from '@/utils/node-https-utils'
import { describe } from 'mocha'
import ObjectUtils from '@/utils/object-utils'

describe('NodeHttpsUtils', () => {
  it('get', () => {
    const res = get('https://www.baidu.com')
      .param()
      .build()
      .doRequest()
      .then((res) => {
        console.log(res)
      })
  })
})

describe('test', () => {
  it('hasPermission', () => {
    const hasPermission = (permission: string): boolean => {
      if (ObjectUtils.isEmpty(permission)) return true
      const permissions = ['*:**:*']
      if (ObjectUtils.isEmpty(permissions)) return false
      for (const permissionsKey in permissions) {
        if (ObjectUtils.isEmpty(permissions[permissionsKey])) continue
        const ss = permissions[permissionsKey].split(':')
        let reg = '^'
        for (const ssKey in ss) {
          const s = ss[ssKey]
          if (s === '*') {
            reg += '[0-9a-zA-Z_]{1,}:'
          } else if (s === '**') {
            reg += '([0-9a-zA-Z_]{1,}:){1,}'
          } else {
            reg += s + ':'
          }
          reg = reg.slice(0, reg.length - 1)
          reg += '$'
          if (permission.match(new RegExp(reg))) {
            return true
          }
        }
      }
      return false
    }
    console.log(hasPermission('a:b:c:d:e:f'))
  })
})
