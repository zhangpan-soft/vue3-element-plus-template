import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo, tagsView, layout } = defaultSettings

const state = {
  showSettings,
  fixedHeader,
  sidebarLogo,
  tagsView,
  layout
}

const mutations = {
  CHANGE_SETTING: (state: any, { key, value }: any) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }: any, data: any) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
