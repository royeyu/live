<template>
  <div>
    <customer-form status-text="新增" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { data } from '@/mixns/data'
  import { userCreate } from '@/api/system'
  export default {
    mixins: [data],
    components: {
      customerForm
    },

    methods: {
      // 获取新增数据
      subData(data) {
        let params = {
          ...data
        }
        userCreate(params).then(res => {
          this.$message.success('操作成功')
          this.goReturn()
          this.$refs.form.subloading = false
        }).catch(e => {
          this.$refs.form.subloading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
