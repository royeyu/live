<template>
  <div>
    <customer-form ref="form" status-text="修改" @subData="subData" />
  </div>
</template>

<script>
import customerForm from '../components/form'
import { productDetail, productEdit } from '@/api/settings'
import { data } from '@/mixns/data'
export default {
  components: {
    customerForm
  },
  mixins: [data],
  mounted() {
    this.productDetailData()
  },
  methods: {
    productDetailData() {
      productDetail({ id: this.$route.query.id }).then(async res => {
        res.data.smsNum = String(res.data.smsNum)
        res.data.busiType = res.data.busiType.toString()
        // /通过fusionServiceFlag判断是否为融合服务类型
        const cacheid = await this.$refs.form.getServiceTypeList()
        if(res.data.subBusiType!=""){
          res.data.subBusiTypeArr = res.data.subBusiType.split(',')
          this.$refs.form.typeChangeEdit(cacheid)
        }
        if (res.data.spareAppid != null && res.data.spareAppid != ''){
          res.data.spareAppidArr = res.data.spareAppid.split(',')
        }else{
          res.data.spareAppidArr=[]
        }
        if (res.data.billingType != null && typeof (res.data.billingType) != 'string') res.data.billingType = res.data.billingType.toString()
        this.$refs.form.customerForm = res.data
      })
    },
    // 获取修改数据
    subData(data) {
      this.$refs.form.subloading = true
      productEdit(data).then(res => {
        this.$refs.form.subloading = false
        this.$message.success('操作成功！')
        this.goReturn()
      })
    }
  }
}
</script>

<style scoped>

</style>
