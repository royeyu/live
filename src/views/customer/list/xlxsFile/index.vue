<template>
  <div class="xlxsFile app-container">
    <div class="texttitle">
      {{$route.meta.title}}
    </div>
    <div class="xlxsFile_form">
      <el-form :model="form" :rules="rules" label-width="120px">
        <el-form-item label="客户信息文件" prop="file">
          <div class="xlxsFile_upload">
            <el-upload
              class="form-upload"
              :file-list="form.infoFile"
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
              <span slot="tip" class="form-upload__tip">
                <el-button type="text">下载模板</el-button>
                <div>
                   说明：支持xls,xlsx格式
                </div>
               </span>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="goReturn">取消</el-button>
          <el-button size="small" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { data } from '@/mixns/data'

  export default {
    name: 'xlxsFile',
    mixins: [data],
    data() {
      return {
        form: {
          infoFile: []
        },
        rules: {
          file: [
            { required: true, message: '请选择上传文件', trigger: 'blur' },
          ]
        }
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
