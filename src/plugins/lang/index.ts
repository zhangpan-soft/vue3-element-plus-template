import { createI18n } from 'vue-i18n'

// 本地语言包
import enLocale from './package/en'
import zhCnLocale from './package/zh-cn'
import store from '../../store'

const messages = {
  'zh-cn': {
    ...zhCnLocale
  },
  en: {
    ...enLocale
  }
}

const i18n = createI18n({
  legacy: false,
  locale: store.getters.locale,
  messages: messages,
  globalInjection: true
})

export default i18n
