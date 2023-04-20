<template>
  <div>
    <customer-form ref="form" status-text="修改" @subData="subData" />
  </div>
</template>

<script>
import customerForm from '../../components/form'
import { customerDetail, customerEdit } from '@/api/customer'
import { data } from '@/mixns/data'
export default {
  components: {
    customerForm
  },
  mixins: [data],
  mounted() {
    this.customerDetailData()
  },
  methods: {
    // 获取修改数据
    customerDetailData() {
      customerDetail({ id: this.$route.query.id }).then(res => {
        const data = res.data
        data.fileList8 = []
        data.fileList9 = []
        data.fileList1 = []
        data.fileList2 = []
        data.fileList11 = []
        if (data.fileList != null && data.fileList.length) {
          data.fileList.map(item => {
            switch (item.attachType) {
              case 8:
                data.fileList8.push(item)
                break
              case 9:
                data.fileList9.push(item)
                break
              case 1:
                data.fileList1.push(item)
                break
              case 2:
                data.fileList2.push(item)
                break
              case 11:
                data.fileList11.push(item)
                break
            }
          })
        }
        this.$refs.form.customerForm = data
        this.$refs.form.isEdit = true
        if (data.province) {
          this.$refs.form.dictCityData(data.province)
        }
      })
    },
    subData(data) {
      customerEdit(data).then(res => {
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
