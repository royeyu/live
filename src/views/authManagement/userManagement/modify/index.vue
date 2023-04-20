<template>
  <div>
    <customer-form status-text="修改" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { userGet, userUpdate } from '@/api/system'
  import { data } from '@/mixns/data'

  export default {
    mixins: [data],
    components: {
      customerForm
    },
    mounted() {
      this.userGetData()
    },
    methods: {
      // 根据用户ID查询用户详情
      userGetData() {
        this.$refs.form.editDisabled = true
        userGet({ id: this.$route.query.id }).then(res => {
          this.$nextTick(() => {
            this.$refs.form.customerForm = res.data
          })
        })
      },
      // 获取修改数据
      subData(data) {
        userUpdate(data).then(res => {
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
