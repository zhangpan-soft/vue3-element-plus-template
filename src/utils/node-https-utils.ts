import { v4 as uuidv4 } from 'uuid'
import LoggerUtils from '@/utils/logger-utils'
import * as querystring from 'querystring'
import ObjectUtils from '@/utils/object-utils'
import CookieUtils from '@/utils/cookie-utils'
import { HttpsProxyAgent } from 'https-proxy-agent'
import $url from 'url'
import * as http from 'http'
import * as https from 'https'
import * as zlib from 'zlib'

const requestInterceptors: IHttpInterceptor[] = []
const responseInterceptors: IHttpInterceptor[] = []

const addGlobalRequestInterceptor = (interceptor: IHttpInterceptor) => {
  requestInterceptors.push(interceptor)
}

const addGlobalResponseInterceptor = (interceptor: IHttpInterceptor) => {
  responseInterceptors.push(interceptor)
}

const removeGlobalRequestInterceptor = (interceptor: IHttpInterceptor) => {
  requestInterceptors.splice(requestInterceptors.indexOf(interceptor), 1)
}

const removeGlobalResponseInterceptor = (interceptor: IHttpInterceptor) => {
  responseInterceptors.splice(responseInterceptors.indexOf(interceptor), 1)
}

class HttpRequestBuilder implements IHttpUri, IHttpParam, IHttpBody, IHttpRequestBuilder {
  readonly options: IHttpRequestOptions

  constructor() {
    this.options = {
      requestConfig: {
        timeout: 5000,
        autoRedirect: false
      },
      params: {},
      contentType: 'application/x-www-form-urlencoded',
      parts: {},
      cookies: {},
      headers: {},
      requestInterceptors: ([] as IHttpInterceptor[]).concat(requestInterceptors),
      responseInterceptors: ([] as IHttpInterceptor[]).concat(responseInterceptors)
    }
  }

  get(url: string): IHttpParam {
    this.options.method = 'GET'
    this.options.url = url
    return this
  }

  post(url: string): IHttpBody {
    this.options.method = 'POST'
    this.options.url = url
    return this
  }

  delete(url: string): IHttpParam {
    this.options.method = 'DELETE'
    this.options.url = url
    return this
  }

  put(url: string): IHttpBody {
    this.options.method = 'PUT'
    this.options.url = url
    return this
  }

  head(url: string): IHttpParam {
    this.options.method = 'HEAD'
    this.options.url = url
    return this
  }

  patch(url: string): IHttpBody {
    this.options.method = 'PATCH'
    this.options.url = url
    return this
  }

  params(nameValues?: Record<string, any>): IHttpRequestBuilder {
    if (!nameValues) return this
    for (const nameValuesKey in nameValues) {
      this.options.params[nameValuesKey] = nameValues[nameValuesKey]
    }
    return this
  }

  json(json: string): IHttpRequestBuilder
  json(json: Record<string, any>): IHttpRequestBuilder
  json(json: any): IHttpRequestBuilder
  json(): IHttpRequestBuilder
  json(json?: string | Record<string, any> | any): IHttpRequestBuilder {
    this.options.contentType = 'application/json'
    if (!json) {
      return this
    }
    if (typeof json === 'string') {
      const _: Record<string, any> = JSON.parse(json)
      for (const x in _) {
        this.options.parts[x] = _[x]
      }
      return this
    }
    if (typeof json === 'object') {
      for (const x in json) {
        this.options.parts[x] = json[x]
      }
      return this
    }
    return this
  }

  param(name: string, value: any): IHttpBody
  param(): IHttpRequestBuilder

  param(name?: string, value?: any): IHttpBody | IHttpRequestBuilder {
    if (!name) return this
    this.options.params[name] = value
    return this
  }

  part(name: string, value: any): IHttpBody
  part(contentType?: IContentType): IHttpRequestBuilder
  part(name?: string | IContentType, value?: any): IHttpBody | IHttpRequestBuilder {
    if (!name) {
      this.options.contentType = 'application/x-www-form-urlencoded'
      return this
    }
    if (!value && (name === 'application/x-www-form-urlencoded' || name === 'application/json')) {
      this.options.contentType = name
      return this
    }
    this.options.parts[name] = value
    return this
  }

  parts(nameValues?: Record<string, any>): IHttpRequestBuilder {
    if (!nameValues) return this
    for (const nameValuesKey in nameValues) {
      this.options.parts[nameValuesKey] = nameValues[nameValuesKey]
    }
    return this
  }

  autoRedirect(): IHttpRequestBuilder {
    this.options.requestConfig.autoRedirect = true
    return this
  }

  build(): IHttpRequest {
    return new HttpRequest(this.options)
  }

  cookie(name: string, value: string): IHttpRequestBuilder {
    this.options.cookies[name] = value
    return this
  }

  cookies(cookies: Record<string, string>): IHttpRequestBuilder {
    for (const cookiesKey in cookies) {
      this.options.cookies[cookiesKey] = cookies[cookiesKey]
    }
    return this
  }

  header(name: string, value: string): IHttpRequestBuilder {
    this.options.headers[name.trim().toLowerCase()] = value
    return this
  }

  headers(headers: Record<string, string>): IHttpRequestBuilder {
    for (const headersKey in headers) {
      this.header(headersKey, headers[headersKey])
    }
    return this
  }

  proxy(proxy: IHttpProxy): IHttpRequestBuilder {
    this.options.proxy = proxy
    return this
  }

  referer(referer: string): IHttpRequestBuilder {
    this.options.headers['referer'] = referer
    return this
  }

  requestConfig(config: IHttpRequestConfig): IHttpRequestBuilder {
    this.options.requestConfig = config
    return this
  }

  userAgent(userAgent: string): IHttpRequestBuilder {
    this.options.headers['user-agent'] = userAgent
    return this
  }

  addRequestInterceptor(interceptor: IHttpInterceptor): IHttpRequestBuilder {
    this.options.requestInterceptors.push(interceptor)
    return this
  }

  addResponseInterceptor(interceptor: IHttpInterceptor): IHttpRequestBuilder {
    this.options.responseInterceptors.push(interceptor)
    return this
  }
}

const defaultRequestInterceptor: IHttpInterceptor = (
  request: IHttpRequest,
  response: IHttpResponse
) => {
  if (request.options.contentType !== null) {
    request.options.headers['content-type'] = request.options.contentType
  }
}

class HttpRequest implements IHttpRequest {
  readonly options: IHttpRequestOptions
  private readonly httpResponse: HttpResponse
  constructor(options: IHttpRequestOptions) {
    this.options = options
    this.httpResponse = new HttpResponse()
    this.options.requestInterceptors.push(defaultRequestInterceptor)
    if (this.options.requestInterceptors.length > 0) {
      this.options.requestInterceptors.forEach((interceptor) => {
        interceptor(this, this.httpResponse)
      })
    }
  }

  private request(
    requestId: string,
    url: string,
    method: IHttpMethod,
    params: Record<string, any>,
    parts: Record<string, any>,
    headers: Record<string, string>,
    cookies: Record<string, string>,
    requestConfig: IHttpRequestConfig,
    proxy: IHttpProxy | undefined,
    resolve: any,
    reject: any
  ): void {
    try {
      LoggerUtils.debug(
        `request-${requestId}`,
        url,
        method,
        params,
        parts,
        headers,
        cookies,
        requestConfig
      )
      // 处理url参数
      if (Object.keys(params).length > 0) {
        const ss = url.split('?')
        if (ss.length <= 1) url += '?' + querystring.stringify(params)
        else if (ss[1].length > 0) url += `?${ss[1]}&` + querystring.stringify(params)
      }

      // 如果cookies不为空, 则直接将cookies放入header
      if (Object.keys(cookies).length > 0) {
        // 如果headers中不存在cookie, 则直接将cookies放入headers
        if (ObjectUtils.isEmpty(headers['cookie'])) {
          headers['cookie'] = CookieUtils.serialize(cookies)
        } else {
          const _ = CookieUtils.parse(headers)
          _.set(cookies)
          headers['cookie'] = CookieUtils.serialize(_)
        }
      }

      // 处理agent
      let agent: HttpsProxyAgent<any> | boolean = false
      if (!ObjectUtils.isEmpty(proxy)) {
        if (!ObjectUtils.isEmpty(proxy?.username) && !ObjectUtils.isEmpty(proxy?.password)) {
          agent = new HttpsProxyAgent(
            `http://${proxy?.username}:${proxy?.password}@${proxy?.host}:${proxy?.port}`
          )
        } else {
          agent = new HttpsProxyAgent(`http://${proxy?.host}:${proxy?.port}`)
        }
      }

      // 定义请求
      let apiRequest = null
      const requestOptions: http.RequestOptions = $url.parse(url)
      requestOptions.agent = agent
      requestOptions.method = method
      requestOptions.headers = headers
      requestOptions.timeout = requestConfig.timeout
      if (requestOptions.protocol === 'https') {
        apiRequest = https
      } else if (requestOptions.protocol === 'http') {
        apiRequest = http
      }

      if (ObjectUtils.isEmpty(apiRequest)) {
        return resolve(this.httpResponse.error(new Error('http request error')))
      }
      const contentType = headers['content-type']
      const request = apiRequest?.request(requestOptions, (response: http.IncomingMessage) => {
        this.httpResponse.headers(response.headers as Record<string, string>)
        this.httpResponse.status(response.statusCode || 0)
        let data: any = []
        response.on('error', (err: Error) => {
          resolve(this.httpResponse.error(err))
        })
        response.on('end', () => {
          try {
            // 拼接数据体
            data = ObjectUtils.concat(data)
            if (
              !ObjectUtils.isEmpty(response.headers['content-encoding']) &&
              response.headers['content-encoding'] === 'gzip'
            ) {
              data = zlib.gunzipSync(data)
            }
            // 将二进制放入返回体
            this.httpResponse.content(data)
            // 处理302重定向
            if (this.httpResponse.status() === 302 && this.options.requestConfig.autoRedirect) {
              this.request(
                requestId,
                response.headers.location as string,
                method,
                {},
                {},
                headers,
                this.httpResponse.cookies(),
                requestConfig,
                proxy,
                resolve,
                reject
              )
            } else {
              if (responseInterceptors.length > 0) {
                for (const interceptor of responseInterceptors) {
                  interceptor(this, this.httpResponse)
                }
              }
              resolve(this.httpResponse)
            }
          } catch (e) {
            resolve(this.httpResponse.error(e))
          }
        })
        response.on('data', (chunk: Buffer) => {
          data.push(chunk)
        })
      })
      request?.on('error', (err: Error) => {
        resolve(this.httpResponse.error(err))
      })
      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        if (contentType && contentType.indexOf('application/json') > -1) {
          request?.end(JSON.stringify(parts))
        } else if (contentType && contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          request?.end(querystring.stringify(parts))
        } else {
          throw new Error('unsupported content type')
        }
      }
      request?.end()
    } catch (e) {
      resolve(this.httpResponse.error(e))
    }
  }

  doRequest(): Promise<IHttpResponse> {
    return new Promise<IHttpResponse>((resolve: any, reject: any) => {
      this.request(
        uuidv4(),
        this.options.url as string,
        this.options.method as IHttpMethod,
        this.options.params,
        this.options.parts,
        this.options.headers,
        this.options.cookies,
        this.options.requestConfig,
        this.options.proxy,
        resolve,
        reject
      )
    })
  }
}

class HttpResponse implements IHttpResponse {
  private __content__?: Buffer
  private __cookies__: Record<string, string> = {}
  private __headers__: Record<string, any> = {}
  private __error__?: any
  private __requestUrls__: string[] = []
  private __status__ = 0

  firstHeader(name: string): string {
    if (ObjectUtils.isEmpty(name)) return ''
    const header = this.header(name)
    if (typeof header === 'string') return header
    if (Array.isArray(header)) {
      if (header.length > 0) return header[0]
      return ''
    }
    return header.toString()
  }

  lastHeader(name: string): string {
    if (ObjectUtils.isEmpty(name)) return ''
    const header = this.header(name)
    if (typeof header === 'string') return header
    if (Array.isArray(header)) {
      if (header.length > 0) return header[header.length - 1]
      return ''
    }
    return header.toString()
  }

  body(): any {
    return JSON.parse(this.stringify())
  }

  content(content: Buffer): HttpResponse
  content(): Buffer
  content(content?: Buffer): Buffer | HttpResponse {
    if (!content) {
      return this.__content__ || Buffer.alloc(0)
    }
    this.__content__ = content
    return this
  }

  cookies(): Record<string, string> {
    this.__cookies__ = CookieUtils.parse(this.__headers__)
    return this.__cookies__
  }

  error(): any
  error(error: any): HttpResponse
  error(error?: any): any | HttpResponse {
    if (!error) return this.__error__
    this.__error__ = error
    return this
  }

  hasContent(): boolean {
    if (!this.__content__) return false
    return this.__content__ && this.__content__.length > 0
  }

  hasError(): boolean {
    return this.__error__
  }

  headers(): Record<string, any>
  headers(headers: Record<string, any>): HttpResponse
  headers(headers?: Record<string, any>): Record<string, any> | HttpResponse {
    if (!headers) return this.__headers__
    // 遍历
    for (const headersKey in headers) {
      // 获取已缓存的值
      const _ = this.__headers__[headersKey.toLowerCase()]
      // 如果为空, 则将新的值赋值给
      if (ObjectUtils.isEmpty(_)) {
        this.__headers__[headersKey.toLowerCase()] = headers[headersKey]
        continue
      }
      // 否则, 如果_不为数组, 重置为数组
      if (!Array.isArray(_)) {
        this.__headers__[headersKey.toLowerCase()] = [_]
      }
      // 如果新值为数组,则合并数组
      if (Array.isArray(headers[headersKey])) {
        this.__headers__[headersKey.toLowerCase()] = this.__headers__[
          headersKey.toLowerCase()
        ].concat(headers[headersKey])
      } else {
        this.__headers__[headersKey.toLowerCase()].push(headers[headersKey])
      }
    }
    return this
  }

  isSuccess(): boolean {
    return this.status() >= 200 && this.status() < 300
  }

  requestUrls(url: string): HttpResponse
  requestUrls(): string[] | string
  requestUrls(url?: string): string[] | HttpResponse | string {
    if (!url) {
      if (this.__requestUrls__.length === 1) {
        return this.__requestUrls__[0]
      }
      if (this.__requestUrls__.length === 0) {
        return ''
      } else {
        return this.__requestUrls__
      }
    }
    this.__requestUrls__.push(url)
    return this
  }

  status(status: number): HttpResponse
  status(): number
  status(status?: number): number | HttpResponse {
    if (status === undefined) return this.__status__
    this.__status__ = status
    return this
  }

  stringify(): string {
    return this.content().toString()
  }

  cookie(name: string): string {
    return this.__cookies__[name] || ''
  }

  header(name: string, value: any): HttpResponse
  header(name: string): any
  header(name: string, value?: any): string | HttpResponse {
    name = name.trim().toLowerCase()
    if (!value) return this.__headers__[name]
    this.__headers__[name] = value
    return this
  }
}

const get = (url: string) => new HttpRequestBuilder().get(url)
const post = (url: string) => new HttpRequestBuilder().post(url)
const put = (url: string) => new HttpRequestBuilder().put(url)
const del = (url: string) => new HttpRequestBuilder().delete(url)
const head = (url: string) => new HttpRequestBuilder().head(url)
const patch = (url: string) => new HttpRequestBuilder().patch(url)

export {
  get,
  post,
  put,
  del,
  head,
  patch,
  addGlobalRequestInterceptor,
  addGlobalResponseInterceptor,
  removeGlobalRequestInterceptor,
  removeGlobalResponseInterceptor
}

export default {
  get,
  post,
  put,
  del,
  head,
  patch,
  addGlobalRequestInterceptor,
  addGlobalResponseInterceptor,
  removeGlobalRequestInterceptor,
  removeGlobalResponseInterceptor
}
