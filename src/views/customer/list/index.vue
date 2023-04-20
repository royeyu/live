<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">

        <el-form-item label="客户名称">
          <el-input v-model.trim="appform.customerName" style="width: 240px" clearable type="text" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model.trim="appform.customerAccount" style="width: 240px" clearable type="text" placeholder="请输入客户账户" />
        </el-form-item>
        <el-form-item label="数据来源">
          <el-select v-model="appform.custSrc" placeholder="请选择数据来源">
            <el-option
              v-for="item in dataOption"
              :key="item.itemValue"
              :label="item.itemText"
              :value="item.itemValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="appform.ckStatus" clearable placeholder="请选择客户状态">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属省份">
          <el-select v-model="appform.province" placeholder="请选择所属省份" @change="changeProvince">
            <el-option
              v-for="item in provinceOption"
              :key="item.id"
              :label="item.province"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属地市">
          <el-select v-model="appform.city" placeholder="请选择所属地市">
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
          <el-button v-if="menubutscreen('cust','查询')" type="primary" @click="searchData">查询</el-button>
          <!--          <el-button size="small" @click="goTo('/customer/customer/import')" type="primary">导入客户</el-button>-->
          <el-button v-if="menubutscreen('cust','新增')" type="primary" @click="goTo('/customer/customer/add')">新增客户</el-button>
        </el-form-item>
      </el-form>

    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="加载中"
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
          <span v-if="item.value === 'username'">{{ scope.row.username }}</span>
          <span v-else-if="item.value === 'province'">{{ scope.row.provinceName }}{{ scope.row.cityName }}</span>
          <span v-else-if="item.value === 'ckStatus'">
            <span v-if="scope.row.ckStatus === 2" class="color2">{{ scope.row.ckStatusStr }}</span>
            <span v-else-if="scope.row.ckStatus === -1" class="color3">{{ scope.row.ckStatusStr }}</span>
            <span v-else-if="scope.row.ckStatus === 1" class="color5">{{ scope.row.ckStatusStr }}</span>
            <span v-else class="color5">{{ scope.row.ckStatusStr }}</span>
          </span>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="250"
        align="center"
      >
        <template slot-scope="scope">
          <ColumnOperation :key="cokey+'-'+scope.row.id">
            <el-button v-if="(scope.row.ckStatus == 1) && menubutscreen('cust','审核')" size="mini" type="success" @click="adopt(scope.row)">审核</el-button>
            <el-button v-if="menubutscreen('cust','详情')" size="mini" type="warning" @click="goTo('/customer/customer/see',{id: scope.row.id})">详情</el-button>
            <!--          <div class="mt8">-->
            <el-button v-if="menubutscreen('cust','编辑')" size="mini" type="primary" @click="goTo('/customer/customer/modify',{id: scope.row.id})">编辑
            </el-button>
            <el-button v-if="menubutscreen('cust','重置')" size="mini" @click="reset(scope.row)">重置</el-button>
            <el-button v-if="menubutscreen('cust','删除')" size="mini" type="danger" @click="delData(scope.row)">删除</el-button>
            <el-button v-if="menubutscreen('cust','重置')&& scope.row.custSrc!=5" size="mini" type="success" @click="adrole(scope.row)">角色</el-button>
            <!--          </div>-->
          </ColumnOperation>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dataStatusDialog"
      width="500px"
      @close="closeForm"
    >
      <div style="padding: 10px 30px 0px 30px">
        <el-form ref="dataStatusForm" label-width="100" :model="dataStatusForm" :rules="rules">
          <el-form-item prop="status">
            <el-radio-group v-model="dataStatusForm.status">
              <el-radio v-for="(item,index) of auditStatus" :key="index" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="dataStatusForm.status==-1" label="备注：" prop="remark">
            <el-input v-model="dataStatusForm.remark" type="textarea" :rows="5" placeholder="请输入不通过原因" maxlength="50" show-word-limit />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataStatusDialog = false">取 消</el-button>
        <el-button type="primary" @click="subexamine">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改客户角色"
      :visible.sync="userRoleDialog"
      width="380px"
    >
      <div v-if="userRoleDialog" style="padding: 10px 30px 0px 30px;">
        <el-form ref="userRoleForm" label-width="100" :model="userRoleForm" :rules="rules">
          <el-form-item label="客户名称:">
            <span>{{ userRoleForm.customerName }}</span>
          </el-form-item>
          <el-form-item prop="userRole" label="客户角色:">
            <el-select v-model="userRoleForm.userRole" placeholder="请选择客户角色" @change="userRoleChange">
              <el-option
                v-for="item in userRoleDataList"
                :key="item.itemValue"
                :label="item.itemText"
                :value="item.itemValue"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="modiyRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { customeDelete, customeResetPass, customerModifyCkStatus, customerPage, updateCustRole } from '@/api/customer'
import ColumnOperation from '@/components/ColumnOperation/index.vue'

const exportData = [
  { label: '客户名称', value: 'customerName', width: 70, overText: true },
  { label: '客户账户', value: 'customerAccount', width: 40, overText: true },
  { label: '数据来源', value: 'custSrcName', width: 20, overText: true },
  { label: '创建日期', value: 'createTime', width: 45, overText: true },
  { label: '联系人', value: 'linkMan', width: 20, overText: true },
  { label: '省市', value: 'province', width: 30, overText: true },
  { label: '审核状态', value: 'ckStatus', width: 30, overText: true },
  { label: '客户角色', value: 'userRoleStr', width: 30, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { dictCity, dictGetByCode, dictProvince } from '@/api/system'
import { butList } from '@/mixns/butMenu'

export default {
  name: 'CustomerList',
  components: {
    ColumnOperation
  },
  mixins: [filter, data, butList],
  data() {
    return {
      // cokey 用来刷新ColumnOperation组件
      cokey: 0,
      appform: {
        customerName: null,
        customerAccount: null,
        province: null,
        city: null,
        custSrc: null,
        ckStatus: null
      },
      dataExport: exportData,
      dataStatusDialog: false,
      dataStatusForm: {
        status: null,
        remark: null
      },
      userRoleDialog: false,
      userRoleForm: {
        userRole: null
      },
      userRoleDataList: [],
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
          itemText: '全部',
          itemValue: null
        }
      ],
      statusOption: [
        {
          label: '全部',
          value: null
        }
      ],
      statusId: null,
      rules: {
        status: [
          { required: true, message: '请选择是否通过审核！' }
        ],
        remark: [
          { required: true, message: '请输入不通过原因！' }
        ],
        userRole: [
          { required: true, message: '请选择客户角色' }
        ]
      }
    }
  },
  created() {
    // 权限列表
    this.dictGetByUserType()
    this.statusOption = this.statusOption.concat(this.customerStatusOption)
    const schema = this.$store.state.app.inspectSchema
    if (schema) {
      this.generateDate = schema.generateDate
      delete schema.generateDate
      this.appform = schema
      this.page = schema
    }
    this.fetchData()
    // 产品类型
    this.dictGetByCodeData()
    // 省份查询
    this.dictProvinceData()
  },
  methods: {
    closeForm() {
      this.dataStatusForm.remark = ''
    },
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
    // 产品类型
    dictGetByCodeData() {
      dictGetByCode({ dictCode: 'cust_src' }).then(res => {
        this.dataOption = this.dataOption.concat(res.data)
      })
    },
    // 权限列表
    dictGetByUserType() {
      dictGetByCode({ dictCode: 'cust_role_type' }).then(res => {
        // console.log(res.data)
        this.userRoleDataList = res.data
      })
    },
    customerPageData(params) {
      this.listLoading = false
      customerPage(params).then(res => {
        this.tableData = res.data.records
        this.tableData.forEach((item) => {
          item.userRole =  item.userRole.toString()
        })
        this.total = res.data.total
        this.listLoading = false
        this.cokey++
      }).catch(e => {
        this.listLoading = false
      })
    },
    randomArr(arr) {
      const index = Math.floor(Math.random() * arr.length)
      return arr[index]
    },
    adopt(item) {
      this.dataStatusDialog = true
      this.statusId = item.id
    },
    subexamine() {
      this.$refs.dataStatusForm.validate((value) => {
        if (value) {
          this.customerModifyCkStatusData()
        }
      })
    },
    customerModifyCkStatusData() {
      const params = {
        'id': this.statusId,
        'status': this.dataStatusForm.status,
        'remark': this.dataStatusForm.remark
      }
      customerModifyCkStatus(params).then(res => {
        this.fetchData()
        this.resetForm('dataStatusForm')
        this.dataStatusDialog = false
        this.$message.info('操作成功！')
      })
    },
    // 删除
    delData(item) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        customeDelete({ id: item.id }).then(res => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败!'
        })
      })
    },
    adrole(item) {
      this.userRoleDialog = true
      this.userRoleForm = item
    },
    userRoleChange(val) {
      this.$forceUpdate()
    },
    modiyRole() {
      this.$refs.userRoleForm.validate((value) => {
        if (value) {
          // console.log(this.userRoleForm)
          updateCustRole({ 'custId': this.userRoleForm.id, 'userRole': this.userRoleForm.userRole }).then(res => {
            this.fetchData()
            this.userRoleDialog = false
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        }
      })
    },

    reset(item) {
      // this.$confirm('确定重置密码吗？默认密码：GDmp_985', '提示', {
      this.$confirm('确定重置密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        customeResetPass({ id: item.id }).then(res => {
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
        }).catch(e => {
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '重置失败!'
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
      this.customerPageData(params)
    }
  }
}
</script>
