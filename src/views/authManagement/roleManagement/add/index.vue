<template>
  <div>
    <customer-form ref="form" status-text="新增" @subData="subData" />
  </div>
</template>

<script>
import customerForm from '../components/form'
import { roleCreate } from '@/api/system'
import { data } from '@/mixns/data'

export default {
  components: {
    customerForm
  },
  mixins: [data],
  mounted() {
    this.$refs.form.getMenuTreeListData()
    this.$refs.form.getDataPermsListData()
  },
  methods: {
    // 获取新增数据
    subData(data) {
      console.log(data)
      const params = { ...data }
      params.resIds = params.resIds.join(',')
      this.roleCreateData(params)
    },
    // 新增角色
    roleCreateData(form) {
      roleCreate(form).then(res => {
        this.$refs.form.subloading = false
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
