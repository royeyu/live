<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" :label-width="'auto'" :rules="rules">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="10" :offset="1">
          <el-form-item
            label="手机号码"
            prop="phones"
            :rules="[
              {required: !customerForm.phoneFile.length,message: '请输入手机号码'},
              rules.phones[0]
            ]"
          >
            <el-input
              v-model.trim="customerForm.phones"
              maxlength="130"
              show-word-limit
              type="textarea"
              placeholder="请输入号码，示例: 18612345678,13812341234"
              :rows="5"
            />
          </el-form-item>
          <el-form-item
            label="上传文件"
            prop="phoneFile"
            :rules="[
              {required: !customerForm.phones,message: '请上传文件'}
            ]"
          >
            <div class="xlxsFile_upload">
              <el-upload
                ref="rebateUpload"
                class="form-upload"
                :file-list="customerForm.phoneFile"
                action="#"
                :auto-upload="false"
                :on-change="function (files, fileList) { return numberFileChange(files, fileList, 'phoneFile')}"
                accept=".xls,.xlsx"
                :limit="1"
                :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'phoneFile')}"
                :before-upload="beforeUpload"
                :on-exceed="function (files, fileList) { return handleExceed(files, fileList, 'phoneFile')}"
              >
                <el-button
                  type="primary"
                ><i class="el-icon-upload el-icon--right" />选择上传文件
                </el-button>
                <span
                  slot="tip"
                  class="form-upload__tip"
                >
                  <a href="./file/transfer.xls" download="携号转网号码模板.xls" style="margin-left: 50px;color:#409EFF;font-weight: bold;">模板下载</a>
                  <div class="texttips">说明：支持xls、xlsx格式，只能上传手机号码</div>
                </span>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="">
            <el-button :loading="subloading" type="primary" :style="'padding: 12px 30px;'" @click="subData">保存</el-button>
            <el-button @click="goReturn">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { customerPageNoAuth, getServiceList } from '@/api/customer'
import { validatePhoneAndTel, validatePhoneInfinity } from '@/utils/form'
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
      loadingS: false,
      customerForm: {
        phones: '',
        phoneFile: []
      },
      rules: {
        phones: [
          { validator: validatePhoneInfinity }
        ],
        phoneFile: [
          { required: true, message: '请上传' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    numberFileChange(files, fileList, ref) {
      this.customerForm[ref] = fileList
    },

    // 保存
    subData() {
      this.$refs['customerForm'].validate((valid) => {
        if (valid) {
          const params = {
            'phones': this.customerForm.phones=='' ? null : this.customerForm.phones.split(','),
            'phoneFile': this.customerForm.phoneFile
          }
          this.$emit('subData', params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
