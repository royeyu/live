<template>
  <div>
    <customer-form ref="form" status-text="新增" @subData="subData" />
  </div>
</template>

<script>
import customerForm from '../components/form'
import { blacklistAdd } from '@/api/settings'
import { data } from '@/mixns/data'
export default {
  components: {
    customerForm
  },
  mixins: [data],
  methods: {
    // 获取新增数据
    subData(data) {
      const params = new FormData()
      // console.log(data)
      for (const dataKey in data) {
        if (dataKey === 'phones' || dataKey === 'remark') {
          params.append(dataKey, data[dataKey])
        } else if (dataKey === 'phoneFile' && data[dataKey].length > 0) {
          params.append('file', data[dataKey][0].raw)
        }
        if (dataKey === 'allUser') {
          if (!data[dataKey]) {
            if (this.isSystem()) {
              params.append('custAccount', data['custId'].customerAccount)
              params.append('custId', data['custId'].id)
            } else {
              params.append('custId', data['custId'])
            }
          } else {
            params.append('custId', '0')
            params.append('custAccount', '')
          }
        }
      }
      this.$refs.form.subloading = true
      blacklistAdd(params).then(res => {
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
