<template>
  <div>
    <customer-form ref="form" status-text="修改1" @subData="subData" />
  </div>
</template>

<script>
import customerForm from '../../components/form'
import { templateDetail, templateEdit } from '@/api/customer'
import { data } from '@/mixns/data'
export default {
  components: {
    customerForm
  },
  mixins: [data],
  data() {
    return {
      formData: null
    }
  },
  mounted() {
    this.templateDetailData()
  },
  methods: {
    templateDetailData() {
      this.$refs.form.editDisabled = true
      templateDetail({ id: this.$route.query.id }).then(async res => {
        const data = { ...res.data.detail }

        if (data.templateUrlList != null) {
          data.templateUrlList.map((item) => {
            item.name = decodeURIComponent(item.attachName.split('?')[0])
          })
        }

        this.$refs.form.remoteMethod(data.custName)

        // smsType : 短信  1  闪信 2
        // 挂机短信为短信，其他为闪信
        const smsType = data.busiType != 1 ? 2 : 1
        // 来电和挂短文本都传1，数字短信传3
        const accountType = data.templateInfo == 2 ? 3 : 1
        // 签名类型 文本 1，数字 2
        const signType = data.templateInfo == 2 ? 2 : 1

        this.$refs.form.templateAccountListData({ 'smsType': smsType, 'busiType': data.busiType, 'accountType': accountType })
        this.$refs.form.signatureListData(data.custId, signType)

        //  templateType 1 公共模版 - 拉取全部类型  2 自定义模版 - 通过用户id拉取所存在的类型
        // if (data.templateType == 2){
        //   // const cacheid = await this.$refs.form.customerChange(759752933797740544)
        //   const cacheid = await this.$refs.form.customerChange(data.custIdStr)
        //   // /通过fusionServiceFlag判断是否为融合服务类型
        //   if (data.fusionServiceFlag === '1') {
        //     const cache = data.busiType
        //     data.busiType = cacheid
        //     data.fusionServiceFlag = cache
        //     this.$refs.form.typeChangeEdit(cacheid)
        //   }
        // }else if(data.templateType == 1 ){
        // 编辑时，显示所有业务类型
        const cacheid = await this.$refs.form.getServiceTypeList()
        // /通过fusionServiceFlag判断是否为融合服务类型
        if (data.fusionServiceFlag === '1') {
          const cache = data.busiType
          data.busiType = cacheid
          data.fusionServiceFlag = cache
          this.$refs.form.typeChangeEdit(cacheid)
        }
        // }

        //判断变量
        const Rexp = /{[a-z]*}/
        if(Rexp.test(data.templateContent)){
          this.$refs.form.showkey = true
        }


        // 修改类型，使之与业务类型接口匹配，以便select初始化
        if (data.fusionServiceFlag != null && typeof (data.fusionServiceFlag) !== 'string') data.fusionServiceFlag = data.fusionServiceFlag.toString()
        if (data.busiType != null && typeof (data.busiType) !== 'string') data.busiType = data.busiType.toString()

        // 签名相关
        data.signInfoFilelist = []
        // data.signName = 'xinjian'
        // data.signUrl = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        if (data.signInfoId == '-1') {
          data.signInfoFilelist = [{ url: data.signUrl, isImage: true }]
        }
        this.$refs.form.customerForm = { ...data }
      })
    },
    // 获取修改数据
    subData(data) {
      this.$refs.form.subloading = true
      templateEdit(data).then(res => {
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
