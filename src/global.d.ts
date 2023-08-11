import { RouteRecordRaw } from 'vue-router'

declare global {
  /**
   * 全局路由定义
   */
  type RouteCustom = RouteRecordRaw & {
    hidden?: boolean // 定义hidden属性, 标记该路由不在侧边栏
    children?: RouteCustom[] // 子路由
    // 定义扩展属性
    meta?: {
      title?: string // 路由标题
      icon?: string // 路由图标
      permission?: string // 路由所需权限
    }
  }

  /**
   * 定义http拦截器
   */
  type IHttpInterceptor = (req: IHttpRequest, res: IHttpResponse) => void

  /**
   * 定义httpuri
   */
  type IHttpUri = {
    get(url: string): IHttpParam
    post(url: string): IHttpBody
    delete(url: string): IHttpParam
    put(url: string): IHttpBody
    head(url: string): IHttpParam
    patch(url: string): IHttpBody
  }

  /**
   *
   */
  type IHttpParam = {
    param(name: string, value: any): IHttpParam
    param(): IHttpRequestBuilder
    params(nameValues?: Record<string, any>): IHttpRequestBuilder
  }

  type IHttpBody = IHttpParam & {
    json(json: string): IHttpRequestBuilder
    json(json: Record<string, any>): IHttpRequestBuilder
    json(json: any): IHttpRequestBuilder
    json(): IHttpRequestBuilder
    param(name: string, value: any): IHttpBody
    param(): IHttpRequestBuilder
    params(nameValues?: Record<string, any>): IHttpRequestBuilder
    parts(nameValues?: Record<string, any>, contentType?: IContentType): IHttpRequestBuilder
    part(name: string, value: any): IHttpBody
    part(contentType?: IContentType): IHttpRequestBuilder
  }

  type IContentType = 'application/json' | 'application/x-www-form-urlencoded'

  type IHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'

  type IHttpRequest = {
    readonly options: IHttpRequestOptions
    doRequest(): Promise<IHttpResponse>
  }

  type IHttpResponse = {
    status(): number
    content(): Buffer
    requestUrls(): string[] | string
    headers(): Record<string, any>
    cookies(): Record<string, string>
    cookie(name: string): string
    header(name: string): any
    firstHeader(name: string): string
    lastHeader(name: string): string
    stringify(): string
    isSuccess(): boolean
    hasContent(): boolean
    hasError(): boolean
    error(): any
    body(): any
  }

  type IHttpRequestBuilder = {
    cookies(cookies: Record<string, string>): IHttpRequestBuilder
    cookie(name: string, value: string): IHttpRequestBuilder
    headers(headers: Record<string, string>): IHttpRequestBuilder
    header(name: string, value: string): IHttpRequestBuilder
    referer(referer: string): IHttpRequestBuilder
    userAgent(userAgent: string): IHttpRequestBuilder
    autoRedirect(): IHttpRequestBuilder
    requestConfig(config: IHttpRequestConfig): IHttpRequestBuilder
    proxy(proxy: IHttpProxy): IHttpRequestBuilder
    build(): IHttpRequest
    addRequestInterceptor(interceptor: IHttpInterceptor): IHttpRequestBuilder
    addResponseInterceptor(interceptor: IHttpInterceptor): IHttpRequestBuilder
  }

  type IHttpRequestConfig = {
    timeout: number
    autoRedirect: boolean
  }

  type IHttpProxy = {
    host: string
    port: number
    username?: string
    password?: string
  }

  type IHttpRequestOptions = {
    proxy?: IHttpProxy
    cookies: Record<string, string>
    headers: Record<string, string>
    url?: string
    method?: IHttpMethod
    requestConfig: IHttpRequestConfig
    params: Record<string, any>
    contentType: IContentType
    parts: Record<string, any>
    requestInterceptors: IHttpInterceptor[]
    responseInterceptors: IHttpInterceptor[]
  }
}
