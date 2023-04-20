import { constantRoutes } from '@/router'
const Layout = () => import('@/layout')
const component = file => require('@/views' + file + '/index.vue').default
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(roles) {
  for (let i = 0; i < roles.length; i++) {
    // roles[i].meta.roles = ['admin']
    // if(i%3==0) {
    //   roles[i].roles = ['person']
    // }

    if (roles[i].component === 'Layout') {
      roles[i].component = Layout
    } else {
      roles[i].component = component(roles[i].component)
    }
    if (Array.isArray(roles[i].children) && roles[i].children.length > 0) {
      filterAsyncRoutes(roles[i].children)
    }

    // if (roles[i].component === 'Layout') {
    //   roles[i].component = Layout
    // } else {
    //   roles[i].component = component(roles[i].component)
    // }
    // if (Array.isArray(roles[i].children) && roles[i].children.length > 0) {
    //   filterAsyncRoutes(roles[i].children)
    // }
  }
  // console.log('AAA', roles)
  return roles
}

const state = {
  routes: [],
  addRoutes: [],
  addUrl: ''
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ADDURL: (state, addUrl) => {
    state.addUrl = addUrl
    // localStorage.setItem('firstNodeUrl', addUrl)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
