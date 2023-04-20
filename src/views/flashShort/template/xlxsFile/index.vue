<template>
  <div class="xlxsFile app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="xlxsFile_form">
      <el-form ref="customerForm" :model="customerForm" :rules="rules" label-width="120px">
        <el-form-item label="模板文件" prop="file">
          <div class="xlxsFile_upload">
            <el-upload
              ref="rebateUpload"
              class="form-upload"
              :file-list="customerForm.file"
              action="#"
              :auto-upload="false"
              :on-change="function (files, fileList) { return numberFileChange(files, fileList, 'file')}"
              accept=".xls,.xlsx"
              :limit="1"
              :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'file')}"
              :before-upload="function (files, fileList) { return localbeforeUpload(files, fileList, 'file')}"
              :on-exceed="function (files, fileList) { return localhandleExceed(files, fileList, 'file')}"
            >
              <el-button
                type="primary"
              ><i class="el-icon-upload el-icon--right" />选择上传文件</el-button>
              <span slot="tip" class="form-upload__tip ml10">
                <a href="./file/tempcomm.xls" download="公共模板.xls" style="margin-left: 30px;color:#409EFF;font-weight: bold;">公共模板下载</a>
                <a href="./file/tempset.xls" download="自定义模板.xls" style="margin-left: 30px;color:#409EFF;font-weight: bold;">自定义模板下载</a>
                <!--                <el-button type="text" @click="templateExportData(0)">下载公共模板</el-button>-->
                <!--                <el-button type="text" @click="templateExportData(1)">下载自定义模板</el-button>-->
                <div class="texttips">
                  说明：支持xls,xlsx格式
                </div>
              </span>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button :loading="subloading" type="primary" @click="subData">提交</el-button>
          <el-button @click="goReturn">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { templateAddFile, templateExport } from '@/api/customer'
import { download } from '@/utils/fileLoad'

export default {
  name: 'XlxsFile',
  mixins: [data],
  data() {
    return {
      customerForm: {
        file: []
      },
      rules: {
        file: [
          { required: true, message: '请选择上传文件', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    subData() {
      this.$refs['customerForm'].validate((valid) => {
        if (valid) {
          const params = {
            ...this.customerForm
          }
          this.templateAddFileData(params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    localbeforeUpload(files, fileList, ref) {
      console.log(1111)
      console.log(files)
      console.log(fileList)
      console.log(ref)
    },
    // 覆盖原文件
    localhandleExceed(files, fileList, ref) {
      console.log(files)
      this.$set(fileList[0], 'raw', files[0])
      this.$set(fileList[0], 'name', files[0].name)
      // this.$refs[ref].clearFiles() // 清除文件
      // this.$refs[ref].handleStart(files[0]) // 选择文件后的赋值方法
    },
    templateAddFileData(data) {
      this.subloading = true
      const params = new FormData()
      for (const dataKey in data) {
        if (dataKey === 'file') {
          if (data[dataKey].length > 0) {
            for (let i = 0; i < data[dataKey].length; i++) {
              params.append(dataKey, data[dataKey][i].raw)
            }
          }
        } else {
          params.append(dataKey, data[dataKey])
        }
      }
      templateAddFile(params).then(res => {
        this.subloading = false
        this.$message.success('操作成功')
        this.goReturn()
      }).catch(e => {
        this.subloading = false
      })
    },
    numberFileChange(files, fileList, ref) {
      this.customerForm[ref] = fileList
    },
    templateExportData(status) {
      templateExport({ status: status }).then(res => {
        download(res, '模板')
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
</style>
