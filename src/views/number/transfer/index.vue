<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item label="业务号码">
          <el-input v-model.trim="appform.phone" clearable type="text" style="width: 145px" placeholder="请输入业务号码" />
        </el-form-item>
        <el-form-item label="添加日期:">
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
          <el-button v-if="menubutscreen('number','新增')" type="primary" @click="goTo('/number/transfer/add')">新增号码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="appform">
      <el-form inline label-width="100px" size="small">
        <el-form-item>
          <el-button v-if="menubutscreen('number','批量删除')" type="danger" size="small" @click="allDel">批量删除</el-button>
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
      />
      <el-table-column
        label="操作"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="menubutscreen('number','删除')" size="mini" type="danger" @click="delData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>

  </div>
</template>

<script>
import { getKinshipList, getTransferList, transferDel } from '@/api/customer'

const exportData = [
  { label: '业务号码', value: 'phone', width: 50, overText: true },
  { label: '运营商', value: 'corp', width: 30, overText: true },
  { label: '省份', value: 'province', width: 30, overText: true },
  { label: '城市', value: 'city', width: 30, overText: true },
  { label: '添加日期', value: 'createTime', width: 50, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'

export default {
  mixins: [filter, data, butList],
  data() {
    return {
      appform: {
        phone: ''
      },
      loadingS: false,
      dataExport: exportData
    }
  },
  created() {
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
    // 批量删除
    allDel() {
      const _selectData = this.$refs.tableData.selection
      if (_selectData.length) {
        this.$confirm('确定要删除选中的数据吗！', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const arr = []
          _selectData.map(item => {
            arr.push(item.id.toString())
          })
          transferDel(arr).then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.fetchData()
          })
        }).catch(action => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
      } else {
        this.$message.warning('请选择数据！')
      }
    },
    phonePageData(params) {
      getTransferList(params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    // 删除
    delData(item) {
      this.$confirm('确定要删除该条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = [item.id.toString()]
        transferDel(params).then(res => {
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
