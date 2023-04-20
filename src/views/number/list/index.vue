<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item v-if="isSystem()" label="客户名称">
          <el-input v-model.trim="appform.custName" clearable type="text" style="width: 240px" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="企业号码">
          <el-input v-model.trim="appform.phone" clearable type="text" style="width: 145px" placeholder="请输入企业号码" />
        </el-form-item>
        <el-form-item label="群组名称">
          <el-input v-model.trim="appform.groupName" clearable type="text" placeholder="请输入群组名称" />
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="appform.busiType" placeholder="请选择业务类型">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="appform.ckStatus" placeholder="请选择审核状态">
            <el-option
              v-for="item in examineTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="产品类型:">
                  <el-select v-model="appform.area" clearable placeholder="请选择产品类型">
                    <el-option
                      v-for="item in numberProductTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>-->
        <el-form-item label="创建日期:">
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

        <el-form-item>
          <el-button v-if="menubutscreen('number','查询')" type="primary" @click="searchData">查询</el-button>
          <el-button v-if="menubutscreen('number','新增')" type="primary" @click="goTo('/number/number/add')">新增号码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="appform">
      <el-form inline label-width="100px" size="small">
        <el-form-item>
          <el-button v-if="menubutscreen('number','批量审核')" type="primary" size="small" @click="allAdopt">批量审核</el-button>
          <el-button v-if="menubutscreen('number','批量删除')" type="danger" size="small" @click="allDel">批量删除</el-button>
          <el-button v-if="menubutscreen('number','新增群组')" type="success" size="small" @click="addGuoup">新增群组</el-button>
          <el-button v-if="menubutscreen('number','审核工具')" type="warning" size="small" @click="examineData">审核工具</el-button>
          <el-button v-if="menubutscreen('number','删除工具')" type="danger" size="small" @click="examineDelData">删除工具</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="tableData"
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
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
          <span
            v-if="item.value === 'busiType'"
          >{{ filterName(scope.row[item.value], bannerTypeLIstOption) }}</span>
          <span
            v-else-if="item.value === 'ckStatus'"
          >
            <span v-if="scope.row[item.value] === 99" plain>{{ filterName(scope.row[item.value], examineTypeOption) }}</span>
            <span v-else-if="scope.row[item.value] === 1" class="color_n">{{ filterName(scope.row[item.value], examineTypeOption) }}</span>
            <span v-else-if="scope.row[item.value] === -1" class="color_u">{{ filterName(scope.row[item.value], examineTypeOption) }}</span>
          </span>
          <span
            v-else-if="item.value === 'orderStatus'"
          >{{ filterName(scope.row[item.value], businessTypeOption) }}</span>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="230"
        align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.ckStatus === 99 && menubutscreen('number','审核')" size="mini" type="success" @click="adopt(scope.row)">审核
          </el-button>
          <el-button v-if="menubutscreen('number','查看')" size="mini" type="warning" @click="goTo('/number/number/see',{id: scope.row.id})">详情</el-button>
          <el-button v-if="menubutscreen('number','删除')" size="mini" type="danger" @click="delData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
    <el-dialog
      title="确定通过该数据吗？"
      :visible.sync="batchMessagedialog"
      width="500px"
      @close="handleClose"
    >
      <div>
        <el-form ref="statusForm" :model="statusForm" label-width="80px" :rules="rules">
          <el-form-item prop="ckStatus">
            <el-radio-group v-model="statusForm.ckStatus">
              <el-radio v-for="(item,index) of statusListText" :key="index" :label="item.value">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="statusForm.ckStatus === '-1'">
            <el-input v-model="statusForm.ckRemark" type="textarea" maxlength="50" placeholder="请输入拒绝理由" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="batchMessageCloce">取 消</el-button>
        <el-button v-prevent-re-click size="small" type="primary" @click="batchMessageSubmit('statusForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="审核工具"
      :visible.sync="examineDialog"
      width="900px"
      @close="examineDialogClose"
    >
      <div class="formWidth">
        <el-form :model="examineForm" label-width="80px" inline size="small">
          <!--          <el-form-item label="地市账户:" placeholder="请选择地市账户">
                      <el-select v-model="examineForm.admin">
                        <el-option v-for="(item,index) of adminOption" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>-->
          <el-form-item label="客户名称:" prop="custId">
            <el-select
              v-model="examineForm.custData"
              filterable
              remote
              value-key="id"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loadingS"
              class="select-input-wide"
              @change="chnageCustName"
            >
              <el-option
                v-for="item in customerNameoptions"
                :key="item.id"
                :label="item.customerName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="群组:">
            <el-select v-model="examineForm.groupName" placeholder="请选择群组">
              <el-option
                v-for="(item,index) of examineGroup"
                :key="index"
                :label="item.groupName"
                :value="item.groupName"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="shenHePageData">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="texttips">请输入客户名称，或者选择群组后搜索！</div>
        <el-table
          v-loading="listLoading"
          size="small"
          :data="examinetableData"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column
            v-for="(item, index) in examineTableRow"
            :key="index"
            align="center"
            :prop="item.value"
            :show-overflow-tooltip="item.overText"
            :label="item.label"
            :min-width="item.width"
          >
            <template slot-scope="scope">
              <span
                v-if="item.value === 'ckStatus'"
                class="color2"
              >{{ filterName(scope.row[item.value], examineTypeOption) }}</span>
              <span v-else>{{ scope.row[item.value] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="phoneBatchAuditData">审核通过</el-button>
        <el-button size="small" @click="examineDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除工具"
      :visible.sync="examineDelDialog"
      width="1100px"
    >
      <div class="formWidth">
        <el-form :model="examineDelForm" label-width="80px" inline size="small">
          <!--          <el-form-item label="地市账户:" placeholder="请选择地市账户">
            <el-select v-model="examineDelForm.admin">
              <el-option v-for="(item,index) of adminOption" :key="index" :label="item.label" :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="审核状态:">
            <el-select v-model="examineDelForm.ckStatus" placeholder="请选择审核状态">
              <el-option
                v-for="item in examineTypeOption.slice(1)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称:" prop="custId">
            <el-select
              v-model="examineDelForm.custData"
              filterable
              remote
              value-key="id"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loadingS"
              @change="chnageCustName"
            >
              <el-option
                v-for="item in customerNameoptions"
                :key="item.id"
                :label="item.customerName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="群组:">
            <el-select v-model="examineDelForm.groupName" clearable placeholder="请选择群组">
              <el-option
                v-for="(item,index) of examineGroup"
                :key="index"
                :label="item.groupName"
                :value="item.groupName"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="delSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="listLoading"
          :data="examineDelTableData"
          element-loading-text="Loading"
          border
          fit
          size="small"
          highlight-current-row
        >
          <el-table-column
            v-for="(item, index) in examineTableRow"
            :key="index"
            align="center"
            :prop="item.value"
            :show-overflow-tooltip="item.overText"
            :label="item.label"
            :min-width="item.width"
          >
            <template slot-scope="scope">
              <span
                v-if="item.value === 'ckStatus'"
              >{{ filterName(scope.row[item.value], examineTypeOption) }}</span>
              <span v-else>{{ scope.row[item.value] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="texttips">注：审批删除号码后，将无法恢复。</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="searchRel">确定删除</el-button>
        <el-button size="small" @click="examineDelDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  customerPage,
  phoneAudit, phoneBatchAudit, phoneBatchDelete,
  phoneDel,
  phoneGroupList,
  phonePage,
  templateAudit,
  templateCheck
} from '@/api/customer'

const exportData = [
  { label: '客户名称', value: 'custIdName', width: 50, overText: true },
  { label: '姓名', value: 'custName', width: 50, overText: true },
  // { label: '产品名称', value: 'productName', width: 30, overText: true },
  { label: '业务类型', value: 'busiTypeName', width: 30, overText: true },
  { label: '所属群组', value: 'groupName', width: 40, overText: true },
  { label: '企业号码', value: 'mobile', width: 50, overText: true },
  { label: '创建日期', value: 'createTime', width: 60, overText: true },
  { label: '审核状态', value: 'ckStatus', width: 30, overText: true }
]
const exportDataCust = [
  { label: '姓名', value: 'custName', width: 50, overText: true },
  // { label: '产品名称', value: 'productName', width: 30, overText: true },
  { label: '业务类型', value: 'busiTypeName', width: 30, overText: true },
  { label: '所属群组', value: 'groupName', width: 40, overText: true },
  { label: '企业号码', value: 'mobile', width: 50, overText: true },
  { label: '创建日期', value: 'createTime', width: 60, overText: true },
  { label: '审核状态', value: 'ckStatus', width: 30, overText: true }
]
const examineTableRowData = [
  { label: '客户名称', value: 'custIdName', width: 40, overText: true },
  { label: '审核状态', value: 'ckStatus', width: 40, overText: true },
  { label: '号码数量', value: 'phoneNumber', width: 40, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { Base64 } from 'js-base64'
import { butList } from '@/mixns/butMenu'

export default {
  mixins: [filter, data, butList],
  data() {
    return {
      statusForm: {
        ckStatus: '',
        ckRemark: ''
      },
      examineForm: {
        custData: {},
        groupName: '',
        busiType: 0,
        ckStatus: '99'
      },
      examineFormPage: {
        pageNum: 1,
        pageSize: 1
      },
      examineDelForm: {
        custData: {},
        groupName: '',
        busiType: 0,
        ckStatus: 99
      },
      examinetableData: [],
      examineDelTableData: [],
      examineTableRow: examineTableRowData,
      appform: {
        custName: '',
        phone: '',
        groupName: '',
        busiType: 0,
        ckStatus: 0
      },
      rules: {
        ckStatus: [
          { required: true, message: '请选择审核状态!', trigger: 'blur' }
        ]
      },
      typeOption: [
        {
          label: '全部',
          value: 0
        }
      ],
      examineDialog: false, // 审核工具
      examineDelDialog: false, // 删除工具
      batchMessagedialog: false,
      loadingS: false,
      dataExport: exportData,
      itemData: {},
      customerNameoptions: []
    }
  },
  created() {
    this.dataExport = this.isSystem() ? exportData : exportDataCust
    // 业务类型
    this.dictGetByCodeData('service_type').then(res => {
      this.typeOption = this.typeOption.concat(res)
    })
    // bannerTypeLIstOption
    this.$nextTick(() => {
      const schema = this.$store.state.app.inspectSchema
      if (schema) {
        this.appform = schema
        this.page = schema
      }
      this.fetchData()
    })
  },
  methods: {
    // 确定按条件审核
    phoneBatchAuditData() {
      const par = {
        ...this.examineForm,
        ...this.examineFormPage
      }
      par.custName = par.custData.customerName
      par.groupName = this.examineForm.groupName
      delete par.custData
      if (this.examinetableData.length <= 0) {
        this.$message.warning('请先按条件搜索出数据后操作！')
        return
      }
      phoneBatchAudit(par).then(res => {
        this.examineDialog = false
        this.fetchData()
        this.shenHePageData()
        this.$message.success('操作成功')
      })
    },
    // 审核工具 点击搜索
    shenHePageData() {
      this.examineFormPage.pageNum = 1
      if (this.examineForm.custData.customerName) {
        this.examinetableDataShenHeData()
      } else {
        this.$message.warning('请输入搜索条件！')
      }
    },
    // 点击新增群组按钮
    addGuoup() {
      const _selectData = this.$refs.tableData.selection
      // console.log(_selectData)
      if (_selectData.length) {
        if (_selectData.length > 1) {
          for (var i = 1; i < _selectData.length; i++) {
            if (_selectData[i].custIdName != _selectData[i - 1].custIdName) {
              this.$message.error('同一客户的相同业务类型才能添加同一群组！')
              return
            }
            if (_selectData[i].busiType != _selectData[i - 1].busiType) {
              this.$message.error('同一客户的相同业务类型才能添加同一群组！')
              return
            }
          }
        }
        const idArr = []
        _selectData.map(item => {
          idArr.push(item.id)
        })
        // console.log(_selectData[0])
        // return false
        this.goTo('/number/number/group', { id: this.base64Data(idArr), cust: this.base64Data(_selectData[0].custId), type: _selectData[0].busiType })
      } else {
        this.$message.warning('请从表格选择数据！')
      }
    },
    // 加密
    base64Data(val) {
      return Base64.encode(JSON.stringify(val))
    },
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
        customerPage(parame).then(res => {
          this.loadingS = false
          this.customerNameoptions = res.data.records
        })
      }
    },
    chnageCustName(val) {
      this.examineDelForm.groupName = ''
      this.examineForm.groupName = ''
      phoneGroupList({ custId: val.id }).then(res => {
        this.examineGroup = res.data
      })
    },
    handleClose() {
      this.resetForm('statusForm')
    },
    // 取消
    batchMessageCloce() {
      this.batchMessagedialog = false
    },
    // 确定
    batchMessageSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const params = {
            ...this.statusForm,
            ids: [this.itemData.id]
          }
          this.phoneAuditData(params).then(res => {
            this.batchMessagedialog = false
            this.successData()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 搜索条件 确定删除
    searchRel() {
      const par = {
        ...this.examineDelForm,
        ...this.examineFormPage
      }
      par.custName = par.custData.customerName
      delete par.custData
      if (this.examineDelTableData.length <= 0) {
        this.$message.warning('请先按条件搜索出数据后操作！')
        return
      }
      phoneBatchDelete(par).then(res => {
        this.examineDelDialog = false
        this.fetchData()
        this.delSearch()
        this.$message.success('操作成功')
      })
    },
    // 弹出审核工具
    examineData() {
      this.examineDialog = true
    },
    // 弹出删除工具
    examineDelData() {
      this.examineDelDialog = true
    },
    // 删除工具 点击搜索
    delSearch() {
      if (this.examineDelForm.custData.customerName) {
        this.examinetableDataDelData()
      } else {
        this.$message.warning('请输入客户名称！')
      }
    },
    examinetableDataDelData() {
      const par = {
        ...this.examineDelForm,
        ...this.examineFormPage
      }
      par.custName = par.custData.customerName
      delete par.custData
      this.listLoading = true
      this.examinetableDataShenHe(par).then(res => {
        this.listLoading = false
        this.examineDelTableData = res.data.records.filter(item => {
          item.phoneNumber = res.data.total
          return item
        })
      }).catch(e => {
        this.listLoading = false
      })
    },
    // 批量审核
    allAdopt() {
      const _selectData = this.$refs.tableData.selection
      if (_selectData.length) {
        const data = {}
        const arr = []
        _selectData.map(item => {
          arr.push(item.id)
        })
        data.ids = arr// .join(',')
        this.$confirm('确定审核通过？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '通过',
          cancelButtonText: '不通过'
        })
          .then(() => {
            data.ckStatus = 1
            this.phoneAuditData(data).then(res => {
              this.successData()
            })
          })
          .catch(action => {
            if (action === 'cancel') {
              // 点击不通过
              data.ckStatus = -1
              this.phoneAuditData(data).then(res => {
                this.successData()
              })
            } else {
            }
          })
      } else {
        this.$message.warning('请选择数据！')
      }
    },
    // 批量删除
    allDel() {
      const _selectData = this.$refs.tableData.selection
      if (_selectData.length) {
        this.$confirm('是否确认删除数据，删除后无法恢复！', '确定删除', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() => {
            const data = {}
            const arr = []
            _selectData.map(item => {
              arr.push(item.id)
            })
            data.ids = arr// .join(',')
            this.phoneDelData(data).then(res => {
              this.successData()
            })
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: '取消修改'
            })
          })
      } else {
        this.$message.warning('请选择数据！')
      }
    },
    adopt(item) {
      this.itemData = {
        ...item
      }
      this.batchMessagedialog = true
    },
    // 号码管理 审核
    phoneAuditData(par) {
      return new Promise((resolve, reject) => {
        phoneAudit(par).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    // 号码管理 删除
    phoneDelData(par) {
      return new Promise((resolve, reject) => {
        phoneDel(par).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    // 删除
    delData(item) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          ids: [item.id]
        }
        this.phoneDelData(params).then(res => {
          this.successData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败!'
        })
      })
    },
    phonePageData(par) {
      phonePage(par).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    examinetableDataShenHe(par) {
      return new Promise((resolve, reject) => {
        phonePage(par).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    examinetableDataShenHeData() {
      const par = {
        ...this.examineForm,
        ...this.examineFormPage
      }
      par.custName = par.custData.customerName
      par.groupName = this.examineForm.groupName
      delete par.custData
      this.listLoading = true
      this.examinetableDataShenHe(par).then(res => {
        this.listLoading = false
        this.examinetableData = res.data.records.filter(item => {
          item.phoneNumber = res.data.total
          return item
        })
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
      this.phonePageData(params)
    },
    examineDialogClose() {
      this.examineForm = {
        'custData': {},
        'groupName': '',
        'busiType': 0,
        'ckStatus': '99'
      }
      this.customerNameoptions = []
      this.examinetableData = []
    }
  }
}
</script>
