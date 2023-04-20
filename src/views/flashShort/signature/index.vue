<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item label="客户名称">
          <el-input v-model.trim="appform.custName" clearable type="text" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="业务号码">
          <el-input v-model.trim="appform.phone" clearable type="text" placeholder="请输入业务号码" />
        </el-form-item>
        <el-form-item label="签名内容">
          <el-input v-model.trim="appform.signName" clearable type="text" placeholder="请输入签名内容" />
        </el-form-item>
        <el-form-item label="签名类型">
          <el-select v-model="appform.signType" placeholder="请选择签名类型">
            <el-option
              v-for="item in SigntypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="appform.approvalStatus" placeholder="请选择审核状态">
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
          <el-button v-if="menubutscreen('flashShortList','查询')" type="primary" @click="searchData">查询</el-button>
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
          <span v-if="item.value === 'approvalStatusStr'">
            <span v-if="scope.row.approvalStatus > 0" class="color_n">{{ scope.row.approvalStatusStr }}</span>
            <span v-else-if="scope.row.approvalStatus < 0" class="color_u">{{ scope.row.approvalStatusStr }}</span>
            <span v-else>{{ scope.row.approvalStatusStr }}</span>
          </span>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.approvalStatus == 0 && menubutscreen('flashShortList','查看')" size="mini" type="success" @click="goTo('/flashShort/signatureList/see',{id: scope.row.id})">
            初审
          </el-button>
          <el-button v-if="scope.row.approvalStatus != 0 && menubutscreen('flashShortList','查看')" size="mini" type="warning" @click="goTo('/flashShort/signatureList/see',{id: scope.row.id})">
            查看
          </el-button>
          <el-button v-if="menubutscreen('flashShortList','查看')" size="mini" type="danger" @click="DelSign(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
  </div>
</template>

<script>
import { delSignManageList, getSignManageList, templateDel } from '@/api/customer'

const exportData = [
  { label: '客户名称', value: 'custName', width: 50, overText: true },
  { label: '业务号码', value: 'phone', width: 50, overText: true },
  { label: '签名内容', value: 'signName', width: 100, overText: true },
  { label: '签名类型', value: 'signTypeStr', width: 60, overText: true },
  { label: '创建时间', value: 'createTime', width: 50, overText: true },
  { label: '审核时间', value: 'approvalTime', width: 50, overText: true },
  { label: '状态', value: 'approvalStatusStr', width: 40, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'

export default {
  mixins: [filter, data, butList],
  data() {
    return {
      // cokey 用来刷新ColumnOperation组件
      cokey: 0,
      statusForm: {
        ckStatus: '',
        ckRemark: ''
      },
      appform: {
        phone: null,
        approvalStatus: null,
        signName: null,
        signType: null
      },
      dataExport: exportData,
      dataOption: [
        {
          label: '全部',
          value: null
        }
      ],
      SigntypeOption: [
        {
          label: '全部',
          value: null
        }, {
          label: '文本短信签名',
          value: 1
        }, {
          label: '数字短信签名',
          value: 2
        }
      ]
    }
  },
  created() {
    this.dataOption = this.dataOption.concat(this.signatureStatus)
    const schema = this.$store.state.app.inspectSchema
    if (schema) {
      this.appform = schema
      this.page = schema
    }
    this.fetchData()
  },
  methods: {
    // 列表
    templatePageData(params) {
      getSignManageList(params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.cokey++
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
    // 删除签名
    DelSign(id) {
      const params = {
        id: id
      }
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        delSignManageList(params).then(res => {
          this.listLoading = false
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchData()
        }).catch(e => {
          this.listLoading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
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
      this.templatePageData(params)
    }
  }
}
</script>
