import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import element from '@/plugins/element'
import { mockXHR } from '../mock'
import axios from '@/plugins/axios'
import '@/styles/index.scss'
import icons from '@/plugins/icons'
import i18n from '@/plugins/lang'
import permission from '@/permission'

if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

createApp(App)
  .use(store) // 引入vuex
  .use(element) // 引入element plus 以及 vue图标
  .use(i18n) // 引入国际化
  .use(router) // 引入路由
  .use(permission) // 引入权限, 必须在路由后
  .use(axios) // 引入axios, 可使用全局变量$axios
  .use(icons) // 引入图标
  .mount('#app')
