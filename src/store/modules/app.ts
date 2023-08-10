import Cookies from 'js-cookie'
import defaultSettings from '@/settings'
import { zhCn, en } from 'element-plus/es/locale/index'

const state: any = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') !== 'closed',
    withoutAnimation: false
  },
  device: 'desktop',
  menuUnitOpen: process.env.VUE_MENU_UNIT_OPEN || true,
  language: defaultSettings.language,
  locale: defaultSettings.language === 'en' ? en : zhCn,
  size: defaultSettings.size
}

const mutations = {
  TOGGLE_SIDEBAR: (state: any) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 'opened')
    } else {
      Cookies.set('sidebarStatus', 'closed')
    }
  },
  CLOSE_SIDEBAR: (state: any, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', 'opened')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: any, device: string) => {
    state.device = device
  },
  OPEN_SIDEBAR: (state: any, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', 'closed')
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = withoutAnimation
  }
}

const actions = {
  toggleSideBar({ commit }: any) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }: any, { withoutAnimation }: any) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  openSideBar({ commit }: any, { withoutAnimation }: any) {
    commit('OPEN_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }: any, device: string) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
