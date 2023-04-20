<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{$route.meta.title}}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form :model="customerForm" label-width="120px" size="small">
      <el-row :gutter="30">
        <el-col :span="8">
              <el-form-item label="客户名称:">
                <el-input v-model="customerForm.name" placeholder="请输入客户名称"></el-input>
              </el-form-item>
              <el-form-item label="客户账户:">
                <el-input v-model="customerForm.name" placeholder="请输入客户账户"></el-input>
              </el-form-item>
              <el-form-item label="单位地址:">
                <el-input v-model="customerForm.name" placeholder="请输入客户账户"></el-input>
              </el-form-item>
              <el-form-item label="单位简称:">
                <el-input v-model="customerForm.name" placeholder="请输入客户账户"></el-input>
              </el-form-item>
              <el-form-item label="客户经理:">
                <el-input v-model="customerForm.name" placeholder="请输入客户经理"></el-input>
              </el-form-item>
              <el-form-item label="经理号码:">
                <el-input v-model="customerForm.name" placeholder="请输入经理号码"></el-input>
              </el-form-item>
              <el-form-item label="联系人:">
                <el-input v-model="customerForm.name" placeholder="请输入联系人"></el-input>
              </el-form-item>
              <el-form-item label="联系号码:">
                <el-input v-model="customerForm.name" placeholder="请输入联系号码"></el-input>
              </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省份">
            <el-input v-model="customerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="市名">
            <el-input v-model="customerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-select v-model="customerForm.name">
              <el-option v-for="(item,index) of dataSourcesOption" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="营业执照">
            <div class="xlxsFile_upload">
              <el-upload
                class="form-upload"
                :file-list="customerForm.infoFile"
                ref="rebateUpload"
                action='#'
                :auto-upload='false'
                accept=".xls,.xlsx"
                :limit="1"
                :before-upload="beforeUpload"
                :on-exceed="function (files, fileList) { return handleExceed(files, fileList, 'rebateUpload')}"
              >
                <el-button size="small"
                           type="primary"><i class="el-icon-upload el-icon--right" />选择上传文件</el-button>
                <div slot="tip"
                     class="form-upload__tip">说明：支持PDF、JPG、PNG格式,允许上传的文件最大值10M</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="单位证明:">
            <div class="xlxsFile_upload">
              <el-upload
                class="form-upload"
                :file-list="customerForm.infoFile"
                ref="rebateUpload"
                action='#'
                :auto-upload='false'
                accept=".xls,.xlsx"
                :limit="1"
                :before-upload="beforeUpload"
                :on-exceed="function (files, fileList) { return handleExceed(files, fileList, 'rebateUpload')}"
              >
                <el-button size="small"
                           type="primary"><i class="el-icon-upload el-icon--right" />选择上传文件</el-button>
                <div slot="tip"
                     class="form-upload__tip">说明：支持PDF、JPG、PNG格式,允许上传的文件最大值10M</div>
              </el-upload>
            </div>

          </el-form-item>
          <el-form-item label="描述:">
            <el-input type="textarea" v-model="customerForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="butList">
        <el-button size="small"  :loading="subloading" @click="subData" type="primary">保存</el-button>
        <el-button size="small" @click="goReturn">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { data } from '@/mixns/data'
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
        customerForm: {
          name: ''
        }
      }
    },
    methods: {
      // 保存
      subData() {
        this.subloading = true
        this.$emit('subData',this.customerForm)
      }
    }
  }
</script>

<style scoped>

</style>
