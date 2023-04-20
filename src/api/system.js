import request from '@/utils/request'

export function roleCreate(data) {
  return request({
    url: '/system/role/create',
    method: 'post',
    data: data
  })
}

export function getMenuTreeList(data) {
  return request({
    url: '/system/menu/getMenuTreeList',
    method: 'get'
  })
}

export function roleQuery(data) {
  return request({
    url: '/system/role/query',
    method: 'get',
    params: data
  })
}

// 角色列表
export function userQuery(data) {
  return request({
    url: '/system/user/query',
    method: 'get',
    params: data
  })
}

// 启用-禁用角色
export function setRoleStatus(data) {
  return request({
    url: '/system/role/setRoleStatus',
    method: 'post',
    data: data
  })
}

// 角色-根据ID删除
export function roleDelete(data) {
  return request({
    url: '/system/role/delete',
    method: 'post',
    data: data
  })
}

// 角色-根据ID查询
export function roleGet(data) {
  return request({
    url: '/system/role/get',
    method: 'get',
    params: data
  })
}

// 角色-根据ID修改
export function roleUpdate(data) {
  return request({
    url: '/system/role/update',
    method: 'POST',
    data: data
  })
}

// 角色-获取角色下拉列表
export function roleQueryForList(data) {
  return request({
    url: '/system/role/queryForList',
    method: 'GET'
  })
}

// 用户-新增
export function userCreate(data) {
  return request({
    url: '/system/user/create',
    method: 'POST',
    data: data
  })
}

// 用户-启用-禁用用户
export function setUserStatus(data) {
  return request({
    url: '/system/user/setUserStatus',
    method: 'POST',
    data: data
  })
}

// 用户-根据ID删除
export function userDelete(data) {
  return request({
    url: '/system/user/delete',
    method: 'POST',
    data: data
  })
}
// 用户- 重置用户密码
export function userResetPass(data) {
  return request({
    url: '/system/user/resetPass',
    method: 'GET',
    params: data
  })
}

// 用户-根据ID修改
export function userUpdate(data) {
  return request({
    url: '/system/user/update',
    method: 'POST',
    data: data
  })
}

// 用户-根据用户ID查询用户详情
export function userGet(data) {
  return request({
    url: '/system/user/get',
    method: 'GET',
    params: data
  })
}
// 数据来源 通过字典类型编码获取字典数据
export function dictGetByCode(data) {
  return request({
    url: '/system/dict/getByCode',
    method: 'GET',
    params: data
  })
}
// 省份查询
export function dictProvince(data) {
  return request({
    url: '/system/dict/province',
    method: 'GET',
    params: data
  })
}

// 地市-地市下级查询
export function dictCity(data) {
  return request({
    url: '/system/dict/city',
    method: 'GET',
    params: data
  })
}

// 固话号码查询省份
export function getCityInfoByTel(data) {
  return request({
    url: '/customer/customer/getCityInfoByTel',
    method: 'GET',
    params: data
  })
}
// 获取登录用户菜单
export function menuGetUserPermissionByToken(data) {
  return request({
    url: '/system/menu/getUserPermissionByToken',
    method: 'GET',
    params: data
  })
}
// 获取登录用户信息
export function userGetUserInfoByToken(data) {
  return request({
    url: '/system/user/getUserInfoByToken',
    method: 'GET',
    params: data
  })
}
// 获取系统菜单树
export function menuGetMenuTreeList(data) {
  return request({
    url: '/system/menu/getMenuTreeList',
    method: 'GET',
    params: data
  })
}
// 新增 系统菜单树
export function menuAdd(data) {
  return request({
    url: '/system/menu/add',
    method: 'POST',
    data: data
  })
}
// 删除 系统菜单树
export function menuDelete(data) {
  return request({
    url: '/system/menu/delete',
    method: 'POST',
    data: data
  })
}
// 编辑 系统菜单树
export function menuEdit(data) {
  return request({
    url: '/system/menu/edit',
    method: 'POST',
    data: data
  })
}
// 修改用户密码信息  --系统用户
export function systemUpdateUserPwd(data) {
  return request({
    url: '/system/user/updateUserPwd',
    method: 'POST',
    data: data
  })
}
// 修改用户密码信息  --业务用户
export function customerUpdateUserPwd(data) {
  return request({
    url: '/customer/customer/updateUserPwd',
    method: 'POST',
    data: data
  })
}

// 发送验证码获取重置安全码
export function getResetSafeCode(data) {
  return request({
    url: '/auth/getResetSafeCode',
    method: 'POST',
    data: data
  })
}
// 发送验证码获取重置安全码
export function resetLoginPwd(data) {
  return request({
    url: '/auth/resetLoginPwd',
    method: 'POST',
    data: data
  })
}

// 查询新增产品的业务类型
export function getProductServiceTypeDict(data) {
  return request({
    url: '/system/dict/getProductServiceTypeDict',
    method: 'GET',
    params: data
  })
}
// 查询新增产品的默认通道数据
export function getProductAppidDict(data) {
  return request({
    url: '/settings/product/getAppidDict',
    method: 'GET',
    params: data
  })
}
// 查询新增产品的产品类型数据
export function getProductTypeList(data) {
  return request({
    url: '/settings/productType/list',
    method: 'GET',
    params: data
  })
}
