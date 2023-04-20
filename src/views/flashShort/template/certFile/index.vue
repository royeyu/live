<template>
  <div class="xlxsFile app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="xlxsFile_form">
      <el-form ref="customerForm" :model="customerForm" :rules="rules" label-width="120px">
        <el-form-item label="营业执照: " prop="file1">
          <div class="xlxsFile_upload">
            <el-upload
              :file-list="customerForm.file1"
              class="avatar-uploader"
              :action="fileUrl"
              list-type="picture-card"
              :headers="{'Authorization': tokenData}"
              :on-remove="function (files) { return handleRemove(files, 1)}"
              :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 1)}"
              accept=".jpg,.jpeg,.png"
              :before-upload="function (files) { return beforeUpload(files)}"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :on-exceed="handleExceed"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="单位授权: " prop="file2">
          <div class="xlxsFile_upload">
            <el-upload
              :file-list="customerForm.file2"
              class="avatar-uploader"
              :action="fileUrl"
              list-type="picture-card"
              :headers="{'Authorization': tokenData}"
              :on-remove="function (files) { return handleRemove(files,2)}"
              :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList,2)}"
              accept=".jpg,.jpeg,.png"
              :before-upload="function (files) { return beforeUpload(files)}"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :on-exceed="handleExceed"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button :loading="subloading" type="primary" @click="subData">提交</el-button>
          <el-button @click="goReturn">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { getCertFile, templateAddFile, templateExport, uploadCertFile } from '@/api/customer'
import { download } from '@/utils/fileLoad'
import { getToken } from '@/utils/auth'

export default {
  name: 'XlxsFile',
  mixins: [data],
  data() {
    return {
      customerForm: {
        file1: [],
        file2: []
      },
      imageUrl: '',
      tokenData: '',
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        file1: [
          { required: true, message: '请选择上传营业执照图片', trigger: 'blur' }
        ],
        file2: [
          { required: true, message: '请选择上传单位授权图片', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.tokenData = getToken()
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getData() {
      getCertFile().then(res => {
        res.data.map((item) => {
          if (item.attachName == '营业执照') {
            this.customerForm.file1 = [
              { attachName: item.attachName, url: item.url }
            ]
          }else{
            this.customerForm.file2 = [
              { attachName: item.attachName, url: item.url }
            ]
          }
        })
      }).catch(e => {
      })
    },
    handleRemove(response, flag) {
      if (flag == 1) {
        this.customerForm.file1 = []
      } else {
        this.customerForm.file2 = []
      }
    },
    handleSuccess(response, file, fileList, flag) {
      fileList.filter(item => {
        if (item.response) {
          item.url = item.response.data.url
          item.attachName = flag == 1 ? '营业执照' : '单位授权'
        }
        return item
      })
      if (flag == 1) {
        this.customerForm.file1 = fileList
      } else {
        this.customerForm.file2 = fileList
      }
    },
    beforeUpload(file) {
      const isIMAGE = (file.type === 'image/jpg') || (file.type === 'image/jpeg') || (file.type === 'image/png')
      const inSize = file.size / 1024 / 1024 < 10
      if (file.type.indexOf('image') != -1 && !isIMAGE) {
        this.$message.error('上传图片文件仅支持JPG、JPEG、PNG格式')
        return false
      }
      if (!inSize) {
        this.$message.error('上传文件大小不能超过10MB')
        return false
      }
      return true
    },
    handleExceed(){
      this.$message.error('只能上传一张图片，请先删除原图片')
    },
    subData() {
      this.$refs['customerForm'].validate((valid) => {
        if (valid) {
          console.log(this.customerForm)
          const params = [
            { attachName: this.customerForm.file1[0].attachName, url: this.customerForm.file1[0].url },
            { attachName: this.customerForm.file2[0].attachName, url: this.customerForm.file2[0].url }
          ]
          uploadCertFile(params).then(res => {
            this.$message.success('操作成功')
            this.goReturn()
          }).catch(e => {
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.xlxsFile{
  &_upload{
    width: 400px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
