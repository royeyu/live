<template>
  <div>
    <customer-form ref="form" status-text="新增" @subData="subData" />
  </div>
</template>

<script>
import customerForm from '../components/form'
import { bscruleAdd } from '@/api/settings'
import { data } from '@/mixns/data'
export default {
  components: {
    customerForm
  },
  mixins: [data],
  methods: {
    // 获取新增数据
    subData(data) {
      const par = {
        ...data
      }
      par.weekOfDay = data.weekOfDay.join(',')
      par.startTime = par.startTime.split(':')
      par.endTime = par.endTime.split(':')
      par.hourOfDay = par.startTime[0] + '-' + par.endTime[0]
      delete par.startTime
      delete par.endTime
      this.$refs.form.subloading = true
      bscruleAdd(par).then(res => {
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
