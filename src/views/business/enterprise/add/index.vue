<template>
  <div>
    <customer-form status-text="新增" @subData="subData"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../../components/form'
  export default {
    components: {
      customerForm
    },
    methods: {
      // 获取新增数据
      subData(data) {

      }
    }
  }
</script>

<style scoped>

</style>
