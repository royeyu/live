<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{$route.meta.title}}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="手机号:">
          <el-input clearable type="text" placeholder="请输入手机号" v-model.trim="appform.calling"></el-input>
        </el-form-item>
        <el-form-item label="对端号码:">
          <el-input clearable type="text" placeholder="请输入对端号码" v-model.trim="appform.called"></el-input>
        </el-form-item>
        <el-form-item label="话单时间:">
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
          <el-button   v-if="menubutscreen('callRecord','查询')" @click="searchData" type="primary">查询</el-button>
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
  import { validCdrRecordPage } from '@/api/settings'

  const exportData = [
    { label: "Topicname", value: "topicName", width: 60,overText: true },
    { label: "手机号码", value: "calling", width: 60,overText: true },
    { label: "对端号码", value: "called", width: 60,overText: true },
    { label: "呼叫类型", value: "busiTypeMsg", width: 30,overText: true },
    { label: "业务类型", value: "serviceTypeMsg", width: 30,overText: true },
    { label: "通话时长", value: "talkTime", width: 30,overText: true },
    { label: "振铃时长", value: "alertTime", width: 30,overText: true },
    { label: "释放原因", value: "cause", width: 30,overText: true },
    { label: "省份ID", value: "provId", width: 30,overText: true },
    { label: "呼叫时间", value: "startTime", width: 80,overText: true },
    { label: "下发kafka时间", value: "intime", width: 80,overText: true },
    { label: "创建时间", value: "createTime", width: 80,overText: true },
  ];
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'
  import { butList } from '@/mixns/butMenu'
  export default {
    mixins: [filter,data, butList],
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
      adopt(item) {
        this.$confirm('是否通过审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '审核成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '审核失败!'
          });
        });
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
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作失败!'
          });
        });
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
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '重置失败!'
          });
        });
      },
      validCdrRecordPageData(par) {
        validCdrRecordPage(par).then(res => {
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
        this.validCdrRecordPageData(params)
      }
    }
  }
</script>
