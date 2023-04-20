// 首页
import request from '@/utils/request'

// 首页 业务概况统计
export function indexGetIndexBusiCount(data) {
  return request({
    url: 'report/index/rpt/getIndexBusiCount',
    method: 'GET',
    params: data
  })
}
// 首页 短信发送日统计
export function indexGetSmsSendDayCount(data) {
  return request({
    url: 'report/index/rpt/getSmsSendDayCount',
    method: 'GET',
    params: data
  })
}
// 首页 短信发送月统计
export function indexGetSmsSendMonthCount(data) {
  return request({
    url: 'report/index/rpt/getSmsSendMonthCount',
    method: 'GET',
    params: data
  })
}
