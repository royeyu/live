import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const asyncRoute = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    meta: { title: '客户管理', icon: 'customer' },
    children: [
      {
        path: 'list',
        name: 'customerList',
        component: () => import('@/views/customer/list'),
        meta: { title: '客户列表', keepAlive: true }
      },
      {
        path: 'list/add',
        hidden: true,
        name: 'customerListadd',
        component: () => import('@/views/customer/list/add'),
        meta: { title: '新增客户', activeMenu: '/customer/list' }
      },
      {
        path: 'list/modify',
        hidden: true,
        name: 'customerListmodify',
        component: () => import('@/views/customer/list/modify'),
        meta: { title: '修改客户基本信息', activeMenu: '/customer/list' }
      },
      {
        path: 'list/see',
        hidden: true,
        name: 'customerListsee',
        component: () => import('@/views/customer/list/see'),
        meta: { title: '查看客户信息', activeMenu: '/customer/list' }
      },
      {
        path: 'xlxsFile',
        name: 'xlxsFile',
        hidden: true,
        component: () => import('@/views/customer/list/xlxsFile'),
        meta: { title: '导入客户', activeMenu: '/customer/list' }
      },
      {
        path: 'enterprise',
        name: 'enterprise',
        component: () => import('@/views/customer/enterprise'),
        meta: { title: '企业名片客户' }
      },
      {
        path: 'enterprise/add',
        name: 'enterpriseAdd',
        hidden: true,
        component: () => import('@/views/customer/enterprise/add'),
        meta: { title: '新增企业名片客户', activeMenu: '/customer/enterprise' }
      },
      {
        path: 'enterprise/modify',
        name: 'enterpriseModify',
        hidden: true,
        component: () => import('@/views/customer/enterprise/modify'),
        meta: { title: '修改企业名片客户信息', activeMenu: '/customer/enterprise' }
      },
      {
        path: 'enterprise/see',
        name: 'enterpriseSee',
        hidden: true,
        component: () => import('@/views/customer/enterprise/see'),
        meta: { title: '查看企业名片客户信息', activeMenu: '/customer/enterprise' }
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business/list',
    meta: { title: '业务管理', icon: 'business' },
    children: [
      {
        path: 'list',
        name: 'businessList',
        component: () => import('@/views/business/list'),
        meta: { title: '业务列表', keepAlive: true }
      },
      {
        path: 'list/add',
        name: 'businessAdd',
        hidden: true,
        component: () => import('@/views/business/list/add'),
        meta: { title: '新增业务', activeMenu: '/business/list' }
      },
      {
        path: 'list/continue',
        name: 'businessAdd',
        hidden: true,
        component: () => import('@/views/business/list/continue'),
        meta: { title: '续订业务' }
      },
      {
        path: 'list/see',
        name: 'businessSee',
        hidden: true,
        component: () => import('@/views/business/list/see'),
        meta: { title: '业务详情' }
      },
      {
        path: 'enterprise',
        name: 'enterpriseList',
        component: () => import('@/views/business/enterprise'),
        meta: { title: '企业名片列表' }
      },
      {
        path: 'enterprise/add',
        name: 'enterpriseAdd',
        hidden: true,
        component: () => import('@/views/business/enterprise/add'),
        meta: { title: '新增企业业务', activeMenu: '/business/enterprise' }
      },
      {
        path: 'enterprise/continue',
        name: 'enterpriseAdd',
        hidden: true,
        component: () => import('@/views/business/list/continue'),
        meta: { title: '续订企业业务', activeMenu: '/business/enterprise' }
      },
      {
        path: 'enterprise/see',
        name: 'enterpriseSee',
        hidden: true,
        component: () => import('@/views/business/enterprise/see'),
        meta: { title: '企业业务详情', activeMenu: '/business/enterprise' }
      }
    ]
  },
  {
    path: '/number',
    component: Layout,
    redirect: '/number/list',
    meta: { title: '号码管理', icon: 'number' },
    children: [
      {
        path: 'list',
        name: 'numberList',
        component: () => import('@/views/number/list'),
        meta: { title: '号码列表' }
      },
      {
        path: 'list/add',
        name: 'numberList',
        hidden: true,
        component: () => import('@/views/number/list/add'),
        meta: { title: '新增号码', activeMenu: '/number/list' }
      },
      {
        path: 'list/see',
        name: 'numberSee',
        hidden: true,
        component: () => import('@/views/number/list/see'),
        meta: { title: '号码详情', activeMenu: '/number/list' }
      },
      {
        path: 'list/group',
        name: 'numberListAddGroup',
        hidden: true,
        component: () => import('@/views/number/list/group'),
        meta: { title: '新增群组', activeMenu: '/number/list' }
      },
      {
        path: 'enterprise',
        name: 'enterpriseList',
        component: () => import('@/views/number/enterprise'),
        meta: { title: '企业名片号码' }
      },
      {
        path: 'enterprise/add',
        name: 'enterpriseAdd',
        hidden: true,
        component: () => import('@/views/number/enterprise/add'),
        meta: { title: '新增号码', activeMenu: '/number/enterprise' }
      },
      {
        path: 'enterprise/see',
        name: 'enterpriseSee',
        hidden: true,
        component: () => import('@/views/number/enterprise/see'),
        meta: { title: '号码详情', activeMenu: '/number/enterprise' }
      },
      {
        path: 'enterprise/group',
        name: 'enterpriseGroup',
        hidden: true,
        component: () => import('@/views/number/enterprise/group'),
        meta: { title: '新增群组', activeMenu: '/number/enterprise' }
      }
    ]
  },
  {
    path: '/batchMessage',
    component: Layout,
    alwaysShow: true,
    redirect: '/batchMessage/list',
    meta: { title: '批量短信', icon: 'batchMessage' },
    children: [
      {
        path: 'list',
        name: 'batchMessageList',
        component: () => import('@/views/batchMessage/list'),
        meta: { title: '批量短信' }
      },
      {
        path: 'list/see',
        name: 'batchMessageList',
        hidden: true,
        component: () => import('@/views/batchMessage/list/see'),
        meta: { title: '短信发送详情', activeMenu: '/batchMessage/list' }
      }
    ]
  },
  {
    path: '/marketingCenter',
    component: Layout,
    alwaysShow: true,
    meta: { title: '营销中心', icon: 'marketingCenter' },
    children: [
      {
        path: 'timingMsg',
        name: 'timingMsg',
        component: () => import('@/views/marketingCenter/timingMsg'),
        meta: { title: '定时短信' }
      },
      {
        path: 'timingMsg/see',
        name: 'timingMsgSee',
        hidden: true,
        component: () => import('@/views/marketingCenter/timingMsg/see'),
        meta: { title: '短信发送详情', activeMenu: '/marketingCenter/timingMsg' }
      },
      {
        path: 'bannerList',
        name: 'bannerList',
        component: () => import('@/views/marketingCenter/bannerList'),
        meta: { title: 'banner列表' }
      },
      {
        path: 'bannerList/add',
        name: 'bannerListAdd',
        hidden: true,
        component: () => import('@/views/marketingCenter/bannerList/add'),
        meta: { title: '添加轮播', activeMenu: '/marketingCenter/bannerList' }
      },
      {
        path: 'bannerList/modify',
        name: 'bannerListModify',
        hidden: true,
        component: () => import('@/views/marketingCenter/bannerList/modify'),
        meta: { title: '修改轮播', activeMenu: '/marketingCenter/bannerList' }
      },
      {
        path: 'specialList',
        name: 'specialList',
        component: () => import('@/views/marketingCenter/specialList'),
        meta: { title: '专题列表' }
      },
      {
        path: 'specialList/modify',
        name: 'specialListModify',
        hidden: true,
        component: () => import('@/views/marketingCenter/specialList/modify'),
        meta: { title: '修改专题', activeMenu: '/marketingCenter/specialList' }
      },
      {
        path: 'specialList/add',
        name: 'specialListAdd',
        hidden: true,
        component: () => import('@/views/marketingCenter/specialList/add'),
        meta: { title: '新增专题', activeMenu: '/marketingCenter/specialList' }
      },
      {
        path: 'specialList/relationTemplate',
        name: 'relationTemplate',
        hidden: true,
        component: () => import('@/views/marketingCenter/specialList/relationTemplate'),
        meta: { title: '关联模板', activeMenu: '/marketingCenter/specialList' }
      }
    ]
  },
  {
    path: '/flashShort',
    component: Layout,
    alwaysShow: true,
    meta: { title: '闪短模板', icon: 'flashShort' },
    children: [
      {
        path: 'template',
        name: 'templateList',
        component: () => import('@/views/flashShort/template'),
        meta: { title: '模板列表' }
      },
      {
        path: 'template/xlxsFile',
        hidden: true,
        name: 'templatexlxsFile',
        component: () => import('@/views/flashShort/template/xlxsFile'),
        meta: { title: '导入模板信息', activeMenu: '/flashShort/template' }
      },
      {
        path: 'template/add',
        hidden: true,
        name: 'templateAdd',
        component: () => import('@/views/flashShort/template/add'),
        meta: { title: '新增短信模板', activeMenu: '/flashShort/template' }
      },
      {
        path: 'template/modify',
        hidden: true,
        name: 'templateModify',
        component: () => import('@/views/flashShort/template/modify'),
        meta: { title: '修改短信模板', activeMenu: '/flashShort/template' }
      },
      {
        path: 'template/see',
        hidden: true,
        name: 'templateSee',
        component: () => import('@/views/flashShort/template/see'),
        meta: { title: '查看短信模板', activeMenu: '/flashShort/template' }
      },
      {
        path: 'enterprise',
        name: 'enterprise',
        component: () => import('@/views/flashShort/enterprise'),
        meta: { title: '企业名片模板' }
      },
      {
        path: 'enterprise/add',
        hidden: true,
        name: 'enterpriseAdd',
        component: () => import('@/views/flashShort/enterprise/add'),
        meta: { title: '新增企业名片模板', activeMenu: '/flashShort/enterprise' }
      },
      {
        path: 'enterprise/modify',
        hidden: true,
        name: 'enterpriseeModify',
        component: () => import('@/views/flashShort/enterprise/modify'),
        meta: { title: '修改企业名片模板', activeMenu: '/flashShort/enterprise' }
      },
      {
        path: 'enterprise/see',
        hidden: true,
        name: 'enterpriseSee',
        component: () => import('@/views/flashShort/enterprise/see'),
        meta: { title: '查看企业名片模板', activeMenu: '/flashShort/enterprise' }
      }
    ]
  },
  {
    path: '/basicsSet',
    component: Layout,
    alwaysShow: true,
    meta: { title: '基础设置', icon: 'basicsSet' },
    children: [
      {
        path: 'ruleSet',
        name: 'ruleSet',
        component: () => import('@/views/basicsSet/ruleSet'),
        meta: { title: '规则配置' }
      },
      {
        path: 'ruleSet/add',
        name: 'ruleSetAdd',
        hidden: true,
        component: () => import('@/views/basicsSet/ruleSet/add'),
        meta: { title: '新增规则', activeMenu: '/basicsSet/ruleSet' }
      },
      {
        path: 'ruleSet/modify',
        name: 'ruleSetModify',
        hidden: true,
        component: () => import('@/views/basicsSet/ruleSet/modify'),
        meta: { title: '编辑规则', activeMenu: '/basicsSet/ruleSet' }
      },
      {
        path: 'ruleSet/see',
        name: 'ruleSetSee',
        hidden: true,
        component: () => import('@/views/basicsSet/ruleSet/see'),
        meta: { title: '规则配置详情', activeMenu: '/basicsSet/ruleSet' }
      },
      {
        path: 'ruleSet/addContent',
        name: 'ruleSetAddContent',
        hidden: true,
        component: () => import('@/views/basicsSet/ruleSet/addContent'),
        meta: { title: '新增推送内容与接收号码', activeMenu: '/basicsSet/ruleSet' }
      },
      {
        path: 'pushFrequency',
        name: 'pushFrequency',
        component: () => import('@/views/basicsSet/pushFrequency'),
        meta: { title: '推送频次' }
      },
      {
        path: 'productManagement',
        name: 'productManagement',
        component: () => import('@/views/basicsSet/productManagement'),
        meta: { title: '产品管理' }
      },
      {
        path: 'productManagement/add',
        name: 'productManagementAdd',
        hidden: true,
        component: () => import('@/views/basicsSet/productManagement/add'),
        meta: { title: '新增产品', activeMenu: '/basicsSet/productManagement' }
      },
      {
        path: 'productManagement/modify',
        name: 'productManagementModify',
        hidden: true,
        component: () => import('@/views/basicsSet/productManagement/modify'),
        meta: { title: '编辑产品', activeMenu: '/basicsSet/productManagement' }
      },
      {
        path: 'sensitiveWords',
        name: 'sensitiveWords',
        component: () => import('@/views/basicsSet/sensitiveWords'),
        meta: { title: '敏感词' }
      },
      {
        path: 'sensitiveWords/add',
        name: 'sensitiveWordsAdd',
        hidden: true,
        component: () => import('@/views/basicsSet/sensitiveWords/add'),
        meta: { title: '新增敏感词', activeMenu: '/basicsSet/sensitiveWords' }
      },
      {
        path: 'blackList',
        name: 'blackList',
        component: () => import('@/views/basicsSet/blackList'),
        meta: { title: '黑名单' }
      },
      {
        path: 'blackList/add',
        name: 'blackListAdd',
        hidden: true,
        component: () => import('@/views/basicsSet/blackList/add'),
        meta: { title: '创建黑名单', activeMenu: '/basicsSet/blackList' }
      }
    ]
  },
  {
    path: '/statisticalReport',
    name: 'statisticalReport',
    component: Layout,
    alwaysShow: true,
    meta: { title: '统计报表', icon: 'statisticalReport' },
    children: [
      {
        path: 'callRecord',
        name: 'callRecord',
        component: () => import('@/views/statisticalReport/callRecord'),
        meta: { title: '呼叫记录' }
      },
      {
        path: 'sendDetails',
        name: 'sendDetails',
        component: () => import('@/views/statisticalReport/sendDetails'),
        meta: { title: '发送明细' }
      },
      {
        path: 'SMSnotification',
        name: 'SMSnotification',
        component: () => import('@/views/statisticalReport/SMSnotification'),
        meta: { title: '短信通知' }
      },
      {
        path: 'orderDetails',
        name: 'orderDetails',
        component: () => import('@/views/statisticalReport/orderDetails'),
        meta: { title: '订购用户明细' }
      }
    ]
  },
  {
    path: '/categoryManagement',
    name: 'categoryManagement',
    component: Layout,
    alwaysShow: true,
    meta: { title: '分类管理', icon: 'categoryManagement' },
    children: [
      {
        path: 'categoryList',
        name: 'categoryList',
        component: () => import('@/views/categoryManagement'),
        meta: { title: '分类列表' }
      },
      {
        path: 'categoryList/add',
        name: 'categoryListAdd',
        hidden: true,
        component: () => import('@/views/categoryManagement/add'),
        meta: { title: '添加分类' }
      },
      {
        path: 'categoryList/modify',
        name: 'categoryListModify',
        hidden: true,
        component: () => import('@/views/categoryManagement/modify'),
        meta: { title: '修改分类' }
      }
    ]
  },
  {
    path: '/authManagement',
    name: 'authManagement',
    component: Layout,
    alwaysShow: true,
    meta: { title: '权限管理', icon: 'authManagement' },
    children: [
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/views/authManagement/userManagement'),
        meta: { title: '用户管理' }
      },
      {
        path: 'userManagement/add',
        name: 'userManagementAdd',
        hidden: true,
        component: () => import('@/views/authManagement/userManagement/add'),
        meta: { title: '新增用户', activeMenu: '/authManagement/userManagement' }
      },
      {
        path: 'userManagement/modify',
        name: 'userManagementModify',
        hidden: true,
        component: () => import('@/views/authManagement/userManagement/modify'),
        meta: { title: '修改用户', activeMenu: '/authManagement/userManagement' }
      },
      {
        path: 'roleManagement',
        name: 'roleManagement',
        component: () => import('@/views/authManagement/roleManagement'),
        meta: { title: '角色管理' }
      },
      {
        path: 'roleManagement/add',
        name: 'roleManagementAdd',
        hidden: true,
        component: () => import('@/views/authManagement/roleManagement/add'),
        meta: { title: '新增角色', activeMenu: '/authManagement/roleManagement' }
      },
      {
        path: 'roleManagement/modify',
        name: 'roleManagementModify',
        hidden: true,
        component: () => import('@/views/authManagement/roleManagement/modify'),
        meta: { title: '修改角色', activeMenu: '/authManagement/roleManagement' }
      }
    ]
  },
  {
    path: '/individualToEnterprise',
    name: 'individualToEnterprise',
    component: Layout,
    alwaysShow: true,
    meta: { title: '个人转企业', icon: 'individualToEnterprise' },
    children: [
      {
        path: 'enterpriseCustomers',
        name: 'enterpriseCustomers',
        component: () => import('@/views/individualToEnterprise/enterpriseCustomers'),
        meta: { title: '企业客户' }
      },
      {
        path: 'enterpriseCustomers/add',
        name: 'enterpriseCustomersAdd',
        hidden: true,
        component: () => import('@/views/individualToEnterprise/enterpriseCustomers/add'),
        meta: { title: '新增客户基本信息', activeMenu: '/individualToEnterprise/enterpriseCustomers' }
      },
      {
        path: 'enterpriseCustomers/modify',
        name: 'enterpriseCustomersModify',
        hidden: true,
        component: () => import('@/views/individualToEnterprise/enterpriseCustomers/modify'),
        meta: { title: '修改客户基本信息', activeMenu: '/individualToEnterprise/enterpriseCustomers' }
      },
      {
        path: 'enterpriseCustomers/see',
        name: 'enterpriseCustomersSee',
        hidden: true,
        component: () => import('@/views/individualToEnterprise/enterpriseCustomers/see'),
        meta: { title: '查看客户基本信息', activeMenu: '/individualToEnterprise/enterpriseCustomers' }
      },
      {
        path: 'enterpriseCustomers/xlxsFile',
        name: 'enterpriseCustomersXlxsFile',
        hidden: true,
        component: () => import('@/views/individualToEnterprise/enterpriseCustomers/xlxsFile'),
        meta: { title: '新增规则', activeMenu: '/individualToEnterprise/enterpriseCustomers' }
      },
      {
        path: 'enterpriselist',
        name: 'enterpriselist',
        component: () => import('@/views/individualToEnterprise/enterpriselist'),
        meta: { title: '个转企列表' }
      },
      {
        path: 'enterpriselist/see',
        name: 'enterpriselistSee',
        hidden: true,
        component: () => import('@/views/individualToEnterprise/enterpriselist/see'),
        meta: { title: '个转企查看详情', activeMenu: '/individualToEnterprise/enterpriselist' }
      }
    ]
  }
]
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authlogin',
    component: () => import('@/views/authlogin/index'),
    hidden: true
  },
  {
    path: '/blank',
    component: () => import('@/views/blank/blank'),
    hidden: true,
    meta: {
      keepAlive: false,
      roles: ['admin', 'person']
    }
  },
  // {
  //   path: '/retrievePassWord',
  //   component: () => import('@/views/retrievePassWord/index'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
  // {
  //   path: '/person',
  //   component: Layout,
  //   redirect: '/person/dashboard',
  //   children: [
  //     {
  //       path: '/person/dashboard',
  //       component: () => import('@/views/p-dashboard/index'),
  //       meta: {
  //         keepAlive: false,
  //         icon: 'dashboard',
  //         title: '首页',
  //         roles: ['person']
  //       },
  //       name: 'Dashboard'
  //     }
  //   ],
  //   meta: {
  //     keepAlive: false,
  //     title: '首页',
  //     roles: ['person']
  //   }
  // }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
