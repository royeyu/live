import request from '@/utils/request'

// 敏感词 新增
export function keywordAdd(data) {
  return request({
    url: 'settings/keyword/add',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
// 黑名单 新增
export function blacklistAdd(data) {
  return request({
    url: 'settings/blacklist/add',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
// 黑名单 新增
export function blacklistAddP(data) {
  return request({
    url: 'settings/blacklist/padd',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
// 敏感词 列表查询
export function keywordPage(data) {
  return request({
    url: 'settings/keyword/page',
    method: 'GET',
    params: data
  })
}
// 黑名单 列表查询
export function blacklistPage(data) {
  return request({
    url: 'settings/blacklist/page',
    method: 'GET',
    params: data
  })
}

// 黑名单 列表查询  --个人
export function blacklistPageP(data) {
  return request({
    url: 'settings/blacklist/ppage',
    method: 'GET',
    params: data
  })
}

// 白名单 列表查询
export function whitelistPage(data) {
  return request({
    url: 'settings/whiteList/page',
    method: 'GET',
    params: data
  })
}

// 敏感词 删除
export function keywordDel(data) {
  return request({
    url: 'settings/keyword/del',
    method: 'post',
    data: data
  })
}
// 黑名单 删除
export function blacklistDel(data) {
  return request({
    url: 'settings/blacklist/del',
    method: 'post',
    data: data
  })
}
// 黑名单 删除  --个人
export function blacklistDelP(data) {
  return request({
    url: 'settings/blacklist/pdel',
    method: 'post',
    data: data
  })
}
// banner 列表查询
export function bannerPage(data) {
  return request({
    url: 'settings/banner/page',
    method: 'GET',
    params: data
  })
}
// banner 列表 新增
export function bannerAdd(data) {
  return request({
    url: 'settings/banner/add',
    method: 'POST',
    data: data
  })
}
// banner 列表 详情
export function bannerDetail(data) {
  return request({
    url: 'settings/banner/detail',
    method: 'GET',
    params: data
  })
}
// banner 列表 编辑
export function bannerEdit(data) {
  return request({
    url: 'settings/banner/edit',
    method: 'POST',
    data: data
  })
}
// banner 列表 排序
export function bannerSort(data) {
  return request({
    url: 'settings/banner/bannerSort',
    method: 'POST',
    data: data
  })
}
// banner 列表 删除
export function bannerDel(data) {
  return request({
    url: 'settings/banner/del',
    method: 'POST',
    data: data
  })
}
// 营销中心 专题 列表
export function subjectPage(data) {
  return request({
    url: 'settings/subject/page',
    method: 'GET',
    params: data
  })
}
// 营销中心 专题 详情
export function subjectDetail(data) {
  return request({
    url: 'settings/subject/detail',
    method: 'GET',
    params: data
  })
}
// 营销中心 专题 新增
export function subjectAdd(data) {
  return request({
    url: 'settings/subject/add',
    method: 'POST',
    data: data
  })
}
// 营销中心 专题 修改
export function subjectEdit(data) {
  return request({
    url: 'settings/subject/edit',
    method: 'POST',
    data: data
  })
}
// 营销中心 专题 删除
export function subjectDel(data) {
  return request({
    url: 'settings/subject/del',
    method: 'POST',
    data: data
  })
}
// 业务管理 获取产品信息
export function productGetProduct(data) {
  return request({
    url: 'settings/product/getProduct',
    method: 'GET',
    params: data
  })
}
// 业务管理 获取产品信息
export function subjectPage2(data) {
  return request({
    url: 'settings/subject/page2',
    method: 'GET',
    params: data
  })
}
// 专题 新增关联
export function subjectAddLinked(data) {
  return request({
    url: 'settings/subject/addLinked',
    method: 'POST',
    data: data
  })
}
// 专题 编辑关联
export function subjectEditBusiSubjectTemplate(data) {
  return request({
    url: 'settings/subject/editBusiSubjectTemplate',
    method: 'POST',
    data: data
  })
}
// 定时短信 列表查询
export function timingTaskPage(data) {
  return request({
    url: 'settings/timingTask/page',
    method: 'GET',
    params: data
  })
}
// 定时短信 详情
export function timingTaskDetail(data) {
  return request({
    url: 'settings/timingTask/detail',
    method: 'GET',
    params: data
  })
}
// 产品管理 列表查询
export function productPage(data) {
  return request({
    url: 'settings/product/page',
    method: 'GET',
    params: data
  })
}
// 产品管理 编辑
export function productEdit(data) {
  return request({
    url: 'settings/product/edit',
    method: 'POST',
    data: data
  })
}
// 产品管理 删除
export function productDel(data) {
  return request({
    url: 'settings/product/del',
    method: 'POST',
    data: data
  })
}
// 产品管理 启用禁用
export function productStatus(data) {
  return request({
    url: 'settings/product/status',
    method: 'POST',
    data: data
  })
}
// 产品管理 启用
export function productEnable(data) {
  return request({
    url: 'settings/product/enable',
    method: 'POST',
    data: data
  })
}
// 产品管理 禁用
export function productDisable(data) {
  return request({
    url: 'settings/product/disable',
    method: 'POST',
    data: data
  })
}
// 批量短信 列表查询
export function batchPage(data) {
  return request({
    url: 'settings/batchTask/page',
    method: 'GET',
    params: data
  })
}
// 批量短信 详情
export function batchTaskDetail(data) {
  return request({
    url: 'settings/batchTask/detail',
    method: 'GET',
    params: data
  })
}
// 批量短信 编辑
export function batchTaskEdit(data) {
  return request({
    url: 'settings/batchTask/edit',
    method: 'POST',
    data: data
  })
}
// 产品管理 详情
export function productDetail(data) {
  return request({
    url: 'settings/product/detail',
    method: 'GET',
    params: data
  })
}
// 产品管理 新增
export function productAdd(data) {
  return request({
    url: 'settings/product/add',
    method: 'POST',
    data: data
  })
}
// 呼叫记录 列表
export function validCdrRecordPage(data) {
  return request({
    url: 'settings/validCdrRecord/page',
    method: 'GET',
    params: data
  })
}
// 发送明细 列表
export function sendDetailPage(data) {
  return request({
    url: 'settings/sendDetail/page',
    method: 'GET',
    params: data
  })
}
// 短信通知 列表
export function notificationSMSPage(data) {
  return request({
    url: 'settings/sendDetail/notificationSMS',
    method: 'GET',
    params: data
  })
}
// 订购用户明细 列表
export function orderNoticeSummaryPage(data) {
  return request({
    url: 'settings/orderNoticeSummary/page',
    method: 'GET',
    params: data
  })
}
// 订购用户明细 导出
export function sendDetailDetailExport(params) {
  return request({
    url: 'settings/sendDetail/detailExport',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
// 推送频次 详情
export function configDetail(data) {
  return request({
    url: 'settings/config/detail',
    method: 'GET',
    params: data
  })
}
// 规则配置 列表查询
export function custRolePage(data) {
  return request({
    url: 'settings/bscrule/page',
    method: 'GET',
    params: data
  })
}
// 规则配置 详情
export function bscruleDetail(data) {
  return request({
    url: 'settings/bscrule/detail',
    method: 'GET',
    params: data
  })
}
// 规则配置 新增
export function bscruleAdd(data) {
  return request({
    url: 'settings/bscrule/add',
    method: 'POST',
    data: data
  })
}
// 规则配置 编辑
export function bscruleEdit(data) {
  return request({
    url: 'settings/bscrule/edit',
    method: 'POST',
    data: data
  })
}
// 规则配置 新增专业内容
export function bscruleAddContent(data) {
  return request({
    url: 'settings/bscrule/addContent',
    method: 'POST',
    data: data
  })
}
// 规则配置 修改状态
export function bscruleStatus(data) {
  return request({
    url: 'settings/bscrule/status',
    method: 'POST',
    data: data
  })
}
// 规则配置 启动
export function bscruleStart(data) {
  return request({
    url: 'settings/bscrule/start',
    method: 'POST',
    data: data
  })
}
// 规则配置 暂停
export function bscrulePause(data) {
  return request({
    url: 'settings/bscrule/pause',
    method: 'POST',
    data: data
  })
}
// 推送频次 编辑
export function configEdit(data) {
  return request({
    url: 'settings/config/edit',
    method: 'POST',
    data: data
  })
}

// 号码签约 列表
// orderPhone(手机号码)  type（订阅状态 1-正常订阅,2-解除订阅）
// beginTime（开始时间）  endTime（结束时间）
export function getNumSignList(data) {
  return request({
    url: 'settings/bpSubscribe/page',
    method: 'GET',
    params: data
  })
}

// 号码签约 签解约
//  id
// orderPhone
// type（当前状态 1-正常订阅,2-解除订阅）
// updateBy（修改人）

export function getNumSign(data) {
  return request({
    url: 'settings/bpSubscribe/signing',
    method: 'POST',
    data: data
  })
}

// 号码签约 新增签约
// bpSubscribe/addSigning    orderPhone(新增手机号码   多个用英文逗号隔开)  remark（备注）
// createBy（创建人）  createTime（创建时间） type（订阅状态   每次传1）
// MultipartFile file（一行一个号码）

export function addNumSign(data) {
  return request({
    url: 'settings/bpSubscribe/addSigning',
    method: 'POST',
    data: data
  })
}


