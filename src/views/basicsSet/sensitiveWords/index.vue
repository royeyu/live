<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}列表
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="敏感词">
          <el-input clearable type="text" placeholder="请输入敏感词" v-model.trim="appform.keyword"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
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
          <el-button   v-if="menubutscreen('sensitiveWords','查询')" @click="searchData" type="primary">查询</el-button>
          <el-button   v-if="menubutscreen('sensitiveWords','新增')" @click="goTo('/basicsSet/sensitiveWords/add')" type="primary">新增敏感词</el-button>
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
        <template slot-scope="scope"><span>{{ scope.$index + (page.pageNum - 1) * page.pageSize + 1 }} </span>
        </template>
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
        width="220"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" v-if="menubutscreen('sensitiveWords','删除')" @click="delData(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>

  </div>
</template>

<script>
  import { keywordDel, keywordPage } from '@/api/settings'

  const lineTableData = [
    { label: '敏感词', value: 'keyName', width: 80, overText: true },
    { label: '创建日期', value: 'createTime', width: 80, overText: true }
  ]
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'
  import { butList } from '@/mixns/butMenu'

  export default {
    mixins: [filter, data, butList],
    data() {
      return {
        lineTableData: lineTableData,
        appform: {
          keyword: null,
          time: null,
        },
        rules: {
          status: [
            { required: true, message: '请选择审核状态!', trigger: 'blur' }
          ]
        },
        statusOption: [
          {
            label: '全部',
            value: null
          }
        ],
        typeOption: [
          {
            label: '全部',
            value: null
          }
        ]
      }
    },
    created() {
      this.statusOption = this.statusOption.concat(this.basicsSetOption)
      this.typeOption = this.typeOption.concat(this.numberAddBusinessTypeOPtion)
      const schema = this.$store.state.app.inspectSchema
      if (schema) {
        this.appform = schema
        this.page = schema
      }
      this.fetchData()
    },
    methods: {
      delData(row) {
        this.$confirm('是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          keywordDel({id: row.id}).then(res => {
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
      keywordPageData(par) {
        keywordPage(par).then(res => {
          this.tableData = res.data.records
          this.total = res.data.total
          this.listLoading = false
        }).catch(e => {
          this.listLoading = false
        })
      },
      fetchData() {
        this.listLoading = true
        let params = {
          ...this.appform,
          ...this.page
        }
        if (this.appform.time) {
          params.beginTime = this.appform.time[0]
          params.endTime = this.appform.time[1]
        }
        delete params.time
        this.keywordPageData(params)
      }
    }
  }
</script>
