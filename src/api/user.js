import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}
// 忘记密码获取重置验证码
export function forgetPwd(data) {
  return request({
    url: '/auth/forgetPwd',
    method: 'post',
    data: data
  })
}
// 发送验证码重置密码
export function resetPwdByCode(data) {
  return request({
    url: '/auth/resetPwdByCode',
    method: 'post',
    data: data
  })
}
export function code(data) {
  let url = process.env.VUE_APP_WITH_CREDENTIALS == 1 ? '/code' : '/gjdxapi/code'
  return request({
    // 生产
    // url: '/code',
    // 测试
    // url: '/gjdxapi/code',
    url: url,
    method: 'get'
  })
}

// 登录 获取手机验证码
export function getPhoneCode(data) {
  return request({
    url: '/auth/getPhoneCode',
    method: 'post',
    data: data
  })
}
// 固话绑定手机 提交
export function bindPhone(data) {
  return request({
    url: '/auth/bindPhone',
    method: 'post',
    data: data
  })
}

// 固话绑定手机 获取手机验证码
export function getBindPhoneCode(data) {
  return request({
    url: '/auth/getBindPhoneCode',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}


// 第三方登录
export function threeLogin(data) {
  return request({
    url: '/auth/threeLogin',
    method: 'post',
    data: data
  })
}
