<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{$route.meta.title}}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="模板名称">
          <el-input clearable type="text" placeholder="请输入模板名称" v-model.trim="appform.name"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input clearable type="text" placeholder="请输入客户名称" v-model.trim="appform.name"></el-input>
        </el-form-item>
        <el-form-item label="业务号码">
          <el-input clearable type="text" placeholder="请输入业务号码" v-model.trim="appform.name"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
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
        <el-form-item label="审核状态">
          <el-select v-model="appform.area" clearable placeholder="请选择产品类型">
            <el-option
              v-for="item in dataOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板类型">
          <el-select v-model="appform.area" clearable placeholder="请选择客户状态">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button   v-if="menubutscreen('flashShortEnterpriseList','查询')" type="primary">查询</el-button>
<!--          <el-button   @click="goTo('/flashShort/enterprise/add')" type="primary">新增模板</el-button>-->
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
<!--      <el-table-column
        label="操作"
        width="360"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="adopt(scope.row)">初审</el-button>
          <el-button size="mini" @click="goTo('/flashShort/enterprise/see',{id: scope.row.id})" type="warning">详情</el-button>
          <el-button size="mini" @click="goTo('/flashShort/enterprise/modify',{id: scope.row.id})" type="primary">编辑</el-button>
          <el-button size="mini" @click="delData(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>
    <el-dialog
      title="确定通过该模板吗？"
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
  import { butList } from '@/mixns/butMenu'

  const exportData = [
    { label: "模板名称", value: "name", width: 40,overText: true },
    { label: "业务类型", value: "total", width: 40,overText: true },
    { label: "客户名称", value: "averaged", width: 40,overText: true },
    { label: "模板类型", value: "averaged", width: 40,overText: true },
    { label: "模板内容", value: "averaged", width: 40,overText: true },
    { label: "创建日期", value: "averaged", width: 40,overText: true },
    { label: "模板状态", value: "averaged", width: 40,overText: true },
  ];
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'
  export default {
    mixins: [filter,data, butList],
    data() {
      return {
        batchMessagedialog: false,
        statusForm: {
          status: '',
          text: ''
        },
        rules: {
          status: [
            { required: true, message: '请选择审核状态!', trigger: 'blur' }
          ]
        },
        appform: {
          name: null,
          province: null,
          area: null,
          data: null,
          status: null,
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
        ],
      }
    },
    created() {
      this.statusOption = this.statusOption.concat(this.flashShortType)
      this.dataOption = this.dataOption.concat(this.flashShortShStatus)
      this.fetchData()
    },
    methods: {
      handleClose() {
        this.$refs.statusForm.resetFields()
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
      adopt(item) {
        this.batchMessagedialog = true
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
