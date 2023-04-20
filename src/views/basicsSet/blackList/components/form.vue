<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" label-width="160px" :rules="rules">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="10">
          <el-form-item v-if="isSystem()" label="客户名称:" prop="custId" >
            <el-select
              v-model="customerForm.custId"
              filterable
              value-key="id"
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              :loading="loadingUser"
              :disabled="disabledBox"
              clearable
              placeholder="请输入客户名称"
            >
              <el-option
                v-for="item in userNameList"
                :key="item.createTime"
                :label="item.customerName"
                :value="item"
              />
            </el-select>
            <span style="margin-left: 20px">
              <el-checkbox v-model="customerForm.allUser" @change="changeBox">全部客户</el-checkbox>
            </span>
          </el-form-item>
          <!--          <el-form-item label="账号:" prop="custAccount">
                      <el-select v-model="customerForm.custAccount" clearable placeholder="请选择客户账号">
                        <el-option
                          v-for="item in userNameList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>-->
          <el-form-item
            label="添加号码:"
            prop="phones"
            :rules="[
              {required: !customerForm.phoneFile.length,message: '请输入手机号码，使用英文逗号 “ , ” 隔开'},
              rules.phones[0]
            ]"
          >
            <el-input v-model="customerForm.phones" :rows="5" type="textarea" placeholder="请输入手机号码，使用英文逗号&quot;,&quot;隔开" />

            <div class="texttips">
              支持输入最多不超过50个手机号码，使用英文逗号 “ , ” 隔开
            </div>
          </el-form-item>
          <el-form-item
            label="文件上传:"
            prop="phoneFile"
            :rules="[
              {required: !customerForm.phones,message: '请上传文件'}
            ]"
          >
            <el-upload
              class="upload-demo"
              :auto-upload="false"
              action="#"
              accept=".txt"
              :limit="1"
              :file-list="customerForm.phoneFile"
              :on-change="onChange"
              :on-remove="onRemove"
            >
              <el-button type="primary">选择上传文件</el-button>
              <div slot="tip" class="el-upload__tip">支持txt文件上传，每行一号码，最多不超过20万</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="customerForm.remark" :rows="5" maxlength="100" type="textarea" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="subloading" type="primary" @click="subData('customerForm')">保存</el-button>
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
import {customerPage, customerPageNoAuth} from '@/api/customer'
import { validatePhoneLenFifty } from '@/utils/form'

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
        custId: [
          { required: true, message: '请选择客户名称' }
        ],
        custAccount: [
          { required: true, message: '请选择客户账号' }
        ],
        phones: [
          { validator: validatePhoneLenFifty }
        ]
      },
      disabledBox: false,
      loadingUser: false,
      numberIsRequired: true,
      customerForm: {
        ncustIdame: '',
        arcustAccountea: '',
        phones: '',
        remark: '',
        phoneFile: [],
        allUser: ''
      }
    }
  },
  created() {
    // 登录为个人用户时
    if (!this.isSystem()) {
      this.customerForm.custId = this.$store.state.user.id
    }
    console.log(this.$store.state.user.id)
  },
  methods: {
    chageText(val) {
      console.log(val)
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      this.customerForm.phoneFile = fileList
      // 上传文件后，手动验证
      // this.$refs.customerForm.validateField('phoneFile')
      this.$nextTick(() => {
        this.$refs.customerForm.validate()
      })
    },
    onRemove(file, fileList) {
      fileList.filter(item => {
        if (item.response) {
          item.url = item.response.data.url
        }
        return item
      })
      this.customerForm.phoneFile = fileList
      this.$nextTick(() => {
        this.$refs.customerForm.validate()
      })
    },
    customerPageData(par) {
      return new Promise(resolve => {
        customerPageNoAuth(par).then(res => {
          resolve(res.data)
        })
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loadingUser = true
        this.customerPageData({
          customerName: query,
          ckStatus: 2,
          pageNum: 1,
          pageSize: 10
        }).then(res => {
          // console.log(res)
          this.userNameList = res.records
          this.loadingUser = false
        })
      } else {
        this.userNameList = []
      }
    },
    changeBox(val) {
      console.log(val)
      if (val) {
        this.disabledBox = true
        this.rules.custId[0].required = false
      } else {
        this.rules.custId[0].required = true
        this.disabledBox = false
      }
    },
    // 保存
    subData(formName) {
      this.$refs[formName].validate((valid) => {
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
