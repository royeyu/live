<template>
  <div class="app-container">
    <continue-form status-text="列表续订" @subData="subData" ref="form"></continue-form>
  </div>
</template>

<script>
  import continueForm from '@/views/business/components/listContinueForm'
  import {custServiceAddCust, custServiceRenew} from '@/api/customer'
  import { data } from '@/mixns/data'

  export default {
    mixins: [data],
    components: {
      continueForm
    },
    methods: {
      // 获取修改数据
      subData(data) {
        this.$refs.form.subloading = true
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
