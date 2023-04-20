<template>
  <div>
    <group-form status-text="修改" @subData="subData"></group-form>
  </div>
</template>

<script>
  import groupForm from '../../components/groupForm'
  export default {
    components: {
      groupForm
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
