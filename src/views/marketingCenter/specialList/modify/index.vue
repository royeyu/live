<template>
  <div>
    <customer-form status-text="修改" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { subjectDetail, subjectEdit } from '@/api/settings'
  import { data } from '@/mixns/data'
  export default {
    mixins: [data],
    components: {
      customerForm
    },
    mounted() {
      this.subjectDetailData()
    },
    methods: {
      subjectDetailData() {
        subjectDetail({id: this.$route.query.id}).then(res => {
          let data = res.data
          data.upDownTime = []
          if (data.startTime) {
            data.upDownTime[0] = data.startTime
          }
          if (data.endTime) {
            data.upDownTime[1] = data.endTime
          }
          data.orders = String(data.orders)
          if (data.bannerUrl) {
            data.bannerUrl = [{url: data.bannerUrl}]
          } else {
            data.bannerUrl = []
          }
          if (data.coverUrl) {
            data.coverUrl = [{url: data.coverUrl}]
          } else {
            data.coverUrl = []
          }
          this.$refs.form.customerForm = data
        })
      },
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
        if (params.upDownTime.length) {
          params.startTime = data.upDownTime[0]
          params.endTime = data.upDownTime[1]
          delete params.upDownTime
        }
        for (const paramsKey in params) {
          if (Array.prototype.isPrototypeOf(params[paramsKey])&&params[paramsKey].length === 0 ) {
            console.log('111', params[paramsKey])
            delete  params[paramsKey]
          }
        }
        this.$refs.form.subloading = true
        subjectEdit(params).then(res => {
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
