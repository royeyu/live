<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{$route.meta.title}}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="客户名称:">
          <el-input clearable type="text" placeholder="请输入客户名称" v-model.trim="appform.customerName"></el-input>
        </el-form-item>
        <el-form-item label="通知号码:">
          <el-input clearable type="text" placeholder="请输入通知号码" v-model.trim="appform.phone"></el-input>
        </el-form-item>
        <el-form-item label="发送时间:">
          <el-date-picker
            v-model="generateDate"
            type="daterange"
            :picker-options="pickerOptions0"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button   v-if="menubutscreen('orderDetails','查询')" @click="searchData" type="primary">查询</el-button>
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
        <template slot-scope="scope"><span>{{scope.$index+(page.pageNum - 1) * page.pageSize + 1}} </span></template>
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
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>
  </div>
</template>

<script>
  import { orderNoticeSummaryPage } from '@/api/settings'

  const exportData = [
    { label: "客户名称", value: "customerName", width: 50,overText: true },
    { label: "通知号码", value: "linkTel", width: 50,overText: true },
    { label: "业务类型", value: "busiTypeMsg", width: 50,overText: true },
    { label: "产品ID", value: "productId", width: 30,overText: true },
    // { label: "发送内容", value: "name4", width: 100,overText: true },
    { label: "产品类型", value: "productTypeMsg", width: 40,overText: true },
    { label: "发送时间", value: "subscribeTime", width: 70,overText: true },
    { label: "操作类型", value: "opterTypeMsg", width: 30,overText: true },
  ];
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'
  import { butList } from '@/mixns/butMenu'
  export default {
    mixins: [filter,data,butList],
    data() {
      return {
        appform: {
          productName: null,
          phone: null
        },
        dataExport: exportData,
      }
    },
    created() {
      const schema = this.$store.state.app.inspectSchema
      if (schema) {
        this.appform = schema
        this.page = schema
      }
      this.fetchData()
    },
    methods: {
      orderNoticeSummaryPageData(par) {
        orderNoticeSummaryPage(par).then(res => {
          this.tableData = res.data.records
          this.total = res.data.total
          this.listLoading = false
        }).catch(e => {
          this.listLoading = false
        })
      },
      fetchData() {
        let params = {
          ...this.appform,
          ...this.page
        }
        if (this.generateDate) {
          params.beginTime = this.generateDate[0]
          params.endTime = this.generateDate[1]
        }
        this.listLoading = true
        this.orderNoticeSummaryPageData(params)
      }
    }
  }
</script>
