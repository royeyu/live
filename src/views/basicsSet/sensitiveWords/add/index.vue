<template>
  <div>
    <customer-form status-text="新增" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { keywordAdd } from '@/api/settings'
  import { data } from '@/mixns/data'
  export default {
    mixins: [data],
    components: {
      customerForm
    },
    methods: {
      // 获取新增数据
      subData(data) {
        let params = new FormData()
        for (let i = 0; i < data.length; i++) {
          params.append('file', data[i].raw)
        }
        keywordAdd(params).then(res => {
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
