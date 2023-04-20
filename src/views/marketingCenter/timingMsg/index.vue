<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="客户名称">
          <el-input clearable type="text" placeholder="请输入客户名称" v-model.trim="appform.custName"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="appform.status" clearable placeholder="请选择审核状态">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
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
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button   v-if="menubutscreen('timingMsg','查询')" @click="searchData" type="primary">查询</el-button>
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
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" v-if="menubutscreen('timingMsg','查看')"
                     @click="goTo('/marketingCenter/timingMsgSee',{id: scope.row.id})" type="warning">查看
          </el-button>
<!--          <el-button size="mini" @click="showStatus(scope.row)" type="primary">审核</el-button>-->
<!--          <el-button size="mini" @click="delData(scope.row)" type="danger">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>
    <el-dialog
      title="确定通过该短信吗？"
      :visible.sync="batchMessagedialog"
      width="500px"
      @close="handleClose"
    >
      <div>
        <el-form :model="statusForm" ref="statusForm" label-width="80px" :rules="rules">
          <el-form-item prop="status">
            <el-radio-group v-model="statusForm.status">
              <el-radio v-for="(item,index) of statusListText" :key="index" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="statusForm.status === '2'">
            <el-input type="textarea" v-model="statusForm.text" placeholder="请输入拒绝理由"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="batchMessageCloce">取 消</el-button>
    <el-button type="primary" @click="batchMessageSubmit('statusForm')">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import { timingTaskPage } from '@/api/settings'

  const lineTableData = [
    { label: '客户名称', value: 'customerName', width: 40, overText: true },
    { label: '发送周期(星期)', value: 'periodWeekOfDay', width: 40, overText: true },
    { label: '发送内容', value: 'content', width: 40, overText: true },
    { label: '发送时间', value: 'timingSendTime', width: 40, overText: true },
    { label: '计费条数', value: 'billingNum', width: 40, overText: true },
    { label: '接收号码数量', value: 'phoneNum', width: 40, overText: true },
    { label: '状态', value: 'statusMsg', width: 40, overText: true }
  ]
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'
  import { butList } from '@/mixns/butMenu'

  export default {
    mixins: [filter, data,butList],
    data() {
      return {
        statusForm: {
          status: '',
          text: ''
        },
        lineTableData: lineTableData,
        batchMessagedialog: false,
        appform: {
          custName: null,
          status: null,
        },
        rules: {
          status: [
            { required: true, message: '请选择审核状态!', trigger: 'blur' }
          ]
        },
        statusOption: [
          {
            label: '全部',
            value: ''
          }
        ]
      }
    },
    created() {
      this.statusOption = this.statusOption.concat(this.marketingCenterStatus)
      const schema = this.$store.state.app.inspectSchema
      if (schema) {
        this.appform = schema
        this.page = schema
      }
      this.fetchData()
      console.log('112121')
    },
    methods: {
      delData(row) {
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
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      timingTaskPageData(params) {
        timingTaskPage(params).then(res => {
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
        this.timingTaskPageData(params)
      }
    }
  }
</script>
