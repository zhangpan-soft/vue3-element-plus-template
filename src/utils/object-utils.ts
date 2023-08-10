class ObjectUtils {
  static isEmpty(target: any) {
    if (target === null || target === undefined) {
      return true
    }
    if (typeof target === 'string') {
      return target.trim().length === 0
    }
    return false
  }

  static concat(target = []) {
    const util = window.require('util')
    if (ObjectUtils.isEmpty(target)) {
      return null
    }

    if (Array.isArray(target)) {
      if (target.length === 0) {
        return ''
      } else {
        if (Buffer.isBuffer(target[0])) {
          return Buffer.concat(target)
        } else if (util.types.isAnyArrayBuffer(target[0])) {
          const _ = []
          for (let i = 0; i < target.length; i++) {
            _.push(Buffer.from(target[i]))
          }
          return Buffer.concat(_)
        } else if (util.types.isUint8Array(target[0])) {
          const _ = []
          for (let i = 0; i < target.length; i++) {
            _.push(Buffer.from(target[i]))
          }
          return Buffer.concat(_)
        } else if (typeof target[0] === 'string') {
          const _ = []
          for (let i = 0; i < target.length; i++) {
            _.push(new Buffer(target[i]))
          }
          return Buffer.concat(_)
        } else {
          let m = ''
          for (let i = 0; i < target.length; i++) {
            m = m.concat((target[i] as any).toString())
          }
        }
      }
    } else {
      return target
    }
  }
}

export default ObjectUtils
