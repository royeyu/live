<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item label="客户名称">
          <el-input v-model.trim="appform.name" clearable type="text" style="width: 240px" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="appform.area" clearable placeholder="请选择业务类型">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="业务状态">
          <el-select v-model="appform.area" clearable placeholder="请选择客户状态">
            <el-option
              v-for="item in dataOption"
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
          <el-button v-if="menubutscreen('entBusiness','查询')" type="primary">查询</el-button>
          <!--          <el-button size="small" @click="goTo('/business/enterprise/add')" type="primary">新增业务</el-button>-->
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
        <template slot-scope="scope"><span>{{ scope.$index+(page.pageName - 1) * page.pageSize + 1 }} </span></template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in dataExport"
        :key="index"
        :prop="item.value"
        :show-overflow-tooltip="item.overText"
        :label="item.label"
        :min-width="item.width"
      >
        <template v-if="item.value === 'name'" slot-scope="scope">
          <span class="linkColor" @click="showbusinessTable(scope.row)">{{ scope.row.name }}123123</span>
        </template>
      </el-table-column>
      <!--      <el-table-column
        label="操作"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="goTo('/business/enterprise/continue',{id: scope.row.id})" type="primary">续订</el-button>
          <el-button size="mini" @click="goTo('/business/enterprise/see',{id: scope.row.id})" type="warning">详情</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="showLineTable"
      width="1000px"
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
            width="60"
            align="center"
          />
          <el-table-column
            v-for="(item, index) in lineTableData"
            :key="index"
            :prop="item.value"
            :show-overflow-tooltip="item.overText"
            :label="item.label"
            :min-width="item.width"
          />
          <el-table-column
            label="操作"
            width="300"
            align="center"
          >
            <template slot-scope="scope">
              <el-button v-if="menubutscreen('entBusiness','续订')" type="primary" @click="goTo('/business/enterprise/continue',{id: scope.row.id})">续订</el-button>
              <el-button v-if="menubutscreen('entBusiness','禁用')" type="danger">禁用</el-button>
              <el-button v-if="menubutscreen('entBusiness','退订')" type="danger">退订</el-button>
              <el-button v-if="menubutscreen('entBusiness','详情')" type="warning" @click="goTo('/business/enterprise/see',{id: scope.row.id})">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showLineTable = false">取 消</el-button>
        <el-button type="primary" @click="showLineTable = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :hidden="total < 1" @pagination="changePage" />
    </div>
  </div>
</template>

<script>

// 企业名片列表:
//   查询 entBusiness:query
// 新增 entBusiness:add
// 开通 entBusiness:open
// 退订 entBusiness:reback
// 续订 entBusiness:reorder
// 启用 entBusiness:enable
// 禁用 entBusiness:disable
// 详情 entBusiness:detail
const exportData = [
  { label: '客户名称', value: 'name', width: 40, overText: true },
  { label: '业务类型', value: 'total', width: 40, overText: true },
  { label: '产品类型', value: 'averaged', width: 40, overText: true },
  { label: '剩余条数', value: 'averaged', width: 40, overText: true }
]
const lineTableData = [
  { label: '产品类型', value: 'name', width: 40, overText: true },
  { label: '产品名称', value: 'total', width: 40, overText: true },
  { label: '创建时间', value: 'averaged', width: 40, overText: true },
  { label: '失效时间', value: 'averaged', width: 40, overText: true },
  { label: '剩余条数', value: 'averaged', width: 40, overText: true },
  { label: '有效周期', value: 'averaged', width: 40, overText: true },
  { label: '有效周期业务状态', value: 'averaged', width: 40, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'
export default {
  mixins: [filter, data, butList],
  data() {
    return {
      showLineTable: false,
      lineTableData: lineTableData,
      lineTab: [{}],
      appform: {
        name: null,
        province: null,
        area: null,
        data: null,
        status: null
      },
      dataExport: exportData,
      dataOption: [
        {
          label: '全部',
          value: null
        }
      ],
      statusOption: [
        {
          label: '全部',
          value: null
        }
      ]
    }
  },
  created() {
    this.statusOption = this.statusOption.concat(this.businessStatusOption)
    this.dataOption = this.dataOption.concat(this.businessTypeOption)
    this.fetchData()
  },
  methods: {
    // 打开行内表格
    showbusinessTable(row) {
      this.showLineTable = true
    },
    changePage() {

    },
    fetchData() {
      this.listLoading = false
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }
  }
}
</script>
