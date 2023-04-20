<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model.trim="appform.productName" clearable type="text" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="appform.busiType" placeholder="请选择业务类型">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="productTypeList!=null" label="产品类型">
          <el-select v-model="appform.productType" placeholder="请选择产品类型">
            <el-option key="0" label="全部" value="0" />
            <el-option
              v-for="item in productTypeList"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-if="menubutscreen('productManagement','查询')" type="primary" @click="searchData">查询</el-button>
          <el-button v-if="menubutscreen('productManagement','新增')" type="primary" @click="goTo('/basicsSet/productManagement/add')">新增产品</el-button>
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
        <template slot-scope="scope">
          <span v-if="item.value === 'busiType'">{{ filterName(scope.row.busiType,bannerTypeLIstOption) }}</span>
          <span v-else-if="item.value === 'productType'">{{ filterTypeId(scope.row.productType,productTypeList) }}</span>
          <span v-else-if="item.value === 'smsNum'">{{scope.row.smsNum == '-1' ?'无限':scope.row.smsNum}}</span>
          <span v-else-if="item.value === 'lifeCycle'">{{ scope.row.lifeCycle == 0 ? '长期' : scope.row.lifeCycle }}</span>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
        align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="(scope.row.status === 1) && menubutscreen('productManagement','禁用')" size="mini" type="danger" @click="statusData(scope.row)">禁用</el-button>
          <el-button v-else v-show="menubutscreen('productManagement','启用')" size="mini" type="primary" @click="statusData(scope.row)">启用</el-button>
          <el-button v-if="menubutscreen('productManagement','编辑')" size="mini" type="warning" @click="goTo('/basicsSet/productManagement/update',{id: scope.row.id})">编辑</el-button>
<!--          <el-button v-if="menubutscreen('productManagement','删除')" size="mini" type="danger" @click="delData(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
    <el-dialog
      title="确定通过该短信吗？"
      :visible.sync="batchMessagedialog"
      width="500px"
      @close="handleClose"
    >
      <div>
        <el-form ref="statusForm" :model="statusForm" label-width="80px" :rules="rules">
          <el-form-item prop="status">
            <el-radio-group v-model="statusForm.status">
              <el-radio v-for="(item,index) of statusListText" :key="index" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="statusForm.status === '2'">
            <el-input v-model="statusForm.text" type="textarea" placeholder="请输入拒绝理由" />
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
import { productDel, productDisable, productEnable, productPage, productStatus } from '@/api/settings'

const lineTableData = [
  { label: '产品名称', value: 'productName', width: 40, overText: true },
  { label: '业务类型', value: 'busiTypeName', width: 20, overText: true },
  { label: '产品编码', value: 'productNum', width: 30, overText: true },
  { label: '产品类型', value: 'productType', width: 25, overText: true },
  { label: '产品资费(元)', value: 'productPrice', width: 25, overText: true },
  { label: '有效周期(月)', value: 'lifeCycle', width: 20, overText: true },
  { label: '共享号线', value: 'telNum', width: 20, overText: true },
  { label: '短信数量', value: 'smsNum', width: 30, overText: true },
  { label: '优惠资费', value: 'discountMoney', width: 30, overText: true }
  // { label: '默认通道', value: 'averaged', width: 100, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'
import { getProductTypeList } from '@/api/system'

export default {
  mixins: [filter, data, butList],
  data() {
    return {
      statusForm: {
        status: '',
        text: ''
      },
      lineTableData: lineTableData,
      batchMessagedialog: false,
      appform: {
        productName: '',
        busiType: 0,
        productType: '0'
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状态!', trigger: 'blur' }
        ]
      },
      typeOption: [
        {
          label: '全部',
          value: 0
        }
      ],
      productTypeList: null
    }
  },
  created() {
    this.getProductTypeList()
    // 业务类型
    this.dictGetByCodeData('service_type').then(res => {
      this.bannerTypeLIstOption = res
      this.typeOption = this.typeOption.concat(this.bannerTypeLIstOption)
    })
    const schema = this.$store.state.app.inspectSchema
    if (schema) {
      this.appform = schema
      this.page = schema
    }
    this.fetchData()
  },
  methods: {
    statusData(row) {
      const params = {
        id: row.id,
        status: row.status == 1 ? 2:1
      }
      if (row.status == 1) {
        productDisable(params).then(res => {
          this.successData()
        })
      } else {
        productEnable(params).then(res => {
          this.successData()
        })
      }
    },
    delData(row) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productDel({ id: row.id }).then(res => {
          this.successData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败!'
        })
      })
    },
    // 获取产品类型数据
    getProductTypeList() {
      getProductTypeList().then(res => {
        this.productTypeList = res.data
      })
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
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    productPageData(par) {
      productPage(par).then(res => {
        this.listLoading = false
        const data = res.data
        this.tableData = data.records
        this.total = data.total
      }).catch(e => {
        this.listLoading = false
      })
    },
    fetchData() {
      this.listLoading = true
      const form = {
        ...this.page,
        ...this.appform
      }
      this.productPageData(form)
    }
  }
}
</script>
