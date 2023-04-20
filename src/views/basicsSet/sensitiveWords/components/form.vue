<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" :rules="rules" label-width="160px">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="10">
          <el-form-item label="客户名称:">
            <el-select v-model="customerForm.name" clearable placeholder="请选择客户名称">
              <el-option
                v-for="item in userNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="文件上传:" prop="fileList">
            <el-upload
              class="upload-demo"
              action="#"
              :auto-upload="false"
              accept=".xls,.xlsx"
              :limit="1"
              :on-exceed="onExceed"
              :on-progress="onPprogress"
              :on-change="onChange"
              :on-remove="onRemove"
              :file-list="customerForm.fileList"
            >
              <el-button type="primary"><i class="el-icon-upload el-icon--right" />选择上传文件</el-button>
              <span
                slot="tip"
                class="form-upload__tip"
              >
                  <a href="./file/sensitivewords.xls" download="敏感词模板.xls" style="margin-left: 50px;color:#409EFF;font-weight: bold;">模板下载</a>
                  <div class="texttips">说明：支持xls、xlsx格式</div>
                </span>
<!--              <div slot="tip" class="el-upload__tip">支持txt文件上传，每行一号码，最多不超过20万</div>-->
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button :loading="subloading" type="primary" @click="subData('customerForm')">保存</el-button>
            <el-button @click="goReturn">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
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
      userNameList: [
        {
          label: '全部客户',
          value: ''
        }
      ],
      rules: {
        fileList: [
          { required: true, message: '请上传文件' }
        ]
      },
      customerForm: {
        name: '',
        fileList: []
      }
    }
  },
  methods: {
    chageText(val) {
      console.log(val)
    },
    httpLoad() {
      console.log(this.fileList)
    },
    // 文件上传时的钩子
    onPprogress(event, file, fileList) {
      console.log(event, file, fileList)
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      this.customerForm.fileList = fileList
    },
    // 文件列表移除文件时的钩子
    onRemove(file, fileList) {
      this.customerForm.fileList = []
    },
    onExceed(files, fileList) {
      this.$message.warning(`一次只能上传 1 个文件`)
      // this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 保存
    subData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('subData', this.customerForm.fileList)
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
