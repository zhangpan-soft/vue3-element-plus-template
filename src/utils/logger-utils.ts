const isDev = process.env.NODE_ENV === 'development'

const debug = (message?: any, ...data: any): void => {
  if (isDev) {
    console.log(message, ...data)
  }
}

const log = (message?: any, ...data: any): void => {
  console.log(message, ...data)
}

const info = (message?: any, ...data: any): void => {
  console.info(message, ...data)
}

const error = (message?: any, ...data: any): void => {
  console.error(message, ...data)
}

const warn = (message?: any, ...data: any): void => {
  console.warn(message, ...data)
}

export default {
  debug,
  log,
  info,
  error,
  warn
}
