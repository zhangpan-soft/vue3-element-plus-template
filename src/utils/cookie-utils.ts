import ObjectUtils from '@/utils/object-utils'
import Logger from '@/utils/logger-utils'

const parse = (headers: Record<string, any>): Record<string, any> => {
  if (ObjectUtils.isEmpty(headers)) return {}
  const cookies = {}
  const setCookies = headers['set-cookie']
  if (setCookies !== undefined && setCookies !== null) {
    for (const cookiesKey in setCookies) {
      const split = setCookies[cookiesKey].split(';')
      const nameValue = split[0].split('=')
      const name = nameValue[0]
      let value = ''
      if (nameValue.length > 1) {
        value = nameValue[1]
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cookies[name] = value
    }
  }
  const cookies_ = headers['cookie']
  if (!ObjectUtils.isEmpty(cookies_)) {
    const split = cookies_.split(';')
    for (const splitKey in split) {
      const nameValue = split[splitKey].split('=')
      const name = nameValue[0]
      let value = ''
      if (nameValue.length > 1) {
        value = nameValue[1]
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cookies[name] = value
    }
  }
  return cookies
}
const serialize = (cookies: Record<string, any>): string => {
  if (ObjectUtils.isEmpty(cookies)) return ''
  Logger.info('CookieUtils#serialize:', cookies)
  let _c = ''
  for (const cookiesKey in cookies) {
    _c += cookiesKey + '=' + cookies[cookiesKey] + '; '
  }
  _c = _c.trim()
  _c = _c.substring(0, _c.length - 1)
  Logger.info(`CookieUtils#serialize:${_c}`)
  return _c
}

export default {
  parse,
  serialize
}
