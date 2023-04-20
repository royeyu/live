<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px" size="small">
        <el-form-item label="客户名称:">
          <el-input clearable type="text" placeholder="请输入客户名称" v-model.trim="appform.name"></el-input>
        </el-form-item>
        <el-form-item label="客户账户:">
          <el-input clearable type="text" placeholder="请输入客户账户" v-model.trim="appform.name"></el-input>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select v-model="appform.userStatus" placeholder="请选择审核状态">
            <el-option
              v-for="item in userStatusOPtion"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期:">
          <el-date-picker
            v-model="appform.time"
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
          <el-button size="small" type="primary">查询</el-button>
          <el-button size="small" @click="goTo('/individualToEnterprise/enterpriseCustomers/add')" type="primary">新增</el-button>
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
        <template slot-scope="scope"><span>{{ scope.$index + (page.pageName - 1) * page.pageSize + 1 }} </span></template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in lineTableData"
        :key="index"
        :prop="item.value"
        :show-overflow-tooltip="item.overText"
        :label="item.label"
        :min-width="item.width"
      >
        <template v-if="item.value === 'name'" slot-scope="scope">
          <span class="color5">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="delData(scope.row)" type="primary">重置</el-button>
          <el-button size="mini" @click="showStatus(scope.row)" type="primary">通过</el-button>
          <el-button size="mini" @click="goTo('/individualToEnterprise/enterpriseCustomers/see',{id: scope.row.id})" type="warning">查看</el-button>
          <el-button size="mini" @click="goTo('/individualToEnterprise/enterpriseCustomers/modify',{id: scope.row.id})" type="warning">编辑</el-button>
          <el-button size="mini" @click="goTo('/individualToEnterprise/enterpriseCustomers/xlxsFile',{id: scope.row.id})" type="primary">配置规则</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :hidden="total < 1" @pagination="changePage"></el-page>
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
  const lineTableData = [
    { label: '客户名称', value: 'name', width: 40, overText: true },
    { label: '客户账户', value: 'total', width: 40, overText: true },
    { label: '产品类型', value: 'averaged', width: 40, overText: true },
    { label: '创建日期', value: 'averaged', width: 40, overText: true },
    { label: '联系人', value: 'averaged', width: 40, overText: true },
    { label: '地区', value: 'averaged', width: 40, overText: true },
    { label: '资费状态', value: 'averaged', width: 40, overText: true },
  ]
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'

  export default {
    mixins: [filter, data],
    data() {
      return {
        statusForm: {
          status: '',
          text: ''
        },
        lineTableData: lineTableData,
        batchMessagedialog: false,
        appform: {
          name: null,
          userStatus: null,
          status: null,
          time: null
        },
        rules: {
          status: [
            { required: true, message: '请选择审核状态!', trigger: 'blur' }
          ]
        },
      }
    },
    created() {
      this.fetchData()
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
