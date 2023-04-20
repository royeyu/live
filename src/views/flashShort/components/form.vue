<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form ref="customerForm" :model="customerForm" label-width="120px" :rules="rules">
          <el-form-item v-if="!editDisabled && !isSystem()" label="指定">
            <el-button round size="small" :type="assign==1 ? 'primary':''" style="padding-left: 30px;padding-right: 30px;" @click="assignChange(1)">通用</el-button>
            <el-button round size="small" :type="assign==2 ? 'primary':''" style="padding-left: 30px;padding-right: 30px;" @click="assignChange(2)">专用</el-button>
          </el-form-item>
          <el-form-item v-if="!editDisabled&&assign==2&&assignPhones!='' && !isSystem()" label="专用号码">
            <span>{{ assignPhones }}</span>
          </el-form-item>
          <el-form-item v-if="isSystem()" label="模板类型" prop="templateType">
            <el-select v-model="customerForm.templateType" :disabled="editDisabled" placeholder="请选择模板类型" @change="tempChange">
              <el-option
                v-for="item in flashShortType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="isSystem()&&customerForm.templateType === 2" label="客户名称" prop="custId">
            <el-select
              v-model="customerForm.custId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loadingS"
              :disabled="editDisabled"
              @change="customerChange"
            >
              <el-option
                v-for="item in customerNameoptions"
                :key="item.id"
                :label="item.customerName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="业务类型" prop="busiType">
            <el-select v-model="customerForm.busiType" placeholder="请选择业务类型" :disabled="editDisabled" @change="typeChange">
              <el-option
                v-for="item in typeList"
                :key="item.itemValue"
                :label="item.itemText"
                :value="item.itemValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="busiSubTypeList!=null" label="" prop="fusionServiceFlag">
            <el-select v-model="customerForm.fusionServiceFlag" placeholder="请选择业务类型" :disabled="editDisabled" @change="bTchange">
              <el-option
                v-for="item in busiSubTypeList"
                :key="item.itemValue"
                :label="item.itemText"
                :value="item.itemValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="customerForm.templateType == 2 &&(customerForm.busiType == 1 || customerForm.fusionServiceFlag == 1)" label="信息类型:" prop="templateInfo">
            <el-radio-group v-model="customerForm.templateInfo" :disabled="editDisabled" @change="templateInfoChange">
              <template v-for="(item,index) of flashShortMsgType">
                <el-radio v-if="index<2" :key="index" :label="item.value">{{ item.label }} </el-radio>
              </template>
            </el-radio-group>
          </el-form-item>
          <!--          <el-form-item v-if="customerForm.templateType === 1" label="业务类型" prop="busiType">-->
          <!--            <el-select v-model="customerForm.busiType" remote placeholder="请选择业务类型" :disabled="editDisabled" @change="bTchange">-->
          <!--              <el-option-->
          <!--                v-for="item in TypeOPtion"-->
          <!--                :key="item.itemValue"-->
          <!--                :label="item.itemText"-->
          <!--                :value="item.itemValue"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item v-if="customerForm.templateType === 2" label="业务类型" prop="busiType">-->
          <!--            <el-select v-model="customerForm.busiType" placeholder="请选择业务类型" :disabled="editDisabled" @change="typeChange">-->
          <!--              <el-option-->
          <!--                v-for="item in typeList"-->
          <!--                :key="item.itemValue"-->
          <!--                :label="item.itemText"-->
          <!--                :value="item.itemValue"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item v-if="busiSubTypeList!=null && customerForm.templateType === 2" label="" prop="fusionServiceFlag">-->
          <!--            <el-select v-model="customerForm.fusionServiceFlag" placeholder="请选择业务类型" :disabled="editDisabled" @change="bTchange">-->
          <!--              <el-option-->
          <!--                v-for="item in busiSubTypeList"-->
          <!--                :key="item.itemValue"-->
          <!--                :label="item.itemText"-->
          <!--                :value="item.itemValue"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->

          <!--          <el-form-item label="短信模板" prop="smsBatchType">-->
          <!--            <el-select v-model="customerForm.smsBatchType" placeholder="请选择短信模板">-->
          <!--              <el-option-->
          <!--                v-for="item in msgTemplateOption"-->
          <!--                :key="item.value"-->
          <!--                :label="item.label"-->
          <!--                :value="item.value"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->

          <!--          <el-form-item label="信息类型" prop="templateInfo">-->
          <!--            <el-select v-model="customerForm.templateInfo" placeholder="请选择信息类型">-->
          <!--              <el-option-->
          <!--                v-for="item in flashShortMsgType"-->
          <!--                :key="item.value"-->
          <!--                :label="item.label"-->
          <!--                :value="item.value"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <!--                    <el-form-item label="选择群组:" prop="groupData">
            <el-select value-key="id" v-model="customerForm.groupData" clearable placeholder="请选择群组">
              <el-option
                v-for="item in basicsSetGroup"
                :key="item.id"
                :label="item.groupName"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="customerForm.templateName" placeholder="请输入模板名称" />
          </el-form-item>
          <el-form-item
            v-if="customerForm.templateType == 2"
            label="模板签名"
            prop="signInfoId"
            :rules="[{required: customerForm.templateInfo == 2,message: '请选择签名'}]"
          >
            <el-select v-model="customerForm.signInfoId" clearable placeholder="请选择模板签名">
              <el-option
                v-for="item in signatureList"
                :key="item.id"
                :value-key="item.id"
                :label="item.signName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="customerForm.signInfoId == -1" label="" prop="signName">
            <el-input v-model="customerForm.signName" placeholder="请输入签名" />
          </el-form-item>
          <el-form-item v-if="customerForm.signInfoId == -1" label="" prop="signInfoFilelist">
            <div class="xlxsFile_upload">
              <el-upload
                class="form-upload"
                :file-list="customerForm.signInfoFilelist||[]"
                :action="fileUrl"
                list-type="picture"
                :headers="{'Authorization': tokenData}"
                :on-remove="function (response) { return handleRemove(response, 'signInfoFilelist')}"
                :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 'signInfoFilelist')}"
                accept=".jpg,.png"
                :limit="1"
                :before-upload="(file)=>{return beforeUpload(file,1.5)}"
                :on-exceed="handleExceed"
              >
                <el-button
                  size="small"
                  type="primary"
                ><i class="el-icon-upload el-icon--right" />上传签名授权文件</el-button>
                <div
                  slot="tip"
                  class="texttips"
                >说明：支持JPG、PNG格式，允许上传的文件最大值10M</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item v-if="customerForm.templateInfo == 2" label="模板主题" prop="subjectName">
            <el-input v-model="customerForm.subjectName" placeholder="请输入模板主题" />
          </el-form-item>
          <el-form-item v-if="customerForm.templateInfo == 2" label="模板素材" prop="templateUrlList">
            <div class="xlxsFile_upload">
              <el-upload
                class="form-upload"
                :file-list="customerForm.templateUrlList || []"
                :action="fileUrl"
                list-type="text"
                :headers="{'Authorization': tokenData}"
                :on-remove="function (files, fileList) { return handleRemove(files, fileList, 'templateUrlList')}"
                :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList,'templateUrlList')}"
                accept=".jpg,.jpeg,.png,.gif,.mp3,.wav,.mp4,.3gp"
                :limit="1"
                :before-upload="beforeUploadTemplate"
                :on-exceed="handleExceed"
              >
                <el-button
                  size="small"
                  :type="customerForm.templateUrlList!=null && customerForm.templateUrlList.length>0 ? 'info' : 'primary'"
                ><i class="el-icon-upload el-icon--right" />上传文件</el-button>
                <div
                  slot="tip"
                  class="texttips"
                >说明：支持JPG、JPEP、PNG、GIF、MP3、WAV 、MP4、3GP格式，允许上传的文件最大值1.9MB</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="模板内容" prop="templateContent">
            <el-input
              v-model="customerForm.templateContent"
              maxlength="200"
              :rows="5"
              show-word-limit
              type="textarea"
              placeholder="请输入模板内容"
              @input="inPutText"
            />
            <div class="texttips">
              <p>当前字数 {{ customerForm.templateContent.length }} (70个字符计费1条，超过计为多条)</p>
              说明：如内容中需匹配共享号线用户的业务号码时，请在匹配内容处使用{}符号代替。
              例：【联通助理】{}客户经理为您服务，联通你我，让爱生长！关注“联通助理”公众号，畅享智慧通信。
            </div>
          </el-form-item>
          <el-form-item v-if="showkey" label="变量名称" prop="templateKey">
            <!--            <el-input v-model="customerForm.templateKey" placeholder="请输入变量名称" />-->
            <el-select v-model="customerForm.templateKey" clearable placeholder="请选择变量名称" @change="templatekeyChange">
              <el-option
                v-for="item in templateKeyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="isSystem()" label="短闪账号" prop="apiAccountId">
            <el-select v-model="customerForm.apiAccountId" placeholder="请选择短闪账号">
              <el-option
                v-for="item in AccountList"
                :key="item.id"
                :value-key="item.id"
                :label="`${item.appName}(${item.account})`"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <!--          <el-form-item label="模板ID" prop="templateNo">-->
          <!--            <el-input v-model="customerForm.templateNo" placeholder="请输入模板ID" />-->
          <!--          </el-form-item>-->
          <el-form-item>
            <el-button :loading="subloading" type="primary" @click="subData">保存</el-button>
            <el-button @click="goReturn">取消</el-button>
          </el-form-item>

        </el-form>
      </el-col>
      <el-col v-if="customerForm.templateInfo==2" :span="6" :offset="2">
        <p>模板预览</p>
        <!--        <div class="preview-wrapper">-->
        <!--          <p>{{customerForm.subjectName}}</p>-->
        <!--        </div>-->
        <div class="template-preview-wrapper">
          <div v-if="customerForm.subjectName!=''" class="preview-txt-wrapper">
            {{ customerForm.subjectName }}
            <div class="preview-mark-wrapper"><div class="preview-mark" /></div>
          </div>
          <div class="preview-file-wrapper">
            <div v-for="(item, index) in customerForm.templateUrlList" :key="index" class="preview-file-container">
              <img v-if="item.fileType == 1 || (item.type!=null &&item.type.indexOf('image') != -1)" :src="item.url">
              <video v-if="item.fileType == 2 || (item.type!=null &&item.type.indexOf('video') != -1)" :src="item.url" controls />
              <video v-if="item.fileType == 3 || (item.type!=null &&item.type.indexOf('audio') != -1)" :src="item.url" height="50" controls />
            </div>
          </div>
          <div v-if="customerForm.templateContent!=''" class="preview-txt-wrapper">
            【{{ signLabel }}】{{ customerForm.templateContent }}
            <div class="preview-mark-wrapper"><div class="preview-mark" /></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--      <div class="butList">-->
    <!--        <el-button :loading="subloading" type="primary" @click="subData">保存</el-button>-->
    <!--        <el-button @click="goReturn">取消</el-button>-->
    <!--      </div>-->
    <el-dialog title="设置专用" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :model="dialogForm" :rules="rules">
        <el-form-item v-if="dialogFormVisible" label="" prop="phones">
          <el-input v-model="dialogForm.phones" autocomplete="off" placeholder="请输入手机号码" />
        </el-form-item>
        <span>最多支持设置3个手机号码，多个手机号码请用英文逗号隔开</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit('dialogForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { checkTextName, validatePhoneLenThree, validtemplateFileList, validUsername, valitempContent } from '@/utils/form'
import {
  customerPageNoAuth,
  getCustSignList,
  getServiceList,
  phoneGroupList,
  templateAccountInfo,
  templateAccountList
} from '@/api/customer'
import { isvalidUsername } from '@/utils/validate'
import { getProductServiceTypeDict } from '@/api/system'
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
      loadingS: false,
      editDisabled: false,
      tokenData: '',
      customerNameoptions: [],
      basicsSetGroup: [],
      customerForm: {
        custId: '',
        smsBatchType: '',
        templateType: '',
        busiType: '',
        templateInfo: '',
        templateName: '',
        templateContent: '',
        apiAccountId: '',
        fusionServiceFlag: '',
        templateKey: '',
        subjectName: '',
        templateUrlList: [],
        signInfoId: '',
        signName: '',
        signInfoFilelist: []
      },
      rules: {
        smsBatchType: [
          { required: true, message: '请选择短信模板' }
        ],
        templateType: [
          { required: true, message: '请选择模板类型' }
        ],
        busiType: [
          { required: true, message: '请选择业务类型' }
        ],
        templateInfo: [
          { required: true, message: '请选择信息类型' }
        ],
        subjectName: [
          { required: true, message: '请输入模板主题' }
        ],
        custId: [
          { required: true, message: '请输入客户名称' }
        ],
        groupData: [
          { required: true, message: '请选择群组' }
        ],
        templateContent: [
          { required: true, message: '请输入模板内容' },
          // { min: 0, max: 200, message: '长度在200以内' },
          { validator: valitempContent }
        ],
        templateName: [
          { required: true, message: '请输入模板名称' },
          { validator: checkTextName }
        ],
        apiAccountId: [
          { required: true, message: '请选择能力开放平台账号' }
        ],
        busiAccount: [
          { required: true, message: '请选择模板账户' }
        ],
        templateNo: [
          { required: false, message: '请输入模板编号' },
          { pattern: /^\d{4,60}$/, message: '请输入4-60数字' }
        ],
        fusionServiceFlag: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        // templateKey: [
        //   { required: true, message: '请选择变量名称' },
        //   { validator: validUsername }
        // ],
        signInfoId: [
          { required: false, message: '请选择签名', trigger: 'blur' }
        ],
        templateUrlList: [
          { required: true, message: '请上传模板素材', trigger: 'blur' }
        ],
        phones: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhoneLenThree, trigger: 'blur' }
        ],
        signName: [
          { required: true, message: '请输入签名', trigger: 'blur' }
        ],
        signInfoFilelist: [
          { required: true, message: '请上传签名授权文件', trigger: 'blur' }
        ]
      },
      typeList: [],
      busiSubTypeList: null,
      TypeOPtion: [],
      AccountList: [],
      showkey: false,
      signatureList: [],
      assign: 1,
      assignPhones: '',
      dialogFormVisible: false,
      dialogForm: {
        phones: ''
      }
    }
  },
  computed: {
    signLabel() {
      let str = ''
      if (this.customerForm.signInfoId != -1) {
        this.signatureList.map((item) => {
          if (item.id == this.customerForm.signInfoId) {
            str = item.signName
          }
        })
      } else {
        str = this.customerForm.signName
      }
      return str
    }
  },
  created() {
    // 登录为个人用户时
    if (!this.isSystem()) {
      this.customerForm.templateType = 2
      this.customerForm.custId = this.$store.state.user.id
      this.customerChange(this.customerForm.custId)
    }
  },
  mounted() {
    this.tokenData = getToken()
    // 模板账户列表
    // this.templateAccountListData({ 'busitype': 1 })
  },
  methods: {
    assignChange(val) {
      if (val == 2) {
        this.dialogFormVisible = true
        if (this.assignPhones != '') {
          this.dialogForm.phones = this.assignPhones
        }
      } else {
        this.assign = val
      }

      // console.log(this.assign)
      // this.$forceUpdate()
    },
    dialogFormSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.assignPhones = this.dialogForm.phones
          this.assign = 2
          this.dialogFormVisible = false
        }
      })
    },
    templatekeyChange() {
      // 判断变量
      const Rexp = /{[\s\S]*}/
      if (Rexp.test(this.customerForm.templateContent)) {
        this.customerForm.templateContent = this.customerForm.templateContent.replace(Rexp, `{${this.customerForm.templateKey}}`)
      }
    },
    handleSuccess(response, file, fileList, ref) {
      fileList.filter(item => {
        if (item.response) {
          item.url = item.response.data.url
          item.attachName = item.response.data.attachName
          item.type = item.raw.type
        }
        return item
      })
      this.customerForm[ref] = fileList
    },
    handleRemove(response, ref) {
      this.customerForm[ref] = []
      if (ref == 'signInfoFilelist') {
        this.customerForm.signUrl = ''
      }
    },
    templateInfoChange() {
      let busiType = this.customerForm.busiType
      // 文本传1，数字短信传3
      let accountType = 1
      // 签名类型 文本 1，数字 2
      let signType = 1
      if (this.customerForm.templateInfo == 2) {
        accountType = 3
        signType = 2
      }
      // 挂机短信为短信，其他为闪信
      const smsType = 1
      if (this.customerForm.busiType == 7) {
        busiType = 1
      }
      this.templateAccountListData({ 'smsType': smsType, 'busiType': busiType, 'accountType': accountType })
      this.signatureListData(this.customerForm.custId, signType)
    },

    // 获取业务类型数据
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

    changeUser(val) {
      this.phoneGroupListData(val)
    },
    // 获取群组列表
    phoneGroupListData(val) {
      phoneGroupList({ custId: val }).then(res => {
        this.basicsSetGroup = res.data
      })
    },
    // 获取群组列表
    signatureListData(custid, type) {
      getCustSignList({ custId: custid, signType: type }).then(res => {
        this.signatureList = res.data
        // this.signatureList = this.signatureList.concat({ 'signName': '新建签名', 'id': '-1' })
        this.signatureList = [{ 'signName': '新建签名', 'id': '-1' }, ...this.signatureList]
      })
    },
    // 远程搜索客户名称
    remoteMethod(query) {
      // console.log(query)
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
          this.customerForm = { ...this.customerForm }
        })
      }
    },
    // 切换名称获取业务类型- 初始化对应的字段和子类型数组
    customerChange(val) {
      // 清空当前客户业务类型选项
      this.typeList = null
      // 清空表单值 业务类型
      this.customerForm.busiType = ''
      // 清空子业务类型选项
      this.busiSubTypeList = null
      // 清空表单值 是否融合
      this.customerForm.fusionServiceFlag = ''
      // 清空表单值 短闪账号
      this.customerForm.apiAccountId = ''
      // 清空短闪账号选项
      this.AccountList = null
      return new Promise(
        resolve => {
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
            this.customerForm = { ...this.customerForm }
            resolve(cacheid)
          })
        }
      )
    },
    // 切换模版时，将共用和多余的字段初始化
    tempChange() {
      // 清空当前客户id
      this.customerForm.custId = ''
      // 清空当前客户业务类型选项
      this.typeList = null
      // 清空表单值 业务类型
      this.customerForm.busiType = ''
      // 清空子业务类型选项
      this.busiSubTypeList = null
      // 清空表单值 是否融合
      this.customerForm.fusionServiceFlag = ''
      // 清空表单值 短闪账号
      this.customerForm.apiAccountId = ''
      // 清空短闪账号选项
      this.AccountList = null
      if (this.customerForm.templateType == 1) {
        this.getServiceTypeList()
      }
    },
    // 切换业务类型 - 无初始值时，每次都需要初始化子类型
    typeChange(val) {
      // console.log(val)
      this.typeChangeEdit(val)
      this.customerForm.fusionServiceFlag = ''
      this.customerForm.templateInfo = ''
      this.bTchange()
    },

    // 切换业务类型  - 有初始值时
    typeChangeEdit(val) {
      let status = true
      this.typeList.map(item => {
        if (item.itemValue == val && item.child != null) {
          this.busiSubTypeList = item.child
          status = false
        }
      })
      if (status) {
        this.busiSubTypeList = null
      }
    },
    // 模板账户列表
    templateAccountListData(params) {
      templateAccountInfo(params).then(res => {
        this.AccountList = res.data
        // console.log(res)
      })
    },
    inPutText() {
      // 判断变量
      const Rexp = /{[\s\S]*}/
      if (Rexp.test(this.customerForm.templateContent)) {
        this.showkey = true
      } else {
        this.showkey = false
        this.customerForm.templateKey = ''
      }
    },
    //

    // 融合服务切换
    bTchange() {
      this.customerForm.apiAccountId = ''
      this.customerForm.templateInfo = ''
      this.AccountList = null
      // busiType：（业务类型：因为模板对应业务类型是单一的，就是如果是融合服务，则业务类型对应的是子业务类型）；
      let busiType = this.customerForm.busiType
      // accountType：（账号类型：1-短信账号，2-信令账号，3-数字账号）除了数字短信模板是3，其他的是1，
      const accountType = 1
      // 签名类型 文本 1，数字 2
      const signType = 1
      // smsType：（1-短信，2-闪信）	，目前：除了挂机短信业务类型是1，其他都是2；
      let smsType = 2
      if (this.customerForm.busiType == 7 && this.customerForm.fusionServiceFlag == '') {
        return
      }
      // 融合服务取子业务类型
      if (this.customerForm.busiType == 7) {
        if (this.customerForm.fusionServiceFlag == 1) {
          busiType = 1
        } else {
          busiType = 2
        }
      }
      // smsType 除了挂机短信业务类型是1，其他都是2
      if (busiType == 1) {
        smsType = 1
      }
      // 当业务为来电名片时 或者公共模板时, 获取短闪账号
      if (busiType == 2 || this.customerForm.templateType == 1) {
        console.log(this.customerForm.busiType)
        console.log(1213)
        this.templateAccountListData({ 'smsType': smsType, 'busiType': busiType, 'accountType': accountType })
      }
      // 当自定义模板时,业务为来电名片时 获取签名
      if (busiType == 2 && this.customerForm.templateType == 2) {
        this.signatureListData(this.customerForm.custId, signType)
      }
    },

    // 保存
    subData() {
      // 判断重复签名
      if (this.signatureList.some((item) => { return item.signName == this.signatureName })) {
        this.$message({ type: 'error', message: '请勿重复创建相同签名!' })
        return
      }
      this.$refs['customerForm'].validate((valid) => {
        if (valid) {
          const params = {
            ...this.customerForm
          }
          if (!this.editDisabled) {
            if (this.assign == 1) {
              params.phones = ''
            } else {
              params.phones = this.assignPhones
            }
          }
          if (this.customerForm.fusionServiceFlag !== '') {
            params.busiType = this.customerForm.fusionServiceFlag
            params.fusionServiceFlag = 1
          }
          if (this.customerForm.templateInfo == '') {
            params.templateInfo = '1'
          }
          if (params.signInfoId == '-1') {
            params.signUrl = params.signInfoFilelist[0].url
          }
          delete params.signInfoFilelist

          // 判断变量
          const Rexp = /{[\s\S]*}/
          if (Rexp.test(params.templateContent)) {
            params.templateContent = params.templateContent.replace(Rexp, `{${params.templateKey}}`)
          }

          this.$emit('subData', params)
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
  .preview-wrapper{
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
    height: 600px;
    /*overflow-y: auto;*/
  }
  .template-preview-wrapper {
    width: 100%;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
    height: 600px;
    overflow: auto;
  }
  .preview-txt-wrapper {
    padding: 16px;
    margin-bottom: 15px;
    background-color: #ececec;
    border-radius: 14px;
    position: relative;
  }
  .preview-file-container {
    position: relative;
    margin: 10px 0;
  }
  .preview-file-container img {
    width: 100%;
    border-radius: 14px;
  }
  .preview-file-container video {
    width: 100%;
    border-radius: 14px;
  }
  .preview-mark-wrapper{
    position: absolute;
    left: -8px;
    bottom:-4px;
    transform: scale(0.4);
  }
  .preview-mark {
    position: relative;
    transform: rotate(-68deg);
  }
  .preview-mark:before {
    display: block;
    content: "";
    width: 35px;
    height: 38px;
    position: absolute;
    top: -17px;
    left: 5px;
    border-top-left-radius: 50px 50px;
    background-color: #fff;
    transform: rotate(-138deg);
    -webkit-transform: rotate(-138deg);
    -ms-transform: rotate(-138deg);
    -moz-transform: rotate(-138deg);
    -o-transform: rotate(-138deg);
    z-index: 9;
  }
  .preview-mark:after {
    display: block;
    content: "";
    width: 40px;
    height: 36px;
    position: absolute;
    border-bottom-left-radius: 50px 50px;
    background-color: #ececec;
  }

</style>
