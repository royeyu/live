<template>
  <div class="app-container">
    <continue-form status-text="续订" @subData="subData"></continue-form>
  </div>
</template>

<script>
  import continueForm from '@/views/business/components/continueForm'

  export default {
    components: {
      continueForm
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
