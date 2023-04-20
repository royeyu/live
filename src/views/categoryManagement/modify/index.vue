<template>
  <div>
    <customer-form status-text="修改" @subData="subData" ref="form"></customer-form>
  </div>
</template>

<script>
  import customerForm from '../components/form'
  import { Base64 } from 'js-base64'
  import { menuEdit } from '@/api/system'
  import { data } from '@/mixns/data'
  import da from 'element-ui/src/locale/lang/da'
  export default {
    mixins: [data],
    components: {
      customerForm
    },
    mounted() {
      let item = this.Base64decode(this.$route.query.item)
      this.$refs.form.customerForm = JSON.parse(item)
      this.$refs.form.disabledList = true
      console.log(JSON.parse(item))
    },
    methods: {
      Base64decode(val) {
        return Base64.decode(val);//解密
      },
      // 获取修改数据
      subData(data) {
        this.$refs.form.subloading = true
        console.log(data)
        // return
        menuEdit(data).then(res => {
          this.$message.success('操作成功')
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
