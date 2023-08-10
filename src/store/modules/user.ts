import { login, logout, getInfo, getPermissions } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    permissions: localStorage.getItem('permissions')
      ? JSON.parse(localStorage.getItem('permissions') as string)
      : []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state: any) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state: any, token: string) => {
    state.token = token
  },
  SET_NAME: (state: any, name: string) => {
    state.name = name
  },
  SET_AVATAR: (state: any, avatar: string) => {
    state.avatar = avatar
  },
  SET_PERMISSIONS: (state: any, permissions: string[]) => {
    debugger
    state.permissions = permissions
    localStorage.setItem('permissions', JSON.stringify(permissions))
  }
}

const actions = {
  // user login
  login({ commit }: any, userInfo: any) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          getPermissions(data.token).then((response) => {
            commit('SET_PERMISSIONS', response.data)
            resolve(data.token)
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }: any) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response

          if (!data) {
            return reject('Verification failed, please Login again.')
          }

          const { name, avatar } = data

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }: any) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          commit('SET_PERMISSIONS', [])
          resolve('')
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }: any) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve('')
    })
  },

  setPermissions({ commit }: any, permissions: string[]) {
    commit('SET_PERMISSIONS', permissions)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
