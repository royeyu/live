<template>
  <div>
    <customer-form status-text="新增" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { subjectAdd } from '@/api/settings'
  import { data } from '@/mixns/data'
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
        if (params.bannerUrl.length) {
          params.bannerUrl = params.bannerUrl[0].url
        } else {
          params.bannerUrl = ''
        }
        if (params.coverUrl.length) {
          params.coverUrl = params.coverUrl[0].url
        } else {
          params.coverUrl = ''
        }
        if (params.upDownTime) {
          params.startTime = data.upDownTime[0]
          params.endTime = data.upDownTime[1]
          delete params.upDownTime
        }
        this.$refs.form.subloading = true
        subjectAdd(params).then(res => {
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
