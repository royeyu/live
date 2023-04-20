<template>
  <div>
    <customer-form status-text="新增" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../../components/form'
  import { custServiceAddCust } from '@/api/customer'
  import { data } from '@/mixns/data'

  export default {
    mixins: [data],
    components: {
      customerForm
    },
    methods: {
      // 获取新增数据
      subData(data) {
        data.busiType = data.list[0].busiType
        custServiceAddCust(data).then(res => {
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
