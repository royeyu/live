<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{$route.meta.title}}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="客户名称:">
          <el-input clearable type="text" placeholder="请输入客户名称" v-model.trim="appform.name"></el-input>
        </el-form-item>
        <el-form-item label="企业号码:">
          <el-input clearable type="text" placeholder="请输入企业号码" v-model.trim="appform.name"></el-input>
        </el-form-item>
        <el-form-item label="群组名称:">
          <el-input clearable type="text" placeholder="请输入群组名称" v-model.trim="appform.name"></el-input>
        </el-form-item>
        <el-form-item label="业务类型:">
          <el-select v-model="appform.province" clearable placeholder="请选择所属省份">
            <el-option
              v-for="item in numberBusinessTypeOptionAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select v-model="appform.area" clearable placeholder="请选择所属地市">
            <el-option
              v-for="item in examineTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期:">
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
          <el-button   type="primary">查询</el-button>
<!--          <el-button   @click="goTo('/number/enterprise/add')" type="primary">新增号码</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="appform">
      <el-form  inline label-width="100px"  >
        <el-form-item>
<!--          <el-button @click="allAdopt" type="primary"  >批量审核</el-button>-->
<!--          <el-button @click="allDel" type="primary"  >批量删除</el-button>-->
<!--          <el-button @click="goTo('/number/enterprise/group')" type="primary"  >新增群组</el-button>-->
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
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
      >
        <template slot-scope="scope"><span>{{scope.$index+(page.pageName - 1) * page.pageSize + 1}} </span></template>
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
      </el-table-column>
<!--      <el-table-column
        label="操作"
        width="240"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="adopt(scope.row)">审核</el-button>
          <el-button size="mini" @click="goTo('/number/enterprise/see',{id: scope.row.id})" type="warning">查看</el-button>
          <el-button size="mini" @click="delData(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>
  </div>
</template>

<script>
  const exportData = [
    { label: "客户名称", value: "name", width: 40,overText: true },
    { label: "产品名称", value: "total", width: 40,overText: true },
    { label: "业务类型", value: "averaged", width: 40,overText: true },
    { label: "所属群组", value: "averaged", width: 40,overText: true },
    { label: "企业号码", value: "averaged", width: 40,overText: true },
    { label: "创建日期", value: "averaged", width: 40,overText: true },
    { label: "审核状态", value: "averaged", width: 40,overText: true },
    { label: "号码状态", value: "averaged", width: 40,overText: true },
  ];
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'
  export default {
    mixins: [filter,data],
    data() {
      return {
        examineForm: {
          admin: '',
          group: '',
          name: ''
        },
        examinetableData: [],
        examineDelTableData: [],
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
      this.statusOption = this.statusOption.concat(this.customerStatusOption)
      this.dataOption = this.dataOption.concat(this.customerDataOption)
      this.fetchData()
    },
    methods: {
      // 批量审核
      allAdopt() {
        this.$confirm('确定审核通过？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '通过',
          cancelButtonText: '不通过'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '保存修改'
            });
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          });
      },
      // 批量删除
      allDel() {
        this.$confirm('确定删除？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '通过',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '保存修改'
            });
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          });
      },
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
