<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" label-width="160px" :rules="rules">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="10">
          <el-form-item
            label="添加号码:"
            prop="orderPhone"
            :rules="[{required: !customerForm.fileList.length,message: '请输入手机号码'}, {pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}(,1[3|4|5|6|7|8|9][0-9]\d{8})*$/, message: '请输入正确的手机号码并使用英文逗号 “ , ” 隔开' }]"
          >
            <el-input v-model="customerForm.orderPhone" type="textarea" placeholder="请输入手机号码并使用英文逗号 “ , ” 隔开" />
            <!--            <div class="texttips">-->
            <!--              -->
            <!--            </div>-->
          </el-form-item>
          <el-form-item
            label="文件上传:"
            prop="fileList"
            :rules="[
              {required: !customerForm.orderPhone,message: '请上传文件'}
            ]"
          >
            <el-upload
              class="upload-demo"
              action="#"
              :http-request="httpLoad"
              accept=".txt"
              :limit="1"
              :on-change="onChange"
              :file-list="customerForm.fileList"
            >
              <el-button type="primary">选择上传文件</el-button>
              <div slot="tip" class="el-upload__tip">支持txt文件上传，每行一号码，最多不超过20万</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="customerForm.remark" maxlength="100" type="textarea" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="subloading" type="primary" @click="subData">保存</el-button>
            <el-button @click="goReturn">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!--      <div class="butList">-->
      <!--        <el-button   @click="goReturn">取消</el-button>-->
      <!--        <el-button   @click="subData('customerForm')" :loading="subloading" type="primary">保存</el-button>-->
      <!--      </div>-->
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { isvalidCode } from '@/utils/validate'

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
      userNameList: [],
      rules: {
        orderPhone: [
          { required: true, message: '请输入' }
          // { require: false, trigger: 'blur', pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}(,1[3|4|5|6|7|8|9][0-9]\d{8})*$/, message: '请输入正确的手机号码并使用英文逗号 “ , ” 隔开' }
        ],
        fileList: [
          { required: true, message: '请上传' }
          // { required: false,trigger: 'blur',  validator: validateNum }
        ]
      },
      disabledBox: false,
      loadingUser: false,
      numberIsRequired: true,
      customerForm: {
        type: 1,
        orderPhone: '',
        remark: '',
        MultipartFile: '',
        fileList: []
      }
    }
  },
  methods: {
    chageText(val) {
      console.log(val)
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      if (fileList.length > 0) {
        this.numberIsRequired = false
      } else {
        this.numberIsRequired = true
      }
      this.customerForm.fileList = fileList
      this.customerForm.MultipartFile = file
      console.log(file)
      console.log(fileList)
    },
    httpLoad() {

    },

    // // 保存
    subData() {
      this.$refs.customerForm.validate((valid) => {
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
