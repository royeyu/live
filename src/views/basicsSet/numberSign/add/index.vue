<template>
  <div>
    <customer-form ref="form" status-text="新增" @subData="subData" />
  </div>
</template>

<script>
import customerForm from '../components/form'
import { addNumSign } from '@/api/settings'
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
      // for (const dataKey in data) {
      //   if (dataKey === 'phones' || dataKey === 'remark') {
      //     params.append(dataKey, data[dataKey])
      //   } else if (dataKey === 'fileList' && data[dataKey].length > 0) {
      //     params.append('file', data[dataKey][0].raw)
      //   }
      //   if (dataKey === 'allUser') {
      //     if (!data[dataKey]) {
      //       params.append('custAccount', data['custId'].customerAccount)
      //       params.append('custId', data['custId'].id)
      //     }else {
      //       params.append('custId', '0')
      //       params.append('custAccount', '')
      //     }
      //   }
      // }
      if (data.fileList.length > 0) {
        params.append('file', data.fileList[0].raw)
      }
      params.append('type', 1)
      params.append('orderPhone', data['orderPhone'])
      params.append('remark', data['remark'])
      params.append('createBy', this.$store.state.user.name)

      this.$refs.form.subloading = true
      addNumSign(params).then(res => {
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
