<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item>
          <el-button type="primary" @click="goTo('/categoryManagement/categoryManagement/add')">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      row-key="id"
      :tree-props="{children: 'children'}"
      fit
      highlight-current-row
    >
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
            v-if="item.value === 'icon'"
          >
            <svg-icon v-if="scope.row.icon" :icon-class="scope.row.icon" />
          </span>
          <span v-else-if="item.value === 'hidden'">
            <span v-if="scope.row.hidden === 0">显示</span>
            <span v-else>隐藏</span>
          </span>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.perms"
            size="mini"
            type="primary"
            @click="goTo('/categoryManagement/categoryManagement/add',{id: scope.row.id})"
          >新增下级
          </el-button>
          <el-button
            v-if="!scope.row.perms"
            size="mini"
            type="primary"
            @click="goTo('/categoryManagement/categoryManagement/update',{item: base64Data(scope.row)})"
          >编辑
          </el-button>
          <el-button v-if="!scope.row.perms" size="mini" type="danger" @click="delData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :hidden="total < 1" @pagination="changePage" />
    </div>
  </div>
</template>

<script>
import { menuDelete, menuGetMenuTreeList } from '@/api/system'
const Base64 = require('js-base64').Base64
const exportData = [
  { label: '分类名称', value: 'name', width: 100, overText: true },
  { label: '级别', value: 'icon', width: 100, overText: true },
  { label: 'ICON', value: 'icon', width: 100, overText: true },
  { label: '是否菜单显示', value: 'hidden', width: 100, overText: true },
  { label: '排序', value: 'sortNo', width: 100, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'

export default {
  mixins: [filter, data],
  data() {
    return {
      appform: {
        name: null,
        province: null,
        area: null,
        data: null,
        status: null,
        time: null
      },
      dataExport: exportData
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 加密
    base64Data(val) {
      return Base64.encode(JSON.stringify(val))
    },
    // 删除
    delData(item) {
      this.$confirm('是否删除该数据?可能导致系统无法正常显示！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        menuDelete({ id: item.id }).then(res => {
          this.successData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败!'
        })
      })
    },
    menuGetMenuTreeListData() {
      menuGetMenuTreeList().then(res => {
        this.tableData = res.data
        this.listLoading = false
      })
    },
    fetchData() {
      this.listLoading = true
      this.menuGetMenuTreeListData()
    }
  }
}
</script>
