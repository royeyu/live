<template>
  <div>
    <customer-form status-text="新增" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { bannerAdd } from '@/api/settings'
  import { data } from '@/mixns/data'
  export default {
    mixins: [data],
    components: {
      customerForm
    },
    methods: {
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
        console.log(par)
        bannerAdd(par).then(res => {
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
