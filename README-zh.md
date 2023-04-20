[
{
"redirect": "/Dashboard",
"path": "/",
"component": "Layout",
"route": "1",
"children": [
{
"path": "Dashboard",
"component": "/dashboard",
"route": "1",
"meta": {
"keepAlive": false,
"icon": "dashboard",
"title": "首页"
},
"name": "Dashboard",
"id": "3001000010101"
}
],
"meta": {
"keepAlive": false,
"title": "首页"
},
"name": "",
"id": "30010000101"
},
{
"redirect": "/customer/list",
"path": "/customer",
"component": "Layout",
"route": "1",
"children": [
{
"path": "customer/list",
"component": "/customer/list",
"route": "1",
"meta": {
"keepAlive": false,
"title": "客户列表"
},
"name": "CustomerList",
"id": "3001000010201"
},
{
"path": "customer/add",
"component": "/customer/list/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增客户"
},
"name": "CustomerAdd",
"id": "3001000010202"
},
{
"path": "customer/modify",
"component": "/customer/list/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "修改客户基本信息"
},
"name": "CustomerModify",
"id": "3001000010203"
},
{
"path": "customer/see",
"component": "/customer/list/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "查看客户信息"
},
"name": "CustomerSee",
"id": "3001000010204"
},
{
"path": "customer/import",
"component": "/customer/list/xlxsFile",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "导入客户"
},
"name": "CustomerImport",
"id": "3001000010205"
},
{
"path": "customer/enterprise",
"component": "/customer/enterprise",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "企业名片客户"
},
"name": "CustomerEnterpriseList",
"id": "3001000010206"
},
{
"path": "enterprise/add",
"component": "/customer/enterprise/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增企业名片客户"
},
"name": "EnterpriseAdd",
"id": "3001000010207"
},
{
"path": "enterprise/modify",
"component": "/customer/enterprise/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "修改企业名片客户信息"
},
"name": "EnterpriseModify",
"id": "3001000010208"
},
{
"path": "enterprise/see",
"component": "/customer/enterprise/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "查看企业名片客户信息"
},
"name": "EnterpriseSee",
"id": "3001000010209"
}
],
"meta": {
"keepAlive": false,
"icon": "customer",
"title": "客户管理"
},
"name": "customer",
"id": "30010000102"
},
{
"redirect": "/business/list",
"path": "/business",
"component": "Layout",
"route": "1",
"children": [
{
"path": "business/list",
"component": "/business/list",
"route": "1",
"meta": {
"keepAlive": false,
"title": "业务列表"
},
"name": "BusinessList",
"id": "3001000010301"
},
{
"path": "business/add",
"component": "/business/list/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增业务"
},
"name": "BusinessAdd",
"id": "3001000010302"
},
{
"path": "business/continue",
"component": "/business/list/continue",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "续订业务"
},
"name": "BusinessReorder",
"id": "3001000010303"
},
{
"path": "business/see",
"component": "/business/list/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "业务详情"
},
"name": "BusinessSee",
"id": "3001000010304"
},
{
"path": "businessEnterprise/list",
"component": "/business/enterprise",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "企业名片列表"
},
"name": "BusinessEnterpriseList",
"id": "3001000010305"
},
{
"path": "businessEnterprise/add",
"component": "/business/list/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增企业业务"
},
"name": "BusinessEnterpriseAdd",
"id": "3001000010306"
},
{
"path": "businessEnterprise/continue",
"component": "/business/list/continue",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "续订企业业务"
},
"name": "BusinessEnterpriseReorder",
"id": "3001000010307"
},
{
"path": "businessEnterprise/see",
"component": "/business/list/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "企业业务详情"
},
"name": "BusinessEnterpriseSee",
"id": "3001000010308"
},
{
"path": "business/orderBusi",
"component": "/business/list/listContinue",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "业务续订"
},
"name": "BusinessOrderBusi",
"id": "3001000010309"
}
],
"meta": {
"keepAlive": false,
"icon": "business",
"title": "业务管理"
},
"name": "business",
"id": "30010000103"
},
{
"redirect": "/number/list",
"path": "/number",
"component": "Layout",
"route": "1",
"children": [
{
"path": "number/list",
"component": "/number/list",
"route": "1",
"meta": {
"keepAlive": false,
"title": "号码列表"
},
"name": "NumberList",
"id": "3001000010401"
},
{
"path": "number/add",
"component": "/number/list/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增号码"
},
"name": "numberAdd",
"id": "3001000010402"
},
{
"path": "number/see",
"component": "/number/list/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "号码详情"
},
"name": "numberSee",
"id": "3001000010403"
},
{
"path": "number/group",
"component": "/number/list/group",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增群组"
},
"name": "numberGroup",
"id": "3001000010404"
},
{
"path": "numberEnterprise/list",
"component": "/number/enterprise",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "企业名片订单"
},
"name": "NumberEnterpriseList",
"id": "3001000010405"
}
],
"meta": {
"keepAlive": false,
"icon": "number",
"title": "号码管理"
},
"name": "number",
"id": "30010000104"
},
{
"redirect": "/batchMessage/list",
"path": "/batchMessage",
"component": "Layout",
"route": "1",
"children": [
{
"path": "batchMessage/list",
"component": "/batchMessage/list",
"route": "1",
"meta": {
"keepAlive": false,
"title": "批量短信"
},
"name": "batchMessageList",
"id": "3001000010501"
},
{
"path": "batchMessage/see",
"component": "/batchMessage/list/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "短信发送详情"
},
"name": "batchMessageSee",
"id": "3001000010502"
}
],
"meta": {
"keepAlive": false,
"icon": "batchMessage",
"title": "批量短信"
},
"name": "batchMessage",
"id": "30010000105"
},
{
"path": "/marketingCenter",
"component": "Layout",
"route": "1",
"children": [
{
"path": "timingMsg",
"component": "/marketingCenter/timingMsg",
"route": "1",
"meta": {
"keepAlive": false,
"title": "定时短信"
},
"name": "timingMsg",
"id": "3001000010601"
},
{
"path": "feedbackList",
"component": "/marketingCenter/feedback",
"route": "1",
"meta": {
"keepAlive": false,
"title": "反馈列表"
},
"name": "feedbackList",
"id": "3001000010610"
},
{
"path": "feedbackList/see",
"component": "/marketingCenter/feedback/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "查看反馈"
},
"name": "feedbackListSee",
"id": "3001000010611"
},
{
"path": "timingMsgSee",
"component": "/marketingCenter/timingMsg/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "短信发送详情"
},
"name": "timingMsgSee",
"id": "3001000010602"
},
{
"path": "bannerList",
"component": "/marketingCenter/bannerList",
"route": "1",
"meta": {
"keepAlive": false,
"title": "banner列表"
},
"name": "bannerList",
"id": "3001000010603"
},
{
"path": "bannerList/add",
"component": "/marketingCenter/bannerList/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "添加轮播"
},
"name": "bannerListAdd",
"id": "3001000010604"
},
{
"path": "bannerList/update",
"component": "/marketingCenter/bannerList/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "修改轮播"
},
"name": "bannerListUpdate",
"id": "3001000010605"
},
{
"path": "specialList",
"component": "/marketingCenter/specialList",
"route": "1",
"meta": {
"keepAlive": false,
"title": "专题列表"
},
"name": "specialList",
"id": "3001000010606"
},
{
"path": "specialList/add",
"component": "/marketingCenter/specialList/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增专题"
},
"name": "specialListAdd",
"id": "3001000010607"
},
{
"path": "specialList/modify",
"component": "/marketingCenter/specialList/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "修改专题"
},
"name": "specialListUpdate",
"id": "3001000010608"
},
{
"path": "specialList/relationTemplate",
"component": "/marketingCenter/specialList/relationTemplate",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "关联模板"
},
"name": "specialListrRelationTemplate",
"id": "3001000010609"
}
],
"meta": {
"keepAlive": false,
"icon": "marketingCenter",
"title": "营销中心"
},
"name": "marketingCenter",
"id": "30010000106"
},
{
"path": "/flashShort",
"component": "Layout",
"route": "1",
"children": [
{
"path": "flashShortList",
"component": "/flashShort/template",
"route": "1",
"meta": {
"keepAlive": false,
"title": "模板列表"
},
"name": "flashShortList",
"id": "3001000010701"
},
{
"path": "flashShortList/add",
"component": "/flashShort/template/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增模板"
},
"name": "flashShortListAdd",
"id": "3001000010702"
},
{
"path": "flashShortList/update",
"component": "/flashShort/template/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "修改模板"
},
"name": "flashShortListModify",
"id": "3001000010703"
},
{
"path": "flashShortList/see",
"component": "/flashShort/template/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "查看模板"
},
"name": "flashShortListSee",
"id": "3001000010704"
},
{
"path": "flashShortList/import",
"component": "/flashShort/template/xlxsFile",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "导入模板"
},
"name": "flashShortListImport",
"id": "3001000010705"
},
{
"path": "flashShortEnterpriseList/add",
"component": "/flashShort/enterprise/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增模板"
},
"name": "flashShortEnterpriseListAdd",
"id": "3001000010707"
},
{
"path": "flashShortEnterpriseList/update",
"component": "/flashShort/enterprise/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "修改模板"
},
"name": "flashShortEnterpriseListModify",
"id": "3001000010708"
},
{
"path": "flashShortEnterpriseList/see",
"component": "/flashShort/enterprise/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "查看模板"
},
"name": "flashShortEnterpriseListSee",
"id": "3001000010709"
},
{
"path": "signatureList",
"component": "/flashShort/signature",
"route": "1",
"meta": {
"keepAlive": false,
"title": "签名管理"
},
"name": "signatureList",
"id": "3001000010715"
},
{
"path": "signatureList/see",
"component": "/flashShort/signature/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "查看签名"
},
"name": "signatureListSee",
"id": "3001000010716"
},
{
"path": "flashShortList/cert",
"component": "/flashShort/template/certFile",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "上传模板资质文件"
},
"name": "flashShortListCert",
"id": "3001000010717"
}
],
"meta": {
"keepAlive": false,
"icon": "flashShort",
"title": "短闪模板"
},
"name": "flashShort",
"id": "30010000107"
},
{
"path": "/basicsSet",
"component": "Layout",
"route": "1",
"children": [
{
"path": "ruleSet",
"component": "/basicsSet/ruleSet",
"route": "1",
"meta": {
"keepAlive": false,
"title": "规则配置"
},
"name": "ruleSet",
"id": "3001000010801"
},
{
"path": "ruleSet/add",
"component": "/basicsSet/ruleSet/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增规则"
},
"name": "ruleSetAdd",
"id": "3001000010802"
},
{
"path": "ruleSet/update",
"component": "/basicsSet/ruleSet/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "编辑规则"
},
"name": "ruleSetModify",
"id": "3001000010803"
},
{
"path": "ruleSet/see",
"component": "/basicsSet/ruleSet/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "规则配置详情"
},
"name": "ruleSetSee",
"id": "3001000010804"
},
{
"path": "ruleSet/addContent",
"component": "/basicsSet/ruleSet/addContent",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增推送内容与接收号码"
},
"name": "ruleSetddContent",
"id": "3001000010805"
},
{
"path": "pushFrequency",
"component": "/basicsSet/pushFrequency",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "推送频次"
},
"name": "pushFrequency",
"id": "3001000010806"
},
{
"path": "productManagement",
"component": "/basicsSet/productManagement",
"route": "1",
"meta": {
"keepAlive": false,
"title": "产品管理"
},
"name": "productManagement",
"id": "3001000010807"
},
{
"path": "productManagement/add",
"component": "/basicsSet/productManagement/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增产品"
},
"name": "productManagementAdd",
"id": "3001000010808"
},
{
"path": "productManagement/update",
"component": "/basicsSet/productManagement/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "编辑产品"
},
"name": "productManagementModify",
"id": "3001000010809"
},
{
"path": "sensitiveWords",
"component": "/basicsSet/sensitiveWords",
"route": "1",
"meta": {
"keepAlive": false,
"title": "敏感词"
},
"name": "sensitiveWords",
"id": "3001000010810"
},
{
"path": "sensitiveWords/add",
"component": "/basicsSet/sensitiveWords/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增敏感词"
},
"name": "sensitiveWordsAdd",
"id": "3001000010811"
},
{
"path": "blackList",
"component": "/basicsSet/blackList",
"route": "1",
"meta": {
"keepAlive": false,
"title": "黑名单"
},
"name": "blackList",
"id": "3001000010812"
},
{
"path": "blackList/add",
"component": "/basicsSet/blackList/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "创建黑名单"
},
"name": "blackListAdd",
"id": "3001000010813"
},
{
"path": "numberSign",
"component": "/basicsSet/numberSign",
"route": "1",
"meta": {
"keepAlive": false,
"title": "号码签约"
},
"name": "numberSign",
"id": "3001000010814"
},
{
"path": "numberSign/add",
"component": "/basicsSet/numberSign/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增签约"
},
"name": "numberSignAdd",
"id": "3001000010815"
}
],
"meta": {
"keepAlive": false,
"icon": "basicsSet",
"title": "基础设置"
},
"name": "basicsSet",
"id": "30010000108"
},
{
"path": "/statisticalReport",
"component": "Layout",
"route": "1",
"children": [
{
"path": "callRecord",
"component": "/statisticalReport/callRecord",
"route": "1",
"meta": {
"keepAlive": false,
"title": "呼叫记录"
},
"name": "callRecord",
"id": "3001000010901"
},
{
"path": "sendDetails",
"component": "/statisticalReport/sendDetails",
"route": "1",
"meta": {
"keepAlive": false,
"title": "发送明细"
},
"name": "sendDetails",
"id": "3001000010902"
},
{
"path": "SMSnotification",
"component": "/statisticalReport/SMSnotification",
"route": "1",
"meta": {
"keepAlive": false,
"title": "短信通知"
},
"name": "SMSnotification",
"id": "3001000010903"
},
{
"path": "orderDetails",
"component": "/statisticalReport/orderDetails",
"route": "1",
"meta": {
"keepAlive": false,
"title": "订购用户明细"
},
"name": "orderDetails",
"id": "3001000010904"
}
],
"meta": {
"keepAlive": false,
"icon": "statisticalReport",
"title": "数据分析"
},
"name": "statisticalReport",
"id": "30010000109"
},
{
"path": "/categoryManagement",
"component": "Layout",
"route": "1",
"children": [
{
"path": "categoryManagement",
"component": "/categoryManagement",
"route": "1",
"meta": {
"keepAlive": false,
"title": "分类列表"
},
"name": "categoryManagement",
"id": "3001000011001"
},
{
"path": "categoryManagement/add",
"component": "/categoryManagement/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增分类"
},
"name": "categoryManagementAdd",
"id": "3001000011002"
},
{
"path": "categoryManagement/update",
"component": "/categoryManagement/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "编辑分类"
},
"name": "categoryManagementModify",
"id": "3001000011003"
}
],
"meta": {
"keepAlive": false,
"icon": "categoryManagement",
"title": "分类管理"
},
"name": "categoryManagement",
"id": "30010000110"
},
{
"path": "/authManagement",
"component": "Layout",
"route": "1",
"children": [
{
"path": "userManagement",
"component": "/authManagement/userManagement",
"route": "1",
"meta": {
"keepAlive": false,
"title": "用户管理"
},
"name": "userManagement",
"id": "3001000011101"
},
{
"path": "userManagement/add",
"component": "/authManagement/userManagement/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增用户"
},
"name": "userManagementAdd",
"id": "3001000011102"
},
{
"path": "userManagement/update",
"component": "/authManagement/userManagement/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "修改用户"
},
"name": "userManagementModify",
"id": "3001000011103"
},
{
"path": "roleManagement",
"component": "/authManagement/roleManagement",
"route": "1",
"meta": {
"keepAlive": false,
"title": "角色管理"
},
"name": "roleManagement",
"id": "3001000011104"
},
{
"path": "roleManagement/add",
"component": "/authManagement/roleManagement/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增角色"
},
"name": "roleManagementAdd",
"id": "3001000011105"
},
{
"path": "roleManagement/update",
"component": "/authManagement/roleManagement/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "修改角色"
},
"name": "roleManagementModify",
"id": "3001000011106"
}
],
"meta": {
"keepAlive": false,
"icon": "authManagement",
"title": "权限管理"
},
"name": "authManagement",
"id": "30010000111"
},
{
"path": "/individualToEnterprise",
"component": "Layout",
"route": "1",
"hidden": true,
"children": [
{
"path": "enterpriseCustomers",
"component": "/individualToEnterprise/enterpriseCustomers",
"route": "1",
"meta": {
"keepAlive": false,
"title": "企业客户"
},
"name": "enterpriseCustomers",
"id": "3001000011201"
},
{
"path": "enterpriseCustomers/add",
"component": "/individualToEnterprise/enterpriseCustomers/add",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增客户基本信息"
},
"name": "enterpriseCustomersAdd",
"id": "3001000011202"
},
{
"path": "enterpriseCustomers/update",
"component": "/individualToEnterprise/enterpriseCustomers/modify",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "修改客户基本信息"
},
"name": "enterpriseCustomersModify",
"id": "3001000011203"
},
{
"path": "enterpriseCustomers/see",
"component": "/individualToEnterprise/enterpriseCustomers/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "查看客户基本信息"
},
"name": "enterpriseCustomersSee",
"id": "3001000011204"
},
{
"path": "enterpriseCustomers/import",
"component": "/individualToEnterprise/enterpriseCustomers/xlxsFile",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "新增规则"
},
"name": "enterpriseCustomersImport",
"id": "3001000011205"
},
{
"path": "enterpriselist",
"component": "/individualToEnterprise/enterpriselist",
"route": "1",
"meta": {
"keepAlive": false,
"title": "个转企列表"
},
"name": "enterpriselist",
"id": "3001000011206"
},
{
"path": "enterpriselist/see",
"component": "/individualToEnterprise/enterpriselist/see",
"route": "1",
"hidden": true,
"meta": {
"keepAlive": false,
"title": "个转企查看详情"
},
"name": "enterpriselistSee",
"id": "3001000011207"
}
],
"meta": {
"keepAlive": false,
"icon": "individualToEnterprise",
"title": "渠道管理"
},
"name": "individualToEnterprise",
"id": "30010000112"
}
]