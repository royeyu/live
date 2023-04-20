<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" label-width="120px" :rules="rules">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="8">
          <el-form-item label="专题名称:" prop="subjectName">
            <el-input v-model="customerForm.subjectName" placeholder="请输入专题名称" />
          </el-form-item>
          <el-form-item label="业务类型:" prop="busiType">
            <el-select v-model="customerForm.busiType" clearable placeholder="请选择业务类型">
              <el-option
                v-for="item in bannerTypeLIstOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="来源:" prop="srcType">
            <el-select v-model="customerForm.srcType" clearable placeholder="请选择来源">
              <el-option
                v-for="item in bannerSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="显示位置:" prop="location">
            <el-radio-group v-model="customerForm.location">
              <el-radio v-for="(item,index) of templateInfoList" :key="index" :label="item.value">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="customerForm.location === 1" label="封面图:" prop="coverUrl">
            <el-upload
              class="avatar-uploader"
              :action="fileUrl"
              :show-file-list="true"
              :limit="1"
              accept=".jpg,.png"
              :on-preview="handlePictureCardPreview"
              :headers="{'Authorization': tokenData}"
              :file-list="customerForm.coverUrl"
              list-type="picture-card"
              :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'coverUrl')}"
              :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 'coverUrl')}"
              :before-upload="beforeAvatarUpload"
            >
              <i class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div class="texttips">说明：支持JPG、PNG格式,允许上传的文件最大值5MB</div>
          </el-form-item>
          <el-form-item v-if="customerForm.location === 1" label="子页面封面图:" prop="bannerUrl">
            <el-upload
              class="avatar-uploader"
              :action="fileUrl"
              :show-file-list="true"
              :limit="1"
              accept=".jpg,.png"
              :on-preview="handlePictureCardPreview"
              :headers="{'Authorization': tokenData}"
              :file-list="customerForm.bannerUrl"
              list-type="picture-card"
              :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'bannerUrl')}"
              :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 'bannerUrl')}"
              :before-upload="beforeAvatarUpload"
            >
              <i class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div class="texttips">说明：支持JPG、PNG格式,允许上传的文件最大值5MB</div>
          </el-form-item>
          <el-form-item v-if="customerForm.location === 1" label="上下架时间:" prop="upDownTime">
            <el-date-picker
              v-model="customerForm.upDownTime"
              type="datetimerange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="上架时间"
              end-placeholder="下架时间"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item v-if="customerForm.location === 1" label="专题封面描述:" prop="coverRemark">
            <el-input v-model="customerForm.coverRemark" placeholder="请输入专题封面描述" />
          </el-form-item>
          <el-form-item v-if="customerForm.location === 1" label="专题子banner描述:" prop="bannerRemark">
            <el-input v-model="customerForm.bannerRemark" placeholder="请输入专题子banner描述" />
          </el-form-item>
          <el-form-item label="排序:" prop="orders">
            <el-input v-model="customerForm.orders" type="number" placeholder="请输入排序" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="butList">
        <el-button :loading="subloading" type="primary" @click="subData">确定</el-button>
        <el-button @click="goReturn">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { checkTextName } from '@/utils/form'
import { getToken } from '@/utils/auth'

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
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl: '',
      tokenData: '',
      customerForm: {
        subjectName: '',
        busiType: '',
        srcType: '',
        location: '',
        coverRemark: '',
        bannerRemark: '',
        orders: '',
        upDownTime: [],
        coverUrl: [],
        bannerUrl: []
      },
      pickerOptions: {
        disabledDate(v) {
          return v.getTime() < new Date().getTime() - 86400000
        }
      },
      rules: {
        subjectName: [
          { required: true, message: '请输入专题名称', trigger: 'blur' },
          { validator: checkTextName }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        busiType: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        srcType: [
          { required: true, message: '请选择来源', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请选择显示位置', trigger: 'blur' }
        ],
        upDownTime: [
          { required: true, message: '请选择上下架时间', trigger: 'blur' }
        ],
        coverUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        bannerUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        coverRemark: [
          { required: false, message: '请输入专题封面描述', trigger: 'blur' },
          { max: 100, message: '字符长度不能超过100位' }
        ],
        bannerRemark: [
          { required: false, message: '请输入专题子banner描述', trigger: 'blur' },
          { max: 100, message: '字符长度不能超过100位' }
        ],
        orders: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { max: 4, message: '字符长度不能超过4位' }
        ]
      }
    }
  },
  mounted() {
    // 业务类型
    this.dictGetByCodeData('service_type').then(res => {
      this.bannerTypeLIstOption = res
    })
    this.tokenData = getToken()
  },
  methods: {
    handleSuccess(response, files, fileList, ref) {
      console.log(response)
      fileList.filter(item => {
        if (item.response) {
          item.url = item.response.data.url
          item.attachName = item.response.data.attachName
        }
        return item
      })
      this.customerForm[ref] = fileList
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    // 保存
    subData() {
      this.$refs['customerForm'].validate((valid) => {
        if (valid) {
          this.$emit('subData', this.customerForm)
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
