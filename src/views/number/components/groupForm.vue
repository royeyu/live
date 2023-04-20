<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <el-form ref="customerForm" :model="customerForm" :rules="rules" label-width="120px" size="small">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="选择方式:" prop="name">
            <el-select v-model="customerForm.name" placeholder="请选择方式" @change="changeType">
              <el-option
                v-for="(item,index) of groupOption"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="群组名称:"
            prop="groupName"
          >
            <el-input
              v-if="customerForm.name === '0'"
              v-model="customerForm.groupName"
              placeholder="请输入群组名称"
            />
            <el-select
              v-else-if="customerForm.name === '2'"
              v-model="customerForm.groupName"
              placeholder="请选择群组名称"
              value-key="id"
            >
              <el-option
                v-for="(item,index) of groupSelectOption"
                :key="index"
                :label="item.groupName"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="butList">
        <el-button size="small" @click="goReturn">取消</el-button>
        <el-button size="small" :loading="subloading" type="primary" @click="subData">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { Base64 } from 'js-base64'
import { groupListByServiceType, phoneAddGroup, phoneGroupList} from '@/api/customer'

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
      guoupType: true,
      groupSelectOption: [],
      groupIdArr: [],
      groupOption: [
        {
          label: '新建群组',
          value: '0'
        },
        {
          label: '选择存在群组',
          value: '2'
        }
      ],
      customerForm: {
        name: '',
        groupName: ''
      },
      rules: {
        name: [
          { required: true, message: '请选择方式', trigger: 'blur' }
        ],
        groupName: [
          { required: true, message: '请输入或者选择', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.groupIdArr = JSON.parse(this.Base64decode(this.$route.query.id))
    this.phoneGroupListData()
  },
  methods: {
    //  号码管理 群组列表
    phoneGroupListData() {
      // phoneGroupList({ 'custId': JSON.parse(this.Base64decode(this.$route.query.cust)),serviceType:this.$route.query.type }).then(res => {
      groupListByServiceType({ 'custId': JSON.parse(this.Base64decode(this.$route.query.cust)),serviceType:this.$route.query.type }).then(res => {
        this.groupSelectOption = res.data
      })
    },
    // 号码管理 新增群组
    phoneAddGroupData() {
      const params = {
        'phoneIds': this.groupIdArr
      }
      if (this.customerForm.name === '0') {
        params.id = 0
        params.groupName = this.customerForm.groupName
        if (params.groupName.length < 2 || params.groupName.length > 14) {
          this.$message.warning('群组名称长度2-14个字符！')
          return
        }
      } else {
        params.id = this.customerForm.groupName.id
        params.groupName = this.customerForm.groupName.groupName
      }
      this.subloading = true
      phoneAddGroup(params).then(res => {
        this.subloading = false
        this.$message.success('操作成功！')
        this.goReturn()
      }).catch(e => {
        this.subloading = false
      })
    },
    Base64decode(val) {
      return Base64.decode(val)// 解密
    },
    changeType(val) {
      if (val === '0') {
        this.guoupType = false
      } else {
        this.guoupType = true
      }
      this.customerForm.groupName = ''
    },
    // 保存
    subData() {
      this.$refs.customerForm.validate((validate) => {
        if (validate) {
          this.phoneAddGroupData()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
