<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <el-form ref="customerForm" :model="customerForm" label-width="120px" :rules="rules">
      <el-row :gutter="30">
        <el-col style="width: 500px">
          <el-form-item label="选择模板:" prop="templateType">
            <el-select v-model="customerForm.templateType" clearable placeholder="请选择模板" @change="changeType">
              <el-option
                v-for="item in flashShortType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="customerForm.templateType" label="选择模板:" prop="templateId">
            <el-select v-model="customerForm.templateId" clearable placeholder="请选择模板" @change="changeTem">
              <el-option
                v-for="(item,index) in templateOption"
                :key="index"
                :label="item.templateName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="匹配内容:" prop="templateKey">
            <el-select v-model="customerForm.templateKey" clearable placeholder="请选择匹配内容">
              <el-option
                v-for="item in flashShortContent"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="内容展示:" prop="content">
            <el-input v-model="customerForm.content" disabled type="textarea" placeholder="请输入内容" @input="chageText" />
            <div class="texttips">当前字数{{ customerForm.content.length }},计数{{ Math.ceil(customerForm.content.length / 70) }}条（扣减套餐赠送量)</div>
          </el-form-item>
          <el-form-item label="接收号码:" prop="recPhones">
            <el-input v-model="customerForm.recPhones" show-word-limit :rows="5" type="textarea" placeholder="请输入正确的手机号码，使用英文逗号 “ , ” 隔开'" />
            <div class="texttips">
              最大支持配置10个接收号码
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="butList">
        <el-button :loading="subloading" type="primary" @click="subData">保存</el-button>
        <el-button @click="goReturn">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { templatePage } from '@/api/customer'
import { bscruleAddContent, bscruleDetail } from '@/api/settings'
import { validatePhoneLenTen } from '@/utils/form'
export default {
  mixins: [data],
  props: {
    statusText: {
      type: String,
      default: '新增'
    }
  },
  data() {
    return {
      templateOption: [],
      customerForm: {
        content: '',
        custId: '',
        recPhones: '',
        ruleId: '',
        templateId: '',
        templateKey: '',
        templateType: ''
      },
      detailData: null,
      rules: {
        templateType: [
          { required: true, message: '请选择模板类型' }
        ],
        templateId: [
          { required: true, message: '请选择模板' }
        ],
        templateKey: [
          { required: true, message: '请选择匹配内容' }
        ],
        content: [
          { required: true, message: '内容展示不能为空' }
        ],
        recPhones: [
          { required: true, message: '接收号码不能为空' },
          { validator: validatePhoneLenTen }
        ]
      }
    }
  },
  created(){
    this.bscruleDetailData()
  },
  methods: {

    // 规则配置 详情
    bscruleDetailData() {
      bscruleDetail({ id: this.$route.query.id }).then(res => {
        this.detailData = res.data
      })
    },
    // 选择模板类型
    changeType(val) {
      this.customerForm.templateId = ''
      this.templatePageData(val)
    },
    changeTem(val) {
      const item = this.templateOption.find(item => {
        return val === item.id
      })
      this.customerForm.content = item.templateContent
    },
    // 获取模板列表
    templatePageData(value) {
      const par = {
        ckStatus: 2,
        pageNum: 1,
        pageSize: 99999,
        templateType: value
      }
      templatePage(par).then(res => {
        this.templateOption = res.data.records
        console.log(res)
      })
    },
    chageText(val) {
      console.log(val)
    },
    // 保存
    subData() {
      this.$refs.customerForm.validate(value => {
        if (value) {
          if(this.detailData==null) this.$message.error('信息获取失败，请先刷新页面！')
          this.customerForm.ruleId = this.detailData.id
          this.customerForm.custId = this.detailData.custId
          const data = {
            ...this.customerForm
          }
          this.subloading = true
          bscruleAddContent(data).then(res => {
            this.subloading = false
            this.$message.success('操作成功！')
            this.goReturn()
          }).catch(e => {
            this.subloading = false
          })
        } else {

        }
      })
    }
  }
}
</script>

<style scoped>

</style>
