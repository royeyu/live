import { login, logout, threeLogin } from '@/api/user'
import { getToken, setToken, removeToken, removeNodeUrl } from '@/utils/auth'
import { resetRouter } from '@/router'
import { userGetUserInfoByToken } from '@/api/system'
import store from '@/store'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    menu: [],
    type: '',
    id: '',
    cust: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_CUST: (state, data) => {
    state.cust = data
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password, code, uuid } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password, code: code, uuid: uuid }).then(response => {
  //       const data = response.data
  //       commit('SET_TOKEN', data.access_token)
  //       setToken(data.access_token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user login  2022-05-06 改
  login({ commit }, data) {
    // const { encodeStr, code, uuid,phoneCode } = userInfo
    return new Promise((resolve, reject) => {
      login(data).then(response => {
        const data = response.data
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 第三方登录
  authlogin({ commit }, userInfo) {
    const { encodeStr, code } = userInfo
    // console.log(userInfo)
    return new Promise((resolve, reject) => {
      threeLogin({ encodeStr: encodeStr, code: code }).then(response => {
        const data = response.data
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      userGetUserInfoByToken().then(response => {
        const { data } = response
        // console.log(data)
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { username } = data
        commit('SET_NAME', username)
        const { userType } = data
        commit('SET_TYPE', userType)
        const { id } = data
        commit('SET_ID', id)
        const { custSrc } = data
        commit('SET_CUST', custSrc)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        store.commit('permission/SET_ADDURL', '')
        localStorage.clear()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // 第三方登录前，重置已登录信息
  authloginReset({ commit }){
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      resetRouter()
      store.commit('permission/SET_ADDURL', '')
      localStorage.clear()
      commit('RESET_STATE')
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

