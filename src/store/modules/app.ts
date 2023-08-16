import defaultSettings from '@/settings'
import { zhCn, en } from 'element-plus/es/locale/index'
import { SidebarStatusKey } from '@/store/names'

const state: any = {
  sidebar: {
    opened: localStorage.getItem(SidebarStatusKey) !== 'closed',
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
      localStorage.setItem(SidebarStatusKey, 'opened')
    } else {
      localStorage.setItem(SidebarStatusKey, 'closed')
    }
  },
  CLOSE_SIDEBAR: (state: any, withoutAnimation: boolean) => {
    localStorage.setItem(SidebarStatusKey, 'opened')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: any, device: string) => {
    state.device = device
  },
  OPEN_SIDEBAR: (state: any, withoutAnimation: boolean) => {
    localStorage.setItem(SidebarStatusKey, 'closed')
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
