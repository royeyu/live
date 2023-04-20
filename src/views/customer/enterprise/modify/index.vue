<template>
  <div>
    <customer-form status-text="修改" @subData="subData"></customer-form>
  </div>
</template>

<script>
  import customerForm from '@/views/customer/components/form'
  export default {
    components: {
      customerForm
    },
    methods: {
      // 获取修改数据
      subData(data) {

      }
    }
  }
</script>

<style scoped>

</style>
