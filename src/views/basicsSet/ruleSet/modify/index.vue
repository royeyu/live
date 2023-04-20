<template>
  <div>
    <customer-form ref="form" status-text="修改" @subData="subData" />
  </div>
</template>

<script>
import customerForm from '../components/form'
import { bscruleDetail, bscruleEdit } from '@/api/settings'
import { data } from '@/mixns/data'
export default {
  components: {
    customerForm
  },
  mixins: [data],
  created() {
    // 规则配置 详情
    this.bscruleDetailData()
  },
  methods: {
    // 规则配置 详情
    bscruleDetailData() {
      bscruleDetail({ id: this.$route.query.id }).then(async res => {
        this.$refs.form.editDisabled = true
        const data = { ...res.data }
        data.weekOfDay = data.weekOfDay.split(',')
        data.hourOfDay = data.hourOfDay.split('-')
        data.startTime = data.hourOfDay[0] + ':00'
        data.endTime = data.hourOfDay[1] + ':00'
        // data.custId = data.custIdStr
        this.$refs.form.remoteMethod(data.customerName)

        //通过fusionServiceFlag判断是否为融合服务类型
        const cacheid = await this.$refs.form.getServiceTypeList()

        // 当规则对象 为 群组号码时,
        if (data.triggerTarget == 2) {
          if (data.whetherFusionService != '0' && data.whetherFusionService != ''){
            // 如果是融合服务，取融合服务id
            this.$refs.form.phoneGroupListData(data.custId, cacheid)
          }else{
            this.$refs.form.phoneGroupListData(data.custId, data.busiType)
          }

          if (data.groupId != null && typeof (data.groupId) != 'string') data.groupId = data.groupId.toString()
        }

        // 原有逻辑为，whetherFusionService 为0时不是融合服务，为1时是融合服务
        // 现配合接口逻辑修改，为0时不是融合服务，大于时为融合
        if (data.whetherFusionService != '0' && data.whetherFusionService != '') {
          const cache = data.busiType
          data.busiType = cacheid.toString()
          data.whetherFusionService = cache.toString()
          this.$refs.form.typeChangeEdit(cacheid)
        }


        // 修改类型，使之与业务类型接口匹配，以便select初始化
        if (data.busiType != null && typeof (data.busiType) != 'string') data.busiType = data.busiType.toString()
        if (data.templateId != null && typeof (data.templateId) != 'string') data.templateId = data.templateId.toString()
        this.$refs.form.customerForm = data
        // 拉取模版关联的值太多，放最后
        this.$refs.form.templatePageData(this.$refs.form.customerForm.templateType)

        // const data = res.data
        // data.weekOfDay = data.weekOfDay.split(',')
        // data.hourOfDay = data.hourOfDay.split('-')
        // data.startTime = data.hourOfDay[0] + ':00'
        // data.endTime = data.hourOfDay[1] + ':00'
        // data.custId = String(data.custId)
        // this.$refs.form.remoteMethod(data.customerName)
        // this.$refs.form.templatePageData(data.templateType)
        // if (data.triggerTarget === 2) {
        //   this.$refs.form.phoneGroupListData(data.custId)
        // }
        // this.$refs.form.customerForm = data
        // this.$refs.form.editDisabled = true
      })
    },
    // 获取修改数据
    subData(data) {
      const par = {
        ...data
      }
      par.weekOfDay = data.weekOfDay.join(',')
      par.startTime = par.startTime.split(':')
      par.endTime = par.endTime.split(':')
      par.hourOfDay = par.startTime[0] + '-' + par.endTime[0]
      this.$refs.form.subloading = true
      bscruleEdit(par).then(res => {
        this.$refs.form.subloading = false
        this.$message.success('操作成功')
        this.goReturn()
      }).catch(e => {
        this.$refs.form.subloading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
