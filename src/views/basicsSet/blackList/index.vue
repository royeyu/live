<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}列表
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item v-if="isSystem()" label="客户名称">
          <el-input v-model.trim="appform.custName" clearable type="text" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item v-if="isSystem()"  label="客户账户">
          <el-input v-model.trim="appform.account" clearable type="text" placeholder="请输入客户账户" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model.trim="appform.phone" clearable type="text" placeholder="请输入手机号" />
        </el-form-item>
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
          <el-button v-if="menubutscreen('blackList','查询')" type="primary" @click="searchData">查询</el-button>
          <el-button v-if="menubutscreen('blackList','新增')" type="primary" @click="goTo('/basicsSet/blackList/add')">新增黑名单</el-button>
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
        width="100"
        align="center"
      >
        <template slot-scope="scope"><span>{{ scope.$index + (page.pageNum - 1) * page.pageSize + 1 }} </span></template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in lineTableData"
        :key="index"
        align="center"
        :prop="item.value"
        :show-overflow-tooltip="item.overText"
        :label="item.label"
        :min-width="item.width"
      />
      <el-table-column
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="menubutscreen('blackList','删除')" size="mini" type="danger" @click="delData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>

  </div>
</template>

<script>
import { blacklistDel, blacklistPage } from '@/api/settings'

const lineTableData = [
  { label: '客户名称', value: 'custName', width: 100, overText: true },
  { label: '客户账号', value: 'custAccount', width: 100, overText: true },
  { label: '创建日期', value: 'createTime', width: 100, overText: true },
  { label: '手机号码', value: 'phone', width: 100, overText: true },
  { label: '备注', value: 'remark', width: 160, overText: true }
]
const lineTableDataCust = [
  { label: '创建日期', value: 'createTime', width: 100, overText: true },
  { label: '手机号码', value: 'phone', width: 100, overText: true },
  { label: '备注', value: 'remark', width: 160, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'

export default {
  mixins: [filter, data, butList],
  data() {
    return {
      statusForm: {
        status: '',
        text: ''
      },
      lineTableData: lineTableData,
      appform: {
        custName: null,
        account: null,
        phone: null
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状态!', trigger: 'blur' }
        ]
      },
      statusOption: [
        {
          label: '全部',
          value: null
        }
      ],
      typeOption: [
        {
          label: '全部',
          value: null
        }
      ]
    }
  },
  created() {
    this.lineTableData = this.isSystem() ? lineTableData : lineTableDataCust
    this.statusOption = this.statusOption.concat(this.basicsSetOption)
    this.typeOption = this.typeOption.concat(this.numberAddBusinessTypeOPtion)
    const schema = this.$store.state.app.inspectSchema
    if (schema) {
      this.appform = schema
      this.page = schema
    }
    this.fetchData()
  },
  methods: {
    delData(row) {
      this.$confirm(`确认把：${row.phone} 从黑名单中删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        blacklistDel({ id: row.id }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败!'
        })
      })
    },
    handleClose() {
      this.$refs.statusForm.resetFields()
    },
    showStatus(row) {
      this.batchMessagedialog = true
    },
    // 取消
    batchMessageCloce() {
      this.batchMessagedialog = false
    },
    // 确定
    batchMessageSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    blacklistPageData(params) {
      blacklistPage(params).then(res => {
        this.tableData = res.data.records.filter(item => {
          if (!item.custName) {
            item.custName = '全部客户'
          }
          if (!item.custAccount) {
            item.custAccount = '全部账户'
          }
          return item
        })
        this.total = res.data.total
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    fetchData() {
      this.listLoading = true
      const params = {
        ...this.appform,
        ...this.page
      }
      if (this.generateDate) {
        params.beginTime = this.generateDate[0]
        params.endTime = this.generateDate[1]
      }
      this.blacklistPageData(params)
    }
  }
}
</script>
