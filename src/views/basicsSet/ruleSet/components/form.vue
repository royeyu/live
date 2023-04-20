<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" label-width="auto" :rules="rules">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="10" :offset="1">
          <el-form-item v-if="isSystem()" label="客户名称:" prop="custId">
            <el-select
              v-model="customerForm.custId"
              filterable
              :disabled="editDisabled"
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loadingS"
              @change="customerChange"
            >
              <el-option
                v-for="(item,index) in customerNameoptions"
                :key="index"
                :label="item.customerName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="业务类型:" prop="busiType">
            <el-select v-model="customerForm.busiType" :disabled="editDisabled" placeholder="请选择业务类型" @change="typeChange">
              <el-option
                v-for="(item,index) of typeList"
                :key="index"
                :label="item.itemText"
                :value="item.itemValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="subTypeList!=null" label="" prop="whetherFusionService">
            <el-select v-model="customerForm.whetherFusionService" :disabled="editDisabled" placeholder="请选择业务类型" @change="subtypeChange">
              <el-option
                v-for="item in subTypeList"
                :key="item.itemValue"
                :label="item.itemText"
                :value="item.itemValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="isSystem()||isYunCustomer()" label="规则对象:" prop="triggerTarget">
            <el-radio-group v-model="customerForm.triggerTarget" :disabled="editDisabled" @change="groupChange">
              <el-radio
                v-for="(item,index) of basicsRuleObject"
                :key="index"
                :label="item.value"
                :disabled="item.value==2&&(customerForm.custId==''||customerForm.busiType==''||(subTypeList!=null&&customerForm.whetherFusionService=='') )"
              >{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!--          <el-form-item label="支持网别:" prop="supportNetPart">-->
          <!--            <el-radio-group v-model="customerForm.supportNetPart" :disabled="editDisabled" >-->
          <!--              <el-radio-->
          <!--                v-for="(item,index) of basicsSetNettype"-->
          <!--                :key="index"-->
          <!--                :label="item.value"-->
          <!--              >{{ item.label }}-->
          <!--              </el-radio>-->
          <!--            </el-radio-group>-->
          <!--          </el-form-item>-->
          <el-form-item v-if="customerForm.triggerTarget === 2" label="选择群组:" prop="groupId">
            <el-select
              v-model="customerForm.groupId"
              clearable
              placeholder="请选择群组"
            >
              <el-option
                v-for="item in groupList"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="发送周期:" prop="weekOfDay">
            <el-checkbox-group v-model="customerForm.weekOfDay">
              <el-checkbox v-for="(item,index) of basicsSetCycle" :key="index" :label="item.value" :value="item.value">{{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="发送时段:" prop="startTime">
            <el-time-select
              v-model="customerForm.startTime"
              placeholder="起始时间"
              value-format="HH"
              :picker-options="{
                start: '00:00',
                step: '00:60',
                end: '24:00',
              }"
            />
            <el-time-select
              v-model="customerForm.endTime"
              placeholder="结束时间"
              value-format="HH"
              :picker-options="{
                start: '00:00',
                step: '00:60',
                end: '24:00',
                minTime: customerForm.startTime
              }"
            />
            <div class="texttips">推送的起止时间</div>
          </el-form-item>
          <el-form-item label="发送频率:" prop="sendFreq">
            <el-select v-model="customerForm.sendFreq" clearable placeholder="请选择发送频率">
              <el-option
                v-for="item in basicsSetFrequency"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="触发机制:" prop="ruleMechanism">
            <el-select v-model="customerForm.ruleMechanism" clearable placeholder="请选择触发机制">
              <el-option
                v-for="item in basicsSetMechanism"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择模板:" prop="templateType">
            <el-select v-model="customerForm.templateType" placeholder="请选择模板" @change="changeType">
              <el-option
                v-for="item in flashShortType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="(item.value==2 && customerForm.custId=='')||customerForm.busiType==''"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="customerForm.templateType" label="" prop="templateId">
            <el-select v-model="customerForm.templateId" placeholder="请选择模板" @change="changeTem">
              <el-option
                v-for="(item,index) in templateOption"
                :key="index"
                :label="item.templateName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!--          <el-form-item v-if="customerForm.templateKey != '' || showkey" label="匹配内容:" prop="templateKey">-->
          <!--            <el-select v-model="customerForm.templateKey" clearable placeholder="请选择匹配内容">-->
          <!--              <el-option-->
          <!--                v-for="item in flashShortContent"-->
          <!--                :key="item.value"-->
          <!--                :label="item.label"-->
          <!--                :value="item.value"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <el-form-item label="内容展示:" prop="content">
            <el-input
              v-model="customerForm.content"
              disabled
              maxlength="300"
              :autosize="{ minRows: 2, maxRows: 6 }"
              show-word-limit
              type="textarea"
              placeholder="模板内容"
            />
            <div class="texttips">当前字数{{ customerForm.content.length }},计数{{ Math.ceil(customerForm.content.length / 70) }}条（扣减套餐赠送量)</div>
          </el-form-item>
          <el-form-item>
            <el-button :loading="subloading" type="primary" @click="subData">保存</el-button>
            <el-button @click="goReturn">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import {
  customerPageNoAuth,
  getServiceList,
  getTemplateInfo,
  groupListByServiceType,
  phoneGroupList,
  templatePage
} from '@/api/customer'
import { getProductServiceTypeDict } from '@/api/system'

export default {
  mixins: [data],
  props: {
    statusText: {
      type: String,
      default: '新增'
    }
  },
  data() {
    const timeText = (rule, value, callback) => {
      if (value && this.customerForm.endTime) {
        callback()
      } else {
        callback(new Error('请选择结束时间！'))
      }
    }
    return {
      loadingS: false,
      editDisabled: false,
      customerNameoptions: [],
      customerForm: {
        custId: '',
        busiType: '',
        triggerTarget: '',
        groupId: '',
        weekOfDay: [],
        startTime: '',
        endTime: '',
        sendFreq: '',
        ruleMechanism: '',
        templateType: '',
        templateId: '',
        templateKey: '',
        content: '',
        whetherFusionService: '',
        supportNetPart: ''
      },
      templateOption: [],
      rules: {
        custId: [
          { required: true, message: '请输入客户名称' }
        ],
        busiType: [
          { required: true, message: '请选择业务类型' }
        ],
        triggerTarget: [
          { required: true, message: '请选择规则对象' }
        ],
        groupId: [
          { required: true, message: '请选择群组' }
        ],
        weekOfDay: [
          { required: true, message: '请选择发送周期' }
        ],
        startTime: [
          { required: true, message: '请选择起始时间' },
          { validator: timeText }
        ],
        sendFreq: [
          { required: true, message: '请选择发送频率' }
        ],
        ruleMechanism: [
          { required: true, message: '请选择触发机制' }
        ],
        templateType: [
          { required: true, message: '请选择模板类型' }
        ],
        templateId: [
          { required: true, message: '请选择模板' }
        ],
        templateKey: [
          { required: true, message: '请选择匹配内容' }
        ],
        // content: [
        //   { required: true, message: '请输入模板内容' }
        // ],
        whetherFusionService: [
          { required: true, message: '请选择业务类型' }
        ],
        supportNetPart: [
          { required: true, message: '请选择支持网别' }
        ]
      },
      typeList: [],
      subTypeList: null,
      groupList: null,
      showkey: false
    }
  },
  created() {
    // 登录为个人用户时
    if (!this.isSystem()) {
      this.customerForm.triggerTarget = 1
      this.customerForm.custId = this.$store.state.user.id
      this.customerChange(this.customerForm.custId)
    }
    // // 业务类型
    // this.dictGetByCodeData('service_type').then(res => {
    //   this.businessChildStatusOption = res
    // })
    // 获取群组列表
  },
  mounted() {
    // 新增时，周期和时段的默认值
    if (!this.editDisabled) {
      this.$nextTick(() => {
        this.customerForm.weekOfDay = ['1', '2', '3', '4', '5', '6', '7'],
        this.customerForm.startTime = '08:00'
        this.customerForm.endTime = '20:00'
      })
    }
  },
  methods: {
    // 远程搜索客户名称
    remoteMethod(query) {
      if (query !== '') {
        this.loadingS = true
        const parame = {
          customerName: query,
          ckStatus: 2,
          pageNum: 1,
          pageSize: 20
        }
        customerPageNoAuth(parame).then(res => {
          this.loadingS = false
          this.customerNameoptions = res.data.records
        })
      }
    },
    changeTem(val) {
      const item = this.templateOption.find(item => {
        return val === item.id
      })
      if (item.templateKey !== '') {
        this.showkey = true
      } else {
        this.showkey = false
        this.customerForm.templateKey = ''
      }
      // console.log(item)
      this.customerForm.content = item.templateContent
    },
    // 选择模板类型
    changeType(val) {
      // 清空模版id
      this.customerForm.templateId = ''
      // 清空匹配内容
      this.customerForm.templateKey = ''
      this.templatePageData(val)
    },
    // 切换客户名称获取业务类型- 初始化对应的字段和子类型数组
    customerChange(val) {
      // 清空群组号码列表
      this.groupList = null
      // 清空表单值 业务类型
      this.customerForm.busiType = ''
      // 清空表单值 融合字段
      this.customerForm.whetherFusionService = ''
      // 清空表单值 模版类型
      this.customerForm.templateType = ''
      // 清空表单值 模版id
      this.customerForm.templateId = ''
      // 清空表单值 群组id
      this.customerForm.groupId = ''
      // 清空表单值 规则对象
      this.customerForm.triggerTarget = ''
      // 清空模版列表
      this.templateOption = null
      // 清空子业务列表
      this.subTypeList = null

      return new Promise(resolve => {
        const parame = {
          id: val
        }
        getServiceList(parame).then(res => {
          this.typeList = res.data
          // 查找融合服务id，有子数组，child
          let cacheid
          this.typeList.map(item => {
            if (item.child != null) {
              cacheid = item.itemValue
            }
          })
          resolve(cacheid)
        })
      })
    },

    // 获取全部业务类型数据，配合后续编辑时，旧业务已不存在的显示
    getServiceTypeList() {
      return new Promise(resolve => {
        const params = {
          dictCode: 'service_type',
          subDictCode: 'fusion_service_type' }
        getProductServiceTypeDict(params).then(res => {
          this.typeList = res.data
          // 查找融合服务id，有子数组，child
          let cacheid
          this.typeList.map(item => {
            if (item.child != null) {
              cacheid = item.itemValue
            }
          })
          resolve(cacheid)
        })
      })
    },

    clickddd() {
      console.log(this.customerForm.busiType)
      console.log(this.typeList)
    },
    // 切换业务类型 - 无初始值时，每次都需要初始化子类型
    typeChange(val) {
      // 清空子业务列表
      this.subTypeList = null
      // 清空表单值 融合字段
      this.customerForm.whetherFusionService = ''
      // 清空表单值 模版类型
      this.customerForm.templateType = ''
      // 清空表单值 模版id
      this.customerForm.templateId = ''
      // 清空表单值 群组id
      this.customerForm.groupId = ''
      // 清空表单值 规则对象
      this.customerForm.triggerTarget = ''
      // 清空模版列表
      this.templateOption = null
      // 清空群组号码列表
      this.groupList = null
      this.typeChangeEdit(val)
    },
    // 切换子业务类型
    subtypeChange() {
      // 清空表单值 模版类型
      this.customerForm.templateType = ''
      // 清空表单值 模版id
      this.customerForm.templateId = ''
      // 清空表单值 规则对象
      this.customerForm.triggerTarget = ''
      // 清空模版列表
      this.templateOption = null
      // 清空群组号码列表
      this.groupList = null
      // 清空表单值 群组id
      this.customerForm.groupId = ''
    },
    // 切换业务类型  - 有初始值时
    typeChangeEdit(val) {
      let status = true
      this.typeList.map(item => {
        if (item.itemValue == val && item.child != null) {
          this.subTypeList = item.child
          status = false
        }
      })
      if (status) {
        this.subTypeList = null
      }
    },
    // 切换规则对象
    groupChange(val) {
      const type = this.customerForm.busiType
      // 无需判断融合子业务
      // if(this.subTypeList!=null){
      //   type = this.customerForm.whetherFusionService
      // }
      if (val == 2) {
        this.phoneGroupListData(this.customerForm.custId, type)
      }
    },
    // 获取模板列表
    templatePageData(value) {
      // console.log(this.customerForm.custId, 'www')
      // console.log(value, 'www')
      const par = {
        ckStatus: 2,
        templateType: value,
        custId: value == 2 ? this.customerForm.custId : '',
        busiType: this.customerForm.whetherFusionService !== '' && this.customerForm.whetherFusionService !== '0' ? this.customerForm.whetherFusionService : this.customerForm.busiType,
        fusionServiceFlag: this.customerForm.whetherFusionService !== '' && this.customerForm.whetherFusionService !== '0' ? 1 : 0
      }
      getTemplateInfo(par).then(res => {
        this.templateOption = res.data
        console.log(res)
      })
    },
    // 切换客户名称时，切换群组
    changeUsergroup() {
      if (this.customerForm.triggerTarget != 2) {
        return
      }
      this.customerForm.groupId = ''
      this.phoneGroupListData()
    },

    // 获取群组列表
    phoneGroupListData(id, type) {
      groupListByServiceType({ custId: id, serviceType: type }).then(res => {
        this.groupList = res.data
      })
    },
    chageText(val) {
      console.log(val)
    },
    // 保存
    subData() {
      // console.log(this.customerForm.weekOfDay)
      // return
      this.$refs.customerForm.validate(value => {
        if (value) {
          const parmdata = { ...this.customerForm }
          if (parmdata.whetherFusionService !== '' && parmdata.whetherFusionService !== '0') {
            parmdata.busiType = parmdata.whetherFusionService
          }
          const templateNo = this.templateOption.find(item => {
            return item.id === parmdata.templateId
          })

          parmdata.templateNo = templateNo.templateNo
          this.$emit('subData', parmdata)
        } else {

        }
      })
    }
  }
}
</script>

<style scoped>

</style>
