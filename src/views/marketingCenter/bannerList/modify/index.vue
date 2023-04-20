<template>
  <div>
    <customer-form status-text="修改" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { bannerDetail, bannerEdit } from '@/api/settings'
  import { data } from '@/mixns/data'
  export default {
    mixins: [data],
    components: {
      customerForm
    },
    mounted() {
      // banner 详情
      this.bannerDetailData()
    },
    methods: {
      bannerDetailData() {
        bannerDetail({id: this.$route.query.id}).then(res => {
          let data = res.data
          data.upDownTime = []
          data.upDownTime[0] = data.startTime
          data.upDownTime[1] = data.endTime
          data.imgUrl = [{url: data.imgUrl}]
          data.orders = String(data.orders)
          this.$refs.form.customerForm = data
        })
      },
      // 获取新增数据
      subData(data) {
        this.$refs.form.subloading = true
        let par = {
          ...data
        }
        if (par.upDownTime.length) {
          par.startTime = par.upDownTime[0]
          par.endTime = par.upDownTime[1]
        }
        par.imgUrl = data.imgUrl[0].url
        delete  par.upDownTime
        bannerEdit(par).then(res => {
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
