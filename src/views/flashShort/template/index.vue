<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item v-if="isSystem()" label="模板名称">
          <el-input v-model.trim="appform.templateName" clearable type="text" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item v-if="isSystem()" label="客户名称">
          <el-input v-model.trim="appform.custName" clearable type="text" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item v-if="isSystem()" label="创建日期">
          <el-date-picker
            v-model="generateDate"
            type="daterange"
            :picker-options="pickerOptions0"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item v-if="isSystem()" label="审核状态">
          <el-select v-model="appform.ckStatus" placeholder="请选择审核状态">
            <el-option
              v-for="item in dataOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="isSystem()" label="模板类型">
          <el-select v-model="appform.templateType" placeholder="请选择客户状态">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-if="menubutscreen('flashShortList','查询')&& isSystem()" type="primary" @click="searchData">查询</el-button>
          <el-button v-if="menubutscreen('flashShortList','导入')" type="primary" @click="goTo('/flashShort/flashShortList/import')">导入模板</el-button>
          <el-button v-if="menubutscreen('flashShortList','新增')" type="primary" @click="goTo('/flashShort/flashShortList/add')">新增模板</el-button>
          <el-button v-if="menubutscreen('flashShortList','查询资质文件')" type="success" @click="goTo('/flashShort/flashShortList/cert')">资质文件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
      >
        <template slot-scope="scope"><span>{{ scope.$index + (page.pageNum - 1) * page.pageSize + 1 }} </span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in dataExport"
        :key="index"
        align="center"
        :prop="item.value"
        :show-overflow-tooltip="item.overText"
        :label="item.label"
        :min-width="item.width"
      >
        <template slot-scope="scope">
          <span v-if="item.value === 'fusionServiceFlag'">{{ scope.row.fusionServiceFlag == 1 ? '是' : '否' }}</span>
          <span
            v-else-if="item.value === 'busiType'"
          >{{ filterName(scope.row[item.value], TypeLIstOption) }}
          </span>
          <span
            v-else-if="item.value === 'templateType'"
          >{{ filterName(scope.row[item.value], flashShortType) }}
          </span>
          <span v-else-if="item.value === 'ckStatus'">
            <span v-if="scope.row.ckStatus ==1 || scope.row.ckStatus ==2" class="color_n">{{ filterName(scope.row[item.value], flashShortShStatus) }}</span>
            <span v-else-if="scope.row.ckStatus ==-1 || scope.row.ckStatus ==-2" class="color_u">{{ filterName(scope.row[item.value], flashShortShStatus) }}</span>
            <span v-else>{{ filterName(scope.row[item.value], flashShortShStatus) }}</span>
          </span>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="250"
        align="center"
      >
        <template slot-scope="scope">
          <ColumnOperation :key="cokey+'-'+scope.row.id">
            <el-button v-if="scope.row.ckStatus == 99 && menubutscreen('flashShortList','初审')" size="mini" type="success" @click="adopt(scope.row,'初审')">初审</el-button>
            <!--            <el-button v-if="scope.row.ckStatus == 1 && menubutscreen('flashShortList','复审')" size="mini" type="success" @click="adoptS(scope.row,'复审')">复审</el-button>-->
            <el-button v-if="menubutscreen('flashShortList','查看')" size="mini" type="warning" @click="goTo('/flashShort/flashShortList/see',{id: scope.row.id})">查看
            </el-button>
            <el-button v-if="menubutscreen('flashShortList','编辑') &&  !isSystem() && (scope.row.ckStatus == -2 || scope.row.ckStatus == -1)" size="mini" type="primary" @click="goTo('/flashShort/flashShortList/update',{id: scope.row.id})">编辑
            </el-button>
            <el-button v-if="menubutscreen('flashShortList','编辑') &&  isSystem() && (scope.row.ckStatus == 99 || scope.row.ckStatus == -2 || scope.row.ckStatus == -1)" size="mini" type="primary" @click="goTo('/flashShort/flashShortList/update',{id: scope.row.id})">编辑
            </el-button>
<!--            <el-button v-if="menubutscreen('flashShortList','编辑') && !isSystem()&& (scope.row.ckStatus == -2 || scope.row.ckStatus == -1)" size="mini" type="primary" @click="goTo('/flashShort/flashShortList/update',{id: scope.row.id})">编辑-->
<!--            </el-button>-->
<!--            <el-button v-if="menubutscreen('flashShortList','编辑') && isSystem() && scope.row.ckStatus != 2" size="mini" type="primary" @click="goTo('/flashShort/flashShortList/update',{id: scope.row.id})">编辑-->
<!--            </el-button> -->
            <el-button v-if="menubutscreen('flashShortList','删除')" size="mini" type="danger" @click="delData(scope.row)">删除</el-button>
            <el-button v-if="!isSystem()" size="mini" type="primary" plain @click="setTemplatePhoneAll(scope.row.id)">通用</el-button>
            <el-button v-if="!isSystem()" size="mini" type="success" plain @click="setTemplatePhoneSome(scope.row.id)">专用</el-button>
          </ColumnOperation>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
    <el-dialog
      title="确定通过该模板吗？"
      :visible.sync="batchMessagedialog"
      width="500px"
      @close="handleClose"
    >
      <div>
        <el-form ref="statusForm" :model="statusForm" label-width="10px" :rules="rules">
          <el-form-item prop="ckStatus">
            <el-radio-group v-model="statusForm.ckStatus">
              <el-radio v-for="(item,index) of statusListText" :key="index" :label="item.value">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="statusForm.ckStatus === '-1'" prop="ckRemark">
            <el-input v-model="statusForm.ckRemark" :rows="3" type="textarea" placeholder="请输入拒绝理由" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchMessageCloce">取 消</el-button>
        <el-button v-prevent-re-click type="primary" @click="batchMessageSubmit('statusForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="设置专用" :visible.sync="dialogFormVisible">
      <el-form v-if="dialogFormVisible" ref="dialogForm" :model="dialogForm" :rules="rules">
        <el-form-item label="" prop="phones">
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
import { templateAudit, templateCheck, templateDel, templatePage, updateTemplatePhoneInfo } from '@/api/customer'

const exportData = [
  { label: '模板名称', value: 'templateName', width: 50, overText: true },
  { label: '业务类型', value: 'busiType', width: 40, overText: true },
  { label: '融合服务', value: 'fusionServiceFlag', width: 40, overText: true },
  { label: '客户名称', value: 'custName', width: 50, overText: true },
  { label: '模板类型', value: 'templateType', width: 40, overText: true },
  { label: '模板内容', value: 'templateContent', width: 100, overText: true },
  { label: '创建日期', value: 'createTime', width: 50, overText: true },
  { label: '模板状态', value: 'ckStatus', width: 40, overText: true }
]
const exportDataCust = [
  { label: '模板名称', value: 'templateName', width: 50, overText: true },
  { label: '模板内容', value: 'templateContent', width: 100, overText: true },
  { label: '创建日期', value: 'createTime', width: 50, overText: true },
  { label: '模板状态', value: 'ckStatus', width: 40, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'
import ColumnOperation from '@/components/ColumnOperation'
import { validatePhoneLenThree } from '@/utils/form'

export default {
  components: {
    ColumnOperation
  },
  mixins: [filter, data, butList],
  data() {
    return {
      // cokey 用来刷新ColumnOperation组件
      cokey: 0,
      TypeLIstOption: [],
      batchMessagedialog: false,
      statusText: '',
      statusId: '',
      statusForm: {
        ckStatus: '',
        ckRemark: ''
      },
      dialogFormVisible: false,
      dialogForm: {
        id: '',
        phones: ''
      },
      rules: {
        ckStatus: [
          { required: true, message: '请选择审核状态!', trigger: 'blur' }
        ],
        ckRemark: [
          { required: true, message: '请输入拒绝理由!', trigger: 'blur' }
        ],
        phones: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhoneLenThree, trigger: 'blur' }
        ]
      },
      appform: {
        templateName: null,
        custName: null,
        ckStatus: 0,
        templateType: 0
      },
      dataExport: exportData,
      dataOption: [
        {
          label: '全部',
          value: 0
        }
      ],
      statusOption: [
        {
          label: '全部',
          value: 0
        }
      ]
    }
  },
  created() {
    this.dataExport = this.isSystem() ? exportData : exportDataCust
    this.dictGetByCodeData('service_type').then(res => {
      this.TypeLIstOption = res
    })
    this.statusOption = this.statusOption.concat(this.flashShortType)
    this.dataOption = this.dataOption.concat(this.flashShortShStatus)
    const schema = this.$store.state.app.inspectSchema
    if (schema) {
      this.appform = schema
      this.page = schema
    }
    this.fetchData()
    console.log(this.$store.state.user)
  },
  methods: {
    handleClose() {
      this.$refs.statusForm.resetFields()
    },
    // 取消
    batchMessageCloce() {
      this.batchMessagedialog = false
    },
    // 设置通用
    setTemplatePhoneAll(id) {
      this.$confirm('确认设置为通用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.setTemplatePhone(id, '')
      }).catch(() => {})
    },
    setTemplatePhoneSome(id) {
      this.dialogFormVisible = true
      this.dialogForm.phones = ''
      this.dialogForm.id = id
    },
    dialogFormSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.setTemplatePhone(this.dialogForm.id, this.dialogForm.phones)
        }
      })
    },
    // 更新通专用
    setTemplatePhone(id, phone) {
      const params = {
        id: id,
        phones: phone
      }
      updateTemplatePhoneInfo(params).then(res => {
        if (this.dialogFormVisible) this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      })
    },
    // 确定
    batchMessageSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.statusText === '初审') {
            const params = {
              'ckRemark': this.statusForm.ckRemark,
              'ckStatus': this.statusForm.ckStatus,
              'id': this.statusId,
              'userName': this.$store.state.user.name
            }
            templateAudit(params).then(res => {
              this.batchMessagedialog = false
              this.fetchData()
              this.$message.success('操作成功！')
            })
          } else if (this.statusText === '复审') {
            const params = {
              'ckRemark': this.statusForm.ckRemark,
              'ckStatus': this.statusForm.ckStatus,
              'id': this.statusId,
              'userName': this.$store.state.user.name
            }
            templateCheck(params).then(res => {
              this.batchMessagedialog = false
              this.fetchData()
              this.$message.success('操作成功！')
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    adopt(item, text) {
      this.batchMessagedialog = true
      this.statusText = text
      this.statusId = item.id
    },
    adoptS(item, text) {
      this.batchMessagedialog = true
      this.statusText = text
      this.statusId = item.id
    },
    // 删除
    delData(item) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        templateDel({ id: item.id }).then(res => {
          this.fetchData()
          this.$message.success('操作成功！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        })
      })
    },
    reset(item) {
      this.$confirm('是否重置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '重置成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置!'
        })
      })
    },
    // 模板列表
    templatePageData(params) {
      templatePage(params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.cokey++
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    fetchData() {
      const params = {
        ...this.appform,
        ...this.page
      }
      if (this.generateDate) {
        params.beginTime = this.generateDate[0]
        params.endTime = this.generateDate[1]
      }
      this.listLoading = true
      this.templatePageData(params)
    }
  }
}
</script>
