<template>
  <div class="app-container customerList">
    <div class="texttitle-back" >
      <span>{{ $route.meta.title }}</span>
      <el-button type="primary" size="mini" @click="goReturn">返回</el-button>
    </div>
<!--    <div class="texttitle">-->
<!--      {{ $route.meta.title }}-->
<!--      <el-button type="primary"   @click="goReturn">返回</el-button>-->
<!--    </div>-->
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="模板名称:">
          <el-input clearable type="text" placeholder="请输入模板名称" v-model.trim="appform.templateName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button   @click="searchData" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-form inline label-width="100px"  >
        <el-form-item>
          <el-button   @click="showRelationDialog" type="primary">新增关联</el-button>
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
        v-for="(item, index) in dataExport"
        :key="index"
        :prop="item.value"
        align="center"
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
          <el-button size="mini"  v-if="scope.row.delFlag===0 || scope.row.delFlag ==null" @click="closeTem(scope.row)" type="primary">{{scope.row.delFlag}}取消关联</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>
    <el-dialog
      title="关联模板"
      :visible.sync="newRelationDialog"
      width="800px"
      @close="newRelationDialogClose"
    >
      <div>
        <div>
          <el-form :model="childrenTemForm" inline label-width="80px"  >
            <el-form-item label="模板名称:">
              <el-input clearable type="text" placeholder="请输入模板名称" v-model.trim="childrenTemForm.templateName"></el-input>
            </el-form-item>
<!--            <el-form-item label="模板类型:">-->
<!--              <el-select v-model="childrenTemForm.templateType" clearable placeholder="请选择业务类型">-->
<!--                <el-option-->
<!--                  v-for="item in relationTemplateformStatusOption"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value"-->
<!--                >-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-form-item>
              <el-button   @click="searchChildrenData" type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="lineTab"
          element-loading-text="Loading"
          border
          fit
          @selection-change="selectTable"
          highlight-current-row
        >
          <el-table-column
            type="selection"
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
            v-for="(item, index) in lineTableData"
            :key="index"
            :prop="item.value"
            align="center"
            :show-overflow-tooltip="item.overText"
            :label="item.label"
            :min-width="item.width"
          >
          </el-table-column>
        </el-table>
<!--        <div class="lm-page">
          <el-page :total="temTotal" :limit="childrenTemForm.pageSize" :hidden="temTotal < 1" @pagination="temChangePage"></el-page>
        </div>-->
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button   @click="newRelationDialog = false">取 消</el-button>
    <el-button   :loading="subloading" type="primary" @click="submitRelationForm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import { subjectAddLinked, subjectEditBusiSubjectTemplate, subjectPage2 } from '@/api/settings'

  const exportData = [
    { label: '模板名称', value: 'templateName', width: 100, overText: true },
    { label: '模板内容', value: 'templateContent', width: 100, overText: true },
  ]
  const lineTableData = [
    { label: "模板名称", value: "templateName", width: 40,overText: true },
    { label: "模板内容", value: "templateContent", width: 40,overText: true },
  ];
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'
  import { templateGetList } from '@/api/customer'

  export default {
    mixins: [filter, data],
    data() {
      return {
        lineTab: [],
        lineTableData:  lineTableData,
        newRelationDialog: false,
        temTotal: 0,
        appform: {
          templateName: null
        },
        childrenTemForm: {
          // pageNum: 1,
          // pageSize: 10,
          templateName: '',
          templateType: 1
        },
        positionData: [
          {
            label: '全部',
            value: null
          }
        ],
        selectTabData: {},
        dataExport: exportData,
        typeOption: [
          {
            label: '全部',
            value: null
          }
        ]
      }
    },
    created() {
      this.typeOption = this.typeOption.concat(this.businessStatusOption)
      this.positionData = this.positionData.concat(this.bannerShowPosition)
      this.fetchData()
    },
    methods: {
      // 取消关联
      closeTem(row) {
        this.$confirm('是否取消管理?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id: row.id,
            delFlag: 1
          }
          subjectEditBusiSubjectTemplate(data).then(res => {
            this.successData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作失败!'
          })
        })
      },
      selectTable(selection, row) {
        // const page = this.childrenTemForm.pageNum
        this.selectTabData = selection
        console.log(this.selectTabData)
        // this.$emit('tabData', this.selectTabData)
      },
      // 关联模板弹窗
      showRelationDialog() {
        this.newRelationDialog = true
        this.temListData()
      },
      searchChildrenData() {
        this.selectTabData = []
        this.temListData()
      },
      templateGetListData(par) {
        templateGetList(par).then(res => {
          this.lineTab = res.data
          // this.temTotal = res.data.total
        })
      },
      temChangePage(val) {
        // this.childrenTemForm.pageNum = val.page
        // this.childrenTemForm.pageSize = val.limit
        this.showRelationDialog()
      },
      temListData() {
        this.templateGetListData(this.childrenTemForm)
      },
      // 关联模板弹窗 关闭回调
      newRelationDialogClose() {

      },
      // 提交关联模板
      submitRelationForm() {
        if (this.selectTabData.length) {
          let ids = []
          this.selectTabData.map(item => {
            ids.push(item.id)
          })
          let params = {
            subjectId: this.$route.query.id,
            ids: ids.join(',')
          }
          this.subloading = true
          subjectAddLinked(params).then(res => {
            this.successData()
            this.subloading = false
            this.newRelationDialog = false
          }).catch(e => {
            this.subloading = false
          })
        } else {
          this.$message.warning('请选择关联模板！')
        }
      },
      subjectPage2Data(params) {
        subjectPage2(params).then(res => {
          this.tableData = res.data.records
          // console.log(this.tableData)
          this.total = res.data.total
          this.listLoading = false
        }).catch(e => {
          this.listLoading = false
        })
      },
      // 分页事件 在混入
      // 拉取数据
      fetchData() {
        this.listLoading = true
        let params = {
          ...this.appform,
          ...this.page
        }
        params.subjectId = this.$route.query.id
        this.subjectPage2Data(params)
      }
    }
  }
</script>
