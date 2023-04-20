import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { menuGetUserPermissionByToken } from '@/api/system'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/retrievePassWord', '/authlogin'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  next()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  // if (to.path === '/retrievePassWord') {
  //   next()
  // } else {
  // console.log(from.path)
  // console.log(to.path)
  // console.log(store.state.user.roles)
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // const roles = to.meta.roles
        // // // 登录后调到首页时，分角色跳转
        // if (to.path == '/Dashboard' && store.state.user.roles == 'admin') {
        //   next()
        //   return
        // }
        // if (to.path == '/Dashboard' && store.state.user.roles == 'person') {
        //   next({ path: '/person/dashboard'})
        //   return
        // }
        // // 先通过角色判断，拦截不属于他的路由
        // if (roles != null && !roles.includes(store.state.user.roles)) {
        //   next({ path: '/404' })
        //   return
        // }
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          const { data = { menu: [] }} = await menuGetUserPermissionByToken()
          const butmenu = JSON.parse(JSON.stringify(data.auth))
          butmenu.filter(item => {
            if (item.action) {
              item.action = item.action.split(':')
              item.name = item.action[0]
              item.butStatus = item.action[1]
            }
            if (item.type === '1') {
              return item
            }
          })
          localStorage.setItem('butMenu', JSON.stringify(butmenu))
          // console.log(data.firstNodeUrl,'api')
          store.commit('permission/SET_ADDURL', data.firstNodeUrl)
          const accessRoutes = await store.dispatch('permission/generateRoutes', data.menu)
          // localStorage.setItem('mentList', JSON.stringify(data.menu))
          // console.log(accessRoutes)
          router.addRoutes(accessRoutes)
          router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
          // next({ ...to, replace: true })
          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
          })
          // 以防个人和企业用户重定向冲突，去除重定向
          // next(`/login?redirect=${to.path}`)
          // next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next(`/login`)
      NProgress.done()
    }
  }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
