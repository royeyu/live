<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{$route.meta.title}}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px" size="small">
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
          <el-button size="small" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="appform">
      <el-form  inline label-width="100px" size="small">
        <el-form-item>
          <el-button @click="allAdopt" type="primary" size="small">批量审核</el-button>
          <el-button @click="allDel" type="primary" size="small">批量删除</el-button>
          <el-button @click="examineData" type="primary" size="small">审核工具</el-button>
          <el-button @click="examineDelData" type="primary" size="small">删除工具</el-button>
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
        width="100"
        align="center"
      >
        <template slot-scope="scope"><span>{{scope.$index+(page.pageName - 1) * page.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in dataExport"
        :key="index"
        :prop="item.value"
        :show-overflow-tooltip="item.overText"
        :label="item.label"
        :min-width="item.width"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="240"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="adopt(scope.row)">审核</el-button>
          <el-button size="mini" @click="goTo('/individualToEnterprise/enterpriselist/see',{id: scope.row.id})" type="warning">查看</el-button>
          <el-button size="mini" @click="delData(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>
    <el-dialog
      title="审核工具"
      :visible.sync="examineDialog"
      width="900px"
    >
      <div class="formWidth">
        <el-form :model="examineForm" label-width="80px" inline size="small">
          <el-form-item label="地市账户:" placeholder="请选择地市账户">
            <el-select v-model="examineForm.admin">
              <el-option v-for="(item,index) of adminOption" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称:">
            <el-input v-model="examineForm.name" placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item label="群组:" >
            <el-select v-model="examineForm.group" placeholder="请选择群组">
              <el-option v-for="(item,index) of examineGroup" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" size="small">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="listLoading"
          :data="examinetableData"
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
          </el-table-column>
          <el-table-column
            v-for="(item, index) in examineTableRow"
            :key="index"
            :prop="item.value"
            :show-overflow-tooltip="item.overText"
            :label="item.label"
            :min-width="item.width"
          >
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button size="small" type="primary" @click="examineDialog = false">审核通过</el-button>
    <el-button size="small" @click="examineDialog = false">取 消</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="删除工具"
      :visible.sync="examineDelDialog"
      width="1100px"
    >
      <div class="formWidth">
        <el-form :model="examineDelForm" label-width="80px" inline size="small">
          <el-form-item label="地市账户:" placeholder="请选择地市账户">
            <el-select v-model="examineDelForm.admin">
              <el-option v-for="(item,index) of adminOption" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态:" placeholder="请选择审核状态">
            <el-select v-model="examineDelForm.status">
              <el-option v-for="(item,index) of examineDelFormStatusOption" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称:">
            <el-input v-model="examineDelForm.name" placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item label="群组:" >
            <el-select v-model="examineDelForm.group" placeholder="请选择群组">
              <el-option v-for="(item,index) of examineGroup" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" size="small">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="listLoading"
          :data="examineDelTableData"
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
          </el-table-column>
          <el-table-column
            v-for="(item, index) in examineTableRow"
            :key="index"
            :prop="item.value"
            :show-overflow-tooltip="item.overText"
            :label="item.label"
            :min-width="item.width"
          >
          </el-table-column>
        </el-table>
        <div class="texttips">注：审批删除号码后，将无法恢复。</div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button size="small" type="primary" @click="examineDialog = false">审核通过</el-button>
    <el-button size="small" @click="examineDialog = false">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  const exportData = [
    { label: "客户名称", value: "name", width: 40,overText: true },
    { label: "客户账户", value: "total", width: 40,overText: true },
    { label: "产品类型", value: "averaged", width: 40,overText: true },
    { label: "创建日期", value: "averaged", width: 40,overText: true },
    { label: "联系人", value: "averaged", width: 40,overText: true },
    { label: "省市", value: "averaged", width: 40,overText: true },
    { label: "资质状态", value: "averaged", width: 40,overText: true },
  ];
  const examineTableRowData = [
    { label: "客户名称", value: "name", width: 40,overText: true },
    { label: "审核状态", value: "total", width: 40,overText: true },
    { label: "号码数量", value: "averaged", width: 40,overText: true },
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
        examineDelForm: {
          admin: '',
          group: '',
          status: '',
          name: ''
        },
        examinetableData: [],
        examineDelTableData: [],
        examineTableRow: examineTableRowData,
        appform: {
          name: null,
          province: null,
          area: null,
          data: null,
          status: null,
        },
        examineDialog: false,// 审核工具
        examineDelDialog: false, // 删除工具
        dataExport: exportData,
        provinceOption: [
          {
            label: '湖南省',
            value: '430000000'
          }
        ],
        areaOption: [
          {
            label: '长沙市',
            value: '430100000'
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
        ],
      }
    },
    created() {
      this.statusOption = this.statusOption.concat(this.customerStatusOption)
      this.dataOption = this.dataOption.concat(this.customerDataOption)
      this.fetchData()
    },
    methods: {
      // 弹出审核工具
      examineData() {
        this.examineDialog = true
      },
      // 弹出删除工具
      examineDelData() {
        this.examineDelDialog = true
      },
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
