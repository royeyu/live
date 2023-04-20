<template>
  <div>
    <customer-form status-text="新增" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { menuAdd } from '@/api/system'
  import { data } from '@/mixns/data'
  export default {
    mixins: [data],
    components: {
      customerForm
    },
    mounted() {
      let id = this.$route.query.id
      if (id) {

        this.$refs.form.customerForm.parentId = id
        this.$refs.form.disabledList = true
      }
    },
    methods: {
      // 获取新增数据
      subData(data) {
        let params = {
          ...data
        }
        params.parentId = data.parentId[data.parentId.length - 1]
        console.log(params)
        menuAdd(params).then(res => {
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
