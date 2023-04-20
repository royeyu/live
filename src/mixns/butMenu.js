export const butList = {
  data: () => ({}),
  beforeRouteLeave(to, from, next) {
    const parPath = [
      '/customer/customer/list', // 客户列表
      '/business/business/list', // 业务列表
      '/business/businessEnterprise/list', // 企业名片列表
      '/number/number/list', // 号码列表
      '/batchMessage/batchMessage/list', // 批量短信
      '/marketingCenter/timingMsg', // 定时短信
      '/marketingCenter/bannerList', // banner列表
      '/marketingCenter/specialList', // 专题列表
      '/flashShort/flashShortList', // 模板列表
      '/flashShort/flashShortEnterpriseList', // 企业名片模板
      '/basicsSet/ruleSet', // 规则配置
      '/basicsSet/pushFrequency', // 推送频次
      '/basicsSet/productManagement', // 产品管理
      '/basicsSet/sensitiveWords', // 敏感词
      '/basicsSet/blackList', // 黑名单
      '/statisticalReport/callRecord', // 呼叫记录
      '/statisticalReport/sendDetails', // 发送明细
      '/statisticalReport/SMSnotification', // 短信通知
      '/statisticalReport/orderDetails', // 订购用户明细
      '/categoryManagement/categoryManagement', // 分类列表
      '/authManagement/userManagement', // 用户管理
      '/authManagement/roleManagement', // 角色管理
      '/flashShort/pflashShortList', // 个人-模板列表
      '/basicsSet/pblackList' // 个人-黑名单列表
    ]
    if (parPath.indexOf(to.path) !== -1) {
      this.$store.dispatch('app/setinspectSchema', '')
    }
    next()
  },
  methods: {
    menubutscreen(model, type) {
      let menu = JSON.parse(localStorage.getItem('butMenu'))
      if(menu==null) return false
      let menuLIst = []
      menu.map(item => {
        if (item.name === model) {
          menuLIst.push(item)
        }
      })
      for (let i = 0; i < menuLIst.length; i++) {
        if (menuLIst[i].describe === type && menuLIst[i].type === '1') {
          return true
        }
      }
      return false
    }
  }
}
