<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item v-if="isSystem()" label="客户名称">
          <el-input v-model.trim="appform.customerName" clearable type="text" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="业务号码">
          <el-input v-model.trim="appform.sendPhone" clearable type="text" placeholder="请输入业务号码" />
        </el-form-item>
        <el-form-item label="接收号码">
          <el-input v-model.trim="appform.mobile" clearable type="text" placeholder="请输入接收号码" />
        </el-form-item>
        <el-form-item v-if="isSystem()" label="业务类型">
          <el-select v-model="appform.busiType" placeholder="请选择业务类型">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="业务状态">
          <el-select v-model="appform.status" clearable placeholder="请选择业务状态">
            <el-option
              v-for="item in sendDetailsStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-date-picker
            v-model="generateDate"
            type="daterange"
            :picker-options="pickerOptions0"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @blur="$forceUpdate()"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-if="menubutscreen('sendDetails','查询')" type="primary" @click="searchData">查询</el-button>
          <el-button v-if="menubutscreen('sendDetails','导出')" v-prevent-re-click type="primary" @click="importData">明细导出</el-button>
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
        width="50"
        align="center"
      >
        <template slot-scope="scope"><span>{{ scope.$index+(page.pageNum - 1) * page.pageSize + 1 }} </span></template>
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
          <!-- 99未发送 0已发送 -100发送失败-->
          <span v-if="item.value === 'statusStr'">
            <span v-if="scope.row.status == 0" class="color_n">{{ scope.row.statusStr }}</span>
            <span v-else-if="scope.row.status == -100" class="color_u">{{ scope.row.statusStr }}</span>
            <span v-else >{{ scope.row.statusStr }}</span>
          </span>
          <!-- 99未发送 0发送成功  -1发送失败-->
          <span v-else-if="item.value === 'passagesStateMsg'">
            <span v-if="scope.row.passagesState == 0" class="color_n">{{ scope.row.passagesStateMsg }}</span>
            <span v-else-if="scope.row.passagesState == -1" class="color_u">{{ scope.row.passagesStateMsg }}</span>
            <span v-else >{{ scope.row.passagesStateMsg }}</span>
          </span>
<!--          <span v-if="item.value === 'passagesStateMsg'" :style="{'color':scope.row.status == 0 ? '#00ca00' : scope.row.status == -100 ? '#e70e0e' : '#606266'}">{{ scope.row.passagesStateMsg }}</span>-->
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
  </div>
</template>

<script>
import { sendDetailDetailExport, sendDetailPage } from '@/api/settings'
import { download } from '@/utils/fileLoad'

const exportData = [
  { label: '客户名称', value: 'customerName', width: 70, overText: true },
  { label: '业务类型', value: 'busiTypeMsg', width: 50, overText: true },
  { label: '业务号码', value: 'sendPhone', width: 80, overText: true },
  { label: '接收号码', value: 'mobile', width: 80, overText: true },
  { label: '发送内容', value: 'content', width: 80, overText: true },
  { label: '计数(条)', value: 'billNum', width: 50, overText: true },
  { label: '业务状态', value: 'statusStr', width: 60, overText: true },
  { label: '发送时间', value: 'createTime', width: 90, overText: true },
  { label: '发送状态', value: 'passagesStateMsg', width: 80, overText: true },
  { label: '回执时间', value: 'rptTime', width: 90, overText: true },
  { label: '回执说明', value: 'msg', width: 80, overText: true }
]
const exportDataCust = [
  { label: '业务类型', value: 'busiTypeMsg', width: 50, overText: true },
  { label: '业务号码', value: 'sendPhone', width: 80, overText: true },
  { label: '接收号码', value: 'mobile', width: 80, overText: true },
  { label: '发送内容', value: 'content', width: 80, overText: true },
  { label: '计数(条)', value: 'billNum', width: 50, overText: true },
  { label: '业务状态', value: 'statusStr', width: 60, overText: true },
  { label: '发送时间', value: 'createTime', width: 90, overText: true },
  { label: '发送状态', value: 'passagesStateMsg', width: 80, overText: true },
  { label: '回执时间', value: 'rptTime', width: 90, overText: true },
  { label: '回执说明', value: 'msg', width: 80, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'
export default {
  mixins: [filter, data, butList],
  data() {
    return {
      appform: {
        customerName: '',
        sendPhone: '',
        mobile: '',
        status: ''
      },
      dataExport: exportData,
      typeOption: [
        {
          label: '全部',
          value: ''
        }
      ]
    }
  },
  created() {
    // 业务类型
    this.dictGetByCodeData('service_type').then(res => {
      this.typeOption = this.typeOption.concat(res)
    })
    this.dataExport = this.isSystem() ? exportData : exportDataCust
    const schema = this.$store.state.app.inspectSchema
    if (schema) {
      this.appform = schema
      this.page = schema
    }
    this.init()
  },
  methods: {
    async init() {
      this.generateDate = await this.timeDefault()
      this.fetchData()
    },
    importData() {
      sendDetailDetailExport(this.appform).then(res => {
        download(res, '发送明细')
      }).catch(e => {
      })
    },
    adopt(item) {
      this.$confirm('是否通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '审核成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '审核失败!'
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
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败!'
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
          message: '重置失败!'
        })
      })
    },
    sendDetailPageData(par) {
      sendDetailPage(par).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    // 默认当天
    timeDefault() {
      const date = new Date()
      // 通过时间戳计算
      // const CurrentTime = date.getTime() - 86400000
      const CurrentTime = date.getTime()
      // 通过时间戳计算
      const CurrentTimeNs = new Date(CurrentTime)
      // 月，日 不够10补0
      const defalutDate = CurrentTimeNs.getFullYear() + '-' + ((CurrentTimeNs.getMonth() + 1) >= 10 ? (CurrentTimeNs.getMonth() + 1) : '0' + (CurrentTimeNs.getMonth() + 1)) + '-' + (CurrentTimeNs.getDate() >= 10 ? CurrentTimeNs.getDate() : '0' + CurrentTimeNs.getDate())
      return [defalutDate, defalutDate]
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
      this.sendDetailPageData(params)
    }
  }
}
</script>
