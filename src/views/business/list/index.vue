<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item label="客户名称">
          <el-input v-model.trim="appform.customerName" clearable type="text" style="width: 240px" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="客户账户">
          <el-input v-model.trim="appform.customerAccount" clearable type="text" style="width: 240px" placeholder="请输入客户账户" />
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="appform.busiType" clearable placeholder="请选择业务类型">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!--        <el-form-item label="业务状态:">
          <el-select v-model="appform.serviceStatus" clearable placeholder="请选择业务状态">
            <el-option
              v-for="item in dataOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>-->
<!--        <el-form-item label="产品类型">-->
<!--          <el-select v-model="appform.infoSource" clearable placeholder="请选择产品类型">-->
<!--            <el-option-->
<!--              v-for="item in infoSourceOption"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="创建日期">
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
          <el-button v-if="menubutscreen('business','查询')" type="primary" @click="searchData">查询</el-button>
          <el-button v-if="menubutscreen('business','新增')" type="primary" @click="goTo('/business/business/add')">新增业务</el-button>
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
          <span
            v-if="item.value === 'customerName'"
            class="linkColor"
            @click="showbusinessTable(scope.row)"
          >{{ scope.row.customerName }}</span>
          <span v-else-if="item.value === 'residue'">
            <span v-if="scope.row.total == '-1' ">无限</span>
            <span v-else>{{ scope.row.residue }}</span>
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
            <el-button v-if="menubutscreen('business','详情')" size="mini" type="warning" @click="goTo('/business/business/see',{id: scope.row.idStr})">详情</el-button>
            <el-button
              v-if="menubutscreen('business','续订')&&!(scope.row.custSrc==1||scope.row.custSrc==2||scope.row.custSrc==9)"
              v-prevent-re-click
              size="mini"
              type="primary"
              @click="goTo('/business/business/orderBusi',{id: scope.row.idStr })"
            >续订
            </el-button>
            <el-button
              v-prevent-re-click
              size="mini"
              type="danger"
              @click="custServiceDelData(scope.row)"
            >删除
            </el-button>
          </ColumnOperation>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="产品列表"
      :visible.sync="showLineTable"
      width="1300px"
    >
      <div>
        <el-table
          :data="lineTab"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center"
          />
          <el-table-column
            v-for="(item, index) in lineTableData"
            :key="index"
            align="center"
            :prop="item.value"
            :show-overflow-tooltip="item.overText"
            :label="item.label"
            :min-width="item.width"
          >
            <template slot-scope="scope">
              <span v-if="item.value === 'lifeCycle'">{{ scope.row.lifeCycle == 0 ? '长期' : scope.row.lifeCycle+'月'}}</span>
              <span v-else-if="item.value === 'orderStatusName'">
                <span v-if="scope.row.orderStatus == 1 " class="color_n">{{ scope.row.orderStatusName }}</span>
                <span v-else-if="scope.row.orderStatus == 2" class="color_s">{{ scope.row.orderStatusName }}</span>
                <span v-else-if="scope.row.orderStatus == 3" class="color_i">{{ scope.row.orderStatusName }}</span>
                <span v-else class="color_u">{{ scope.row.orderStatusName }}</span>
              </span>
              <span v-else>{{ scope.row[item.value] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
            align="center"
          >
            <!--            业务状态 1开通中 2停用中 3退订次月生效 4.已退订-->
            <template slot-scope="scope">
              <!--              <el-button-->
              <!--                v-if="(scope.row.orderStatus === 1) && menubutscreen('business','续订')"-->
              <!--                v-prevent-re-click-->
              <!--                size="mini"-->
              <!--                type="primary"-->
              <!--                @click="goTo('/business/business/continue',{id: childId, serviceId: scope.row.idStr})"-->
              <!--              >续订-->
              <!--              </el-button>-->
              <!--              <el-button-->
              <!--                v-if="(scope.row.orderStatus === 2) && menubutscreen('business','启用')"-->
              <!--                v-prevent-re-click-->
              <!--                size="mini"-->
              <!--                type="primary"-->
              <!--                @click="statusType(scope.row.idStr,1)"-->
              <!--              >启用</el-button>-->
              <!--              <el-button-->
              <!--                v-if="(scope.row.orderStatus === 1) && menubutscreen('business','禁用')"-->
              <!--                v-prevent-re-click-->
              <!--                size="mini"-->
              <!--                type="danger"-->
              <!--                @click="statusType(scope.row.idStr,2)"-->
              <!--              >停用</el-button>-->
<!--              <ColumnOperation>-->
              <el-button
                v-if="(scope.row.orderStatus === 1) && menubutscreen('business','退订')"
                v-prevent-re-click
                size="mini"
                type="danger"
                @click="statusType(scope.row.idStr,4)"
              >退订</el-button>
              <el-button
                v-if="menubutscreen('business','详情')"
                v-prevent-re-click
                size="mini"
                type="warning"
                @click="goTo('/business/business/see',{id: childId, serviceId: scope.row.idStr})"
              >详情
              </el-button>
<!--                </ColumnOperation>-->

            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showLineTable = false">取 消</el-button>
        <el-button size="small" type="primary" @click="showLineTable = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
  </div>
</template>

<script>
import { custServiceDel, custServiceDetail, custServiceModifyStatus, custServicePage } from '@/api/customer'

const exportData = [
  { label: '客户名称', value: 'customerName', width: 60, overText: true },
  { label: '客户账户', value: 'customerAccount', width: 40, overText: true },
  { label: '业务类型', value: 'busiTypeName', width: 30, overText: true },
  // { label: '产品类型', value: 'infoSourceName', width: 30, overText: true },
  { label: '创建时间', value: 'createTime', width: 40, overText: true },
  { label: '剩余条数', value: 'residue', width: 30, overText: true },
  { label: '产品数量', value: 'productNumber', width: 20, overText: true }
]
const lineTableData = [
  { label: '产品类型', value: 'productTypeName', width: 25, overText: true },
  { label: '产品名称', value: 'productName', width: 40, overText: true },
  { label: '创建时间', value: 'createTime', width: 50, overText: true },
  { label: '生效时间', value: 'startTime', width: 30, overText: true },
  { label: '失效时间', value: 'endTime', width: 30, overText: true },
  { label: '剩余条数', value: 'residue', width: 20, overText: true },
  { label: '有效周期', value: 'lifeCycle', width: 20, overText: true },
  { label: '业务状态', value: 'orderStatusName', width: 20, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'
import ColumnOperation from '@/components/ColumnOperation/index.vue'

export default {
  components: {
    ColumnOperation
  },
  mixins: [filter, data, butList],
  data() {
    return {
      // cokey 用来刷新ColumnOperation组件
      cokey: 0,
      childId: '',
      showLineTable: false,
      lineTableData: lineTableData,
      lineTab: [],
      appform: {
        customerName: '',
        customerAccount: '',
        busiType: '',
        serviceStatus: '',
        infoSource: ''
      },
      dataExport: exportData,
      dataOption: [
        {
          label: '全部',
          value: ''
        }
      ],
      infoSourceOption: [
        {
          label: '全部',
          value: ''
        }
      ],
      statusOption: [
        {
          label: '全部',
          value: ''
        }
      ]
    }
  },
  created() {
    this.dataOption = this.dataOption.concat(this.businessTypeOption)
    this.$nextTick(() => {
      const schema = this.$store.state.app.inspectSchema
      if (schema) {
        this.generateDate = schema.generateDate
        delete schema.generateDate
        this.appform = schema
        this.page = schema
      }
      this.fetchData()
      // 业务类型
      this.dictGetByCodeData('service_type').then(res => {
        this.statusOption = this.statusOption.concat(res)
      })
      // 产品类型
      this.dictGetByCodeData('cust_src').then(res => {
        this.infoSourceOption = this.infoSourceOption.concat(res)
      })
    })
  },
  methods: {
    custServiceDelData(row) {
      this.$confirm('此操作将删除该数据  , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        custServiceDel({ id: row.idStr }).then(res => {
          this.successData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    custServicePageData(params) {
      custServicePage(params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.cokey++
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    // 打开行内表格
    showbusinessTable(row) {
      this.showLineTable = true
      this.childId = row.idStr
      this.custServiceDetailData({ id: row.idStr })
    },
    // 业务详情
    custServiceDetailData(par) {
      this.lineTab = []
      custServiceDetail(par).then(res => {
        this.lineTab = res.data.list
      })
    },
    // 操作业务管理状态修改
    statusType(id, status) {
      this.custServiceModifyStatusData({ id: id, status: status })
    },
    // 业务管理状态修改
    custServiceModifyStatusData(par) {
      custServiceModifyStatus(par).then(res => {
        this.custServiceDetailData({ id: this.childId })
        this.$message.success('操作成功！')
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
      this.custServicePageData(params)
    }
  }
}
</script>
