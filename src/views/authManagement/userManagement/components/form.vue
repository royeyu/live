<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customer" :model="customerForm" label-width="auto" :rules="rules">
      <el-row :type="'flex'" :justify="'center'">
        <el-col :span="10">
          <el-form-item label="用户组:" prop="roleId">
            <el-select v-model="customerForm.roleId" clearable placeholder="请选择用户组">
              <el-option
                v-for="item in userGroupOption"
                :key="item.value"
                :label="item.roleName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="账户:" prop="username">
            <el-input v-model="customerForm.username"  :disabled="editDisabled"  placeholder="请输入账户" />
          </el-form-item>
          <el-form-item label="联系人:" prop="realname">
            <el-input v-model="customerForm.realname" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item label="联系方式:" prop="phone">
            <el-input v-model="customerForm.phone" type="text" placeholder="请输入联系方式" />
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input type="textarea" :rows="5" v-model="customerForm.remark" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="subloading" type="primary" @click="subData('customer')">保存</el-button>
            <el-button @click="goReturn">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!--      <div class="butList">-->
      <!--        <el-button   @click="goReturn">取消</el-button>-->
      <!--        <el-button   :loading="subloading" @click="subData('customer')" type="primary">保存</el-button>-->
      <!--      </div>-->
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { roleQueryForList } from '@/api/system'
import {validatePhoneOrTel, validChineseName, validRPhone, validUsername} from '@/utils/form'

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
      editDisabled: false,
      subloading: false,
      userGroupOption: [],
      shengOption: [],
      shiOption: [],
      rules: {
        roleId: [
          { required: true, message: '请选择用户组' }
        ],
        username: [
          { required: true, message: '请输入账户名' },
          { validator: validUsername, trigger: 'blur' }
        ],
        realname: [
          { required: false, message: '请输入联系人' },
          { validator: validChineseName, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式' },
          { validator: validatePhoneOrTel }
        ],
        remark: [
          { required: false, message: '请输入备注' },
          { max: 50, message: '最大长度不能超过50位' }
        ]
      },
      customerForm: {
        roleId: null,
        username: null,
        realname: null,
        phone: null,
        remark: null
      }
    }
  },
  mounted() {
    this.roleQueryForListData()
  },
  methods: {
    roleQueryForListData() {
      roleQueryForList().then(res => {
        this.userGroupOption = res.data.filter(item => {
          return item.status === 1
        })
        this.userGroupOption = this.userGroupOption.filter(item => {
          return item.id !== '10000'
        })
      })
    },
    chageText(val) {
      console.log(val)
    },
    // 保存
    subData(name) {
      console.log(this.$refs[name])
      this.$refs.customer.validate((valid) => {
        if (valid) {
          this.subloading = true
          this.$emit('subData', this.customerForm)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
