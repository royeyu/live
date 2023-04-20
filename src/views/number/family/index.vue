<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item label="业务号码">
          <el-input v-model.trim="appform.linkTel" clearable type="text" style="width: 145px" placeholder="请输入业务号码" />
        </el-form-item>
        <el-form-item label="亲情号码">
          <el-input v-model.trim="appform.phone" clearable type="text" style="width: 145px" placeholder="请输入亲情号码" />
        </el-form-item>
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
<!--      <el-table-column-->
<!--        type="selection"-->
<!--        align="center"-->
<!--        width="55"-->
<!--      />-->
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
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>


  </div>
</template>

<script>
import {getKinshipList} from '@/api/customer'

const exportData = [
  { label: '客户名称', value: 'customerName', width: 50, overText: true },
  { label: '业务号码', value: 'linkTel', width: 50, overText: true },
  { label: '创建日期', value: 'createTime', width: 50, overText: true },
  { label: '姓名', value: 'name', width: 30, overText: true },
  { label: '亲情号码', value: 'phone', width: 50, overText: true },
  { label: '备注', value: 'remark', width: 60, overText: true }
]
const exportDataCust = [
  { label: '业务号码', value: 'linkTel', width: 50, overText: true },
  { label: '创建日期', value: 'createTime', width: 50, overText: true },
  { label: '姓名', value: 'name', width: 30, overText: true },
  { label: '亲情号码', value: 'phone', width: 50, overText: true },
  { label: '备注', value: 'remark', width: 60, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'

export default {
  mixins: [filter, data, butList],
  data() {
    return {
      appform: {
        custName: '',
        phone: '',
        groupName: '',
        busiType: 0,
        ckStatus: 0
      },
      loadingS: false,
      dataExport: exportData
    }
  },
  created() {
    this.dataExport = this.isSystem() ? exportData : exportDataCust
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
    phonePageData(params) {
      getKinshipList(params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
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
      this.phonePageData(params)
    }
  }
}
</script>
