/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 验证密码   密码，以字母开头，长度在8~18之间，只能包含字母、数字和下划线
export function isvalidPass(str) {
  const reg = /^[a-zA-Z]\w{8,18}$/
  return reg.test(str)
}

// 手机号验证
export function isvalidPhone(str) {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  return reg.test(str)
}

//   验证用户名  用户名要求 数字、字母、下划线的组合，其中数字和字母必须同时存在*
export function isvalidUsername(str) {
  const reg = /^[0-9A-Za-z_]\w{3,15}$/
  // const reg = /[0-9A-Za-z_]\w{4,16}$/
  return reg.test(str)
}
// !_@-#.*%?

// @$!%*#?&
/* 密码强度验证 至少八个字符，至少一个大写字母，一个小写字母，一个数字和一个特殊字符：*/
export function voidPwd(str) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!_@\-#.*%?])[A-Za-z\d$!_@\-#.*%?]{6,18}$/
  return reg.test(str)
}
/*
export function voidPwd(str) {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  return reg.test(str)
}
*/
//   验证Smsc_Type 只允许 数字和符号",/" 示例 融合服务组合为1101,1102/1101,1104/1103,1102/1103,1104
export function isvalidSmscType(str) {
  const reg = /^[0-9,/]*$/
  return reg.test(str)
}

// 验证验证码是否为4位字母+数字
export function isvalidCode(str) {
  const reg = /^[A-Za-z0-9]{4}$/
  return reg.test(str)
}

// 验证固话号码
export function isvalidTelephone(str) {
  // 区号3位固话
  const tzRexp = /^0(10|2[0-9])[1-9]\d{7}$/
  // 区号4位固话
  const tnRexp = /^0[3-8]\d{2}[1-9]\d{6,7}$/
  if (str.substring(0, 2) == '01' || str.substring(0, 2) == '02') {
    return tzRexp.test(str)
  } else {
    return tnRexp.test(str)
  }
}
