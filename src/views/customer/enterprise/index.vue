<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px" >
          <el-form-item label="客户名称">
            <el-input v-model.trim="appform.customerName" style="width: 240px" clearable type="text" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label="账户">
            <el-input v-model.trim="appform.customerAccount" style="width: 240px"  clearable type="text" placeholder="请输入客户账户" />
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="appform.ckStatus" clearable placeholder="请选择审核状态">
              <el-option
                v-for="item in statusOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        <el-form-item label="所属省份">
          <el-select v-model="appform.province" clearable placeholder="请选择所属省份">
            <el-option
              v-for="item in provinceOption"
              :key="item.id"
              :label="item.province"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属地市">
          <el-select v-model="appform.city" clearable placeholder="请选择所属地市">
            <el-option
              v-for="item in areaOption"
              :key="item.id"
              :label="item.city"
              :value="item.id"
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
          <el-button v-if="menubutscreen('enterprise','查询')"  type="primary" @click="searchData">查询</el-button>
          <!--          <el-button size="small" @click="goTo('/customer/enterprise/add')" type="primary">新增客户</el-button>-->
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
        <template slot-scope="scope"><span>{{ scope.$index + (page.pageNum - 1) * page.pageSize + 1 }} </span></template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in dataExport"
        :key="index"
        :prop="item.value"
        align="center"
        :show-overflow-tooltip="item.overText"
        :label="item.label"
        :min-width="item.width"
      >
        <template slot-scope="scope">
          <div v-if="item.value === 'username'">{{ scope.row.username }}</div>
          <div v-else-if="item.value === 'province'">{{ scope.row.provinceName }}{{ scope.row.cityName }}</div>
          <div v-else-if="item.value === 'ckStatus'">
            <span v-if="scope.row.ckStatus === 1" class="color1">审核中</span>
            <span v-else-if="scope.row.ckStatus === 2" class="color2">审核通过</span>
            <span v-else-if="scope.row.ckStatus === -1" class="color3">审核未通过</span>
            <span v-else class="color5">未审核</span>
          </div>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column
        label="操作"
        width="240"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="reset(scope.row)">重置</el-button>
          <el-button size="mini" v-if="scope.row.ckStatus === 99" type="success" @click="adopt(scope.row)">通过</el-button>
          <el-button size="mini" @click="goTo('/customer/enterprise/see',{id: scope.row.id})" type="warning">详情
          </el-button>
        <div class="mt8">
          <el-button size="mini" @click="goTo('/customer/enterprise/modify',{id: scope.row.id})" type="primary">编辑
          </el-button>
          <el-button size="mini" @click="delData(scope.row)" type="danger">删除</el-button>
        </div>
        </template>
      </el-table-column>-->
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
  </div>
</template>

<script>
import { customerPage } from '@/api/customer'

const exportData = [
  { label: '客户名称', value: 'customerName', width: 50, overText: true },
  { label: '客户账户', value: 'customerAccount', width: 40, overText: true },
  { label: '产品类型', value: 'custSrcName', width: 50, overText: true },
  { label: '创建日期', value: 'createTime', width: 60, overText: true },
  { label: '联系人', value: 'linkMan', width: 20, overText: true },
  { label: '省市', value: 'province', width: 40, overText: true },
  { label: '审核状态', value: 'ckStatus', width: 20, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { dictCity, dictProvince } from '@/api/system'
import { butList } from '@/mixns/butMenu'

export default {
  name: 'Enterprise',
  mixins: [filter, data, butList],
  data() {
    return {
      appform: {
        customerName: null,
        customerAccount: null,
        province: null,
        city: null,
        custSrc: null,
        ckStatus: null,
        isCompany: 1
      },
      dataExport: exportData,
      provinceOption: [
        {
          province: '全部',
          id: null
        }
      ],
      areaOption: [
        {
          city: '全部',
          id: null
        }
      ],
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
    this.statusOption = this.statusOption.concat(this.customerStatusOption)
    this.dataOption = this.dataOption.concat(this.customerDataOption)
    this.fetchData()
    this.dictProvinceData()
  },
  methods: {
    // 省份查询
    dictProvinceData() {
      dictProvince().then(res => {
        this.provinceOption = this.provinceOption.concat(res.data)
      })
    },
    // 地市查询
    dictCityData(id) {
      dictCity({ pId: id }).then(res => {
        this.areaOption = res.data
      })
    },
    changeProvince(value) {
      this.appform.city = null
      this.areaOption = []
      if (value) {
        this.dictCityData(value)
      }
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
    isStop(item, text) {
      this.$confirm(`是否${text}?`, '提示', {
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
    changePage() {

    },
    customerPageData(params) {
      customerPage(params).then(res => {
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
      this.customerPageData(params)
    }
  }
}
</script>
