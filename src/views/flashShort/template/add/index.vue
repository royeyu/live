<template>
  <div>
    <customer-form ref="form" status-text="新增" @subData="subData" />
  </div>
</template>

<script>
import customerForm from '../../components/form'
import { templateAdd } from '@/api/customer'
import { data } from '@/mixns/data'
export default {
  components: {
    customerForm
  },
  mixins: [data],
  methods: {
    // 获取新增数据
    subData(data) {
      console.log(data)
      this.$refs.form.subloading = true
      templateAdd(data).then(res => {
        this.$refs.form.subloading = false
        // console.log(data)
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
