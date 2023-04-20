<template>
  <div class="app-container customerList">
    <!--    <div class="texttitle">-->
    <!--      {{ $route.meta.title }}列表-->
    <!--    </div>-->
    <div class="texttitle">
      号码列表
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model.trim="appform.orderPhone" clearable type="text" maxlength="11" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="appform.type" placeholder="请选择状态">
            <el-option
              v-for="item in signStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
<!--          <el-button v-if="menubutscreen('blackList','新增')" type="primary" @click="goTo('/basicsSet/numberSign/add')">新增签约</el-button>-->
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
      >
        <template slot-scope="scope">
          <span v-if="item.value === 'status'">
            <span v-if="scope.row.type == 1 && scope.row.status == 0" class="color_i">签约中</span>
            <span v-if="scope.row.type == 1 && scope.row.status == 1" class="color_n">签约成功</span>
            <span v-if="scope.row.type == 1 && scope.row.status == 2" class="color_u">签约失败</span>
            <span v-if="scope.row.type == 2 && scope.row.status == 0" class="color_i">解约中</span>
            <span v-if="scope.row.type == 2 && scope.row.status == 1" class="color_n">解约成功</span>
            <span v-if="scope.row.type == 2 && scope.row.status == 2" class="color_u">解约失败</span>
<!--            <span v-else-if="scope.row.status == '1'" class="color_n">成功</span>-->
<!--            <span v-else-if="scope.row.status == '2'" class="color_u">解约失败</span>-->
          </span>
          <span v-else-if="item.value === 'busiType'">{{ resolveName(scope.row.busiType) }}</span>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <!--          <el-button size="mini" v-if="menubutscreen('blackList','删除')" @click="delData(scope.row)" type="danger">删除</el-button>-->
          <el-button v-if="(scope.row.type == 2 && scope.row.status == 1) ||( scope.row.type == 1 && scope.row.status == 2)" size="mini" type="primary" @click="handleNumSign(scope.row)">签约</el-button>
          <el-button v-if="(scope.row.type == 1 && scope.row.status == 1) || (scope.row.type == 2 && scope.row.status == 2)" size="mini" type="danger" @click="handleNumSign(scope.row)">解约</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>

  </div>
</template>

<script>
import { blacklistDel, getNumSign, getNumSignList } from '@/api/settings'

const lineTableData = [
  { label: '手机号', value: 'orderPhone', width: 40, overText: true },
  { label: '业务类型', value: 'busiType', width: 30, overText: true },
  { label: '创建日期', value: 'createTime', width: 60, overText: true },
  { label: '状态', value: 'status', width: 30, overText: true },
  { label: '失败原因', value: 'errorMessage', width: 80, overText: true },
  { label: '备注', value: 'remark', width: 60, overText: true }
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
        type: null,
        orderPhone: null
      },
      signStatusList: [
        {
          label: '全部',
          value: null
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
    this.signStatusList = this.signStatusList.concat(this.signStatus)
    const schema = this.$store.state.app.inspectSchema
    if (schema) {
      this.appform = schema
      this.page = schema
    }
    this.init()
  },
  methods: {
    async init() {
      await this.getServiceType()
      this.fetchData()
    },
    getServiceType() {
      // 业务类型
      this.dictGetByCodeData('service_type').then(res => {
        this.statusOption = this.statusOption.concat(res)
      })
    },
    PageData(params) {
      getNumSignList(params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    // 点击 签约/解约 按钮
    handleNumSign(row) {
      this.$confirm(
        '确认要' + (row.type == 1 ? '解约' : '签约') + `:${row.orderPhone}吗？`,
        '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.NumSign(row)
      })
    },
    // 提交签约/解约
    NumSign(data) {
      const params = {
        id: data.idStr,
        orderPhone: data.orderPhone,
        type: data.type,
        updateBy: this.$store.state.user.name
      }
      getNumSign(params).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.fetchData()
      }).catch(e => {
        this.$message({
          type: 'info',
          message: '操作失败!'
        })
      })
    },
    fetchData() {
      this.listLoading = true
      let params ={}
      params = {
        ...this.appform,
        ...this.page
      }
      // 签约中
      if(params.type == 3 ){
        // params.type = 1
        // params.status = 0
        params.signingStatus = 0
      }
      // 解约中
      if(params.type == 4 ){
        // params.type = 2
        // params.status = 0
        params.signingStatus = 3
      }
      // 签约成功
      if(params.type == 1 ){
        // params.type = 1
        // params.status = 1
        params.signingStatus = 1
      }
      // 解约成功
      if(params.type == 2 ){
        // params.type = 2
        // params.status = 1
        params.signingStatus = 4
      }
      // 签约失败
      if(params.type == 5 ){
        // params.type = 1
        // params.status = 2
        params.signingStatus = 2
      }
      // 解约失败
      if(params.type == 6 ){
        // params.type = 2
        // params.status = 2
        params.signingStatus = 5
      }
      if (this.generateDate) {
        params.beginTime = this.generateDate[0]
        params.endTime = this.generateDate[1]
      }
      this.PageData(params)
    },
    resolveName(val) {
      const itemdata =  this.statusOption.filter((item) => {
        return item.value == val
      })
      return itemdata[0].label
    }
  }
}
</script>
