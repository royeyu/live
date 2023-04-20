import request from '@/utils/request'

// 客户管理列表
export function customerPage(data) {
  return request({
    url: 'customer/customer/page',
    method: 'get',
    params: data
  })
}
// 客户管理列表  --无需权限
export function customerPageNoAuth(data) {
  return request({
    url: 'customer/customer/pageNoAuth',
    method: 'get',
    params: data
  })
}

export function customeResetPass(data) {
  return request({
    url: 'customer/customer/resetPass',
    method: 'get',
    params: data
  })
}

export function customeDelete(data) {
  return request({
    url: 'customer/customer/delete',
    method: 'get',
    params: data
  })
}

// 客户管理 新增或修改
export function customerAddOrUpd(data) {
  return request({
    url: 'customer/customer/addOrUpd',
    method: 'POST',
    data: data
  })
}

// 客户管理 新增
export function customerAdd(data) {
  return request({
    url: 'customer/customer/add',
    method: 'POST',
    data: data
  })
}

// 客户管理 修改
export function customerEdit(data) {
  return request({
    url: 'customer/customer/update',
    method: 'POST',
    data: data
  })
}
// 客户管理 修改客户权限组
export function updateCustRole(data) {
  return request({
    url: 'customer/customer/updateCustRole',
    method: 'POST',
    data: data
  })
}

// 客户管理 详情
export function customerDetail(data) {
  return request({
    url: 'customer/customer/detail',
    method: 'GET',
    params: data
  })
}

// 客户管理 审核用户：通过-不通过
export function customerModifyCkStatus(data) {
  return request({
    url: 'customer/customer/modifyCkStatus',
    method: 'POST',
    data: data
  })
}

// 业务管理 列表查询
export function custServicePage(data) {
  return request({
    url: 'customer/custService/page',
    method: 'GET',
    params: data
  })
}

// 业务管理 详情
export function custServiceDetail(data) {
  return request({
    url: 'customer/custService/detail',
    method: 'GET',
    params: data
  })
}

// 业务管理 新增
export function custServiceAddCust(data) {
  return request({
    url: 'customer/custService/addCust',
    method: 'POST',
    data: data
  })
}

// 业务管理 续订
export function custServiceRenew(data) {
  return request({
    url: 'customer/custService/renew',
    method: 'POST',
    data: data
  })
}

// 模板账户列表
export function templateAccountList(data) {
  return request({
    url: 'customer/template/accountList',
    method: 'GET',
    params: data
  })
}
// 模板账户列表 -- 新接口
export function templateAccountInfo(data) {
  return request({
    url: 'customer/template/getAccountInfo',
    method: 'GET',
    params: data
  })
}

// 业务管理 状态修改
export function custServiceModifyStatus(data) {
  return request({
    url: 'customer/custService/modifyStatus',
    method: 'GET',
    params: data
  })
}

// 闪短模板 模板列表
export function templatePage(data) {
  return request({
    url: 'customer/template/page',
    method: 'GET',
    params: data
  })
}
// 闪短模板 模板列表 --个人
export function templatePageP(data) {
  return request({
    url: 'customer/template/ppage',
    method: 'GET',
    params: data
  })
}

// 闪短模板 模板列表 新增
export function templateAdd(data) {
  return request({
    url: 'customer/template/add',
    method: 'POST',
    data: data
  })
}
// 闪短模板 模板列表 新增 --个人
export function templateAddP(data) {
  return request({
    url: 'customer/template/padd',
    method: 'POST',
    data: data
  })
}
// 号码管理 新增文件
export function templateAddFile(data) {
  return request({
    url: 'customer/template/addUpload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 闪短模板 模板列表 详情
export function templateDetail(data) {
  return request({
    url: 'customer/template/detail',
    method: 'GET',
    params: data
  })
}
// 闪短模板 模板列表 详情 -个人
export function templateDetailP(data) {
  return request({
    url: 'customer/template/pdetail',
    method: 'GET',
    params: data
  })
}

// 闪短模板 模板列表 初审
export function templateAudit(data) {
  return request({
    url: 'customer/template/audit',
    method: 'POST',
    data: data
  })
}
// 闪短模板 模板列表 初审 --个人
export function templateAuditP(data) {
  return request({
    url: 'customer/template/paudit',
    method: 'POST',
    data: data
  })
}
// 闪短模板 模板列表 复审
export function templateCheck(data) {
  return request({
    url: 'customer/template/check',
    method: 'POST',
    data: data
  })
}
// 闪短模板 模板列表 复审 --个人
export function templateCheckP(data) {
  return request({
    url: 'customer/template/pcheck',
    method: 'POST',
    data: data
  })
}
// 闪短模板 模板列表 删除
export function templateDel(data) {
  return request({
    url: 'customer/template/del',
    method: 'POST',
    data: data
  })
}

// 闪短模板 模板列表 - 个人 - 设置模板专用和公用信息
// id (模板表的ID) ,phones(为空代表全部，手机号码（多个则用英文逗号分隔）指定给某人)
export function updateTemplatePhoneInfo(data) {
  return request({
    url: 'customer/template/updateTemplatePhoneInfo',
    method: 'POST',
    data: data
  })
}

// 闪短模板 模板列表 - 个人 - 获取模板专用和公用信息
// id (模板表的ID)
export function getTemplatePhoneInfo(data) {
  return request({
    url: 'customer/template/getTemplatePhoneInfo',
    method: 'GET',
    params: data
  })
}

// 闪短模板 模板列表 删除 --个人
export function templateDelP(data) {
  return request({
    url: 'customer/template/pdel',
    method: 'POST',
    data: data
  })
}
// 闪短模板 模板列表 修改
export function templateEdit(data) {
  return request({
    url: 'customer/template/edit',
    method: 'POST',
    data: data
  })
}
// 关联模板 模板列表 修改
export function templateGetList(data) {
  return request({
    url: 'customer/template/getList',
    method: 'GET',
    params: data
  })
}
// 号码管理 列表
export function phonePage(data) {
  return request({
    url: 'customer/phone/page',
    method: 'GET',
    params: data
  })
}
// 号码管理 新增
export function phoneAdd(data) {
  return request({
    url: 'customer/phone/add',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
// 号码管理 详情
export function phoneDetail(data) {
  return request({
    url: 'customer/phone/detail',
    method: 'GET',
    params: data
  })
}
// 号码管理 审核
export function phoneAudit(data) {
  return request({
    url: 'customer/phone/audit',
    method: 'POST',
    data: data
  })
}
// 号码管理 搜索条件审核
export function phoneBatchAudit(data) {
  return request({
    url: 'customer/phone/batchAudit',
    method: 'POST',
    data: data
  })
}
// 号码管理 删除
export function phoneDel(data) {
  return request({
    url: 'customer/phone/del',
    method: 'POST',
    data: data
  })
}
// 号码管理 搜索条件删除
export function phoneBatchDelete(data) {
  return request({
    url: 'customer/phone/batchDelete',
    method: 'POST',
    data: data
  })
}
// 号码管理 新增群组
export function phoneAddGroup(data) {
  return request({
    url: 'customer/phone/addGroup',
    method: 'POST',
    data: data
  })
}
// 号码管理 群组列表
export function phoneGroupList(data) {
  return request({
    url: 'customer/phone/groupList',
    method: 'GET',
    params: data
  })
}
// 新增规则 群组号码列表
export function groupListByServiceType(data) {
  return request({
    url: 'customer/phone/groupListByServiceType',
    method: 'GET',
    params: data
  })
}
// 业务列表 删除
export function custServiceDel(data) {
  return request({
    url: 'customer/custService/delete',
    method: 'GET',
    params: data
  })
}
// 模板管理 模板导出
export function templateExport(params) {
  return request({
    url: 'customer/template/templateExport',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
// 获取客户的业务列表
export function getServiceList(data) {
  return request({
    url: 'customer/customer/getServiceList',
    method: 'GET',
    params: data
  })
}

// 个人版 首页  获取用户服务列表
// String customerAccount（userinfo里的username）
export function getUserServices(data) {
  return request({
    url: 'customer/personalStatistics/userServices',
    method: 'POST',
    data: data
  })
}
// 个人版 首页  获取信息接口
// String customerAccount（userinfo里的username）
export function getUserServicesInfo(data) {
  return request({
    url: 'customer/personalStatistics/info',
    method: 'POST',
    data: data
  })
}

// 个人版 首页 获取基本信息
// String customerAccount（userinfo里的username）
export function MPBasicInfo(data) {
  return request({
    url: 'customer/personalStatistics/MPBasicInfo',
    method: 'POST',
    data: data
  })
}

// 新增规则 获取模版列表
export function getTemplateInfo(data) {
  return request({
    url: 'customer/template/getTemplateInfo',
    method: 'GET',
    params: data
  })
}

// 签名管理  获取列表
export function getSignManageList(data) {
  return request({
    url: 'customer/signManage/indexPage',
    method: 'GET',
    params: data
  })
}
// 签名管理  删除签名
export function delSignManageList(data) {
  return request({
    url: 'customer/signManage/delete',
    method: 'GET',
    params: data
  })
}
// 签名 根据客户id获取签名列表
export function getCustSignList(data) {
  return request({
    url: 'customer/signManage/getSignList',
    method: 'GET',
    params: data
  })
}
// 签名管理  获取详情
export function getSignManageDetail(data) {
  return request({
    url: 'customer/signManage/detail',
    method: 'GET',
    params: data
  })
}
// 签名管理 签名审核
export function getSignManageApproval(data) {
  return request({
    url: 'customer/signManage/approval',
    method: 'POST',
    data: data
  })
}

// 反馈列表 列表数据
export function getFeedbackList(data) {
  return request({
    url: 'customer/feedback/indexPage',
    method: 'GET',
    params: data
  })
}
// 反馈列表 详情数据
export function getFeedbackDetail(data) {
  return request({
    url: 'customer/feedback/detail',
    method: 'GET',
    params: data
  })
}
// 反馈列表 回复
export function getFeedbackReply(data) {
  return request({
    url: 'customer/feedback/reply',
    method: 'POST',
    data: data
  })
}

// 资质文件 提交接口
export function uploadCertFile(data) {
  return request({
    url: 'customer/template/uploadCertFile',
    method: 'POST',
    data: data
  })
}
// 资质文件 获取接口
export function getCertFile(data) {
  return request({
    url: 'customer/template/getCertFile',
    method: 'GET',
    params: data
  })
}

// 亲情号码列表
export function getKinshipList(data) {
  return request({
    url: 'customer/kinship/indexPage',
    method: 'GET',
    params: data
  })
}
// 携号转网 新增接口
export function transferAdd(data) {
  return request({
    url: 'customer/carryingNumber/add',
    method: 'POST',
    data: data
  })
}

// 亲情号码列表
export function getTransferList(data) {
  return request({
    url: 'customer/carryingNumber/page',
    method: 'GET',
    params: data
  })
}

// 亲情号码列表
export function transferDel(data) {
  return request({
    url: 'customer/carryingNumber/del',
    method: 'POST',
    data: data
  })
}

