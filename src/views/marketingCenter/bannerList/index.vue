<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="业务类型">
          <el-select v-model="appform.busiType" clearable placeholder="请选择所属省份">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button   v-if="menubutscreen('bannerList','查询')" @click="searchData" type="primary">查询</el-button>
          <el-button   v-if="menubutscreen('bannerList','新增')" @click="goTo('/marketingCenter/bannerList/add')" type="primary">新增</el-button>
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
        align="center"
        :prop="item.value"
        :show-overflow-tooltip="item.overText"
        :label="item.label"
        :min-width="item.width"
      >
        <template slot-scope="scope">
          <span v-if="item.value === 'orders'" class="linkColor">
            <span v-show="scope.row['isEdit'] === true">
              <el-input size="mini" ref="input" type="number" @blur="blurIndex(scope.row,scope.$index)" v-model="scope.row[item.value]"></el-input>
            </span>
            <span v-show="scope.row['isEdit'] === false" @click="showEditInput(scope.row,scope.$index)">{{ scope.row.orders }}</span>
          </span>
          <div v-else-if="item.value === 'imgUrl'" class="bannerImg">
            <el-avatar v-if="scope.row[item.value]" shape="square" :size="100" fit="contain" :src="scope.row[item.value]"></el-avatar>
          </div>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" v-if="menubutscreen('bannerList','编辑')" @click="goTo('/marketingCenter/bannerList/update',{id: scope.row.id})" type="primary">编辑</el-button>
          <el-button size="mini" v-if="menubutscreen('bannerList','删除')" @click="delData(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>
  </div>
</template>

<script>
import {bannerDel, bannerEdit, bannerPage, bannerSort} from '@/api/settings'

  const exportData = [
    { label: '业务类型', value: 'busiTypeMsg', width: 40, overText: true },
    { label: '图片', value: 'imgUrl', width: 80, overText: true },
    { label: '创建时间', value: 'createTime', width: 40, overText: true },
    { label: '来源', value: 'srcTypeMsg', width: 40, overText: true },
    { label: '上架时间', value: 'startTime', width: 40, overText: true },
    { label: '下架时间', value: 'endTime', width: 40, overText: true },
    { label: '排序', value: 'orders', width: 40, overText: true }
  ]
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'
  import { butList } from '@/mixns/butMenu'

  export default {
    mixins: [filter, data,butList],
    data() {
      return {
        appform: {
          busiType: ''
        },
        dataExport: exportData,
        typeOption: [
          {
            label: '全部',
            value: ''
          }
        ]
      }
    },
    created() {
      // 业务类型
      this.dictGetByCodeData('service_type').then(res => {
        this.typeOption = this.typeOption.concat(res)
      })
      this.typeOption = this.typeOption.concat(this.bannerTypeLIstOption)
      const schema = this.$store.state.app.inspectSchema
      if (schema) {
        this.appform = schema
        this.page = schema
      }
      this.fetchData()
    },
    methods: {
      // 显示行内输入框
      showEditInput(row,index){
        this.tableData[index].isEdit = true
        setTimeout(() => {
          this.$refs.input[index].focus()
        },)
      },
      // 行内输入框失去焦点
      blurIndex(row,index){
        this.tableData[index].isEdit = false
        let params = {
          id: row.id,
          orders: row.orders
        }
        bannerSort(params).then(res => {
          this.$message.success('操作成功！')
          this.fetchData()
        })
      },
      // banner 列表
      bannerPageData(params) {
        bannerPage(params).then(res => {
          this.tableData = res.data.records.filter(item=> {
            item.isEdit = false
            return item
          })
          this.total = res.data.total
          this.listLoading = false
        }).catch(e => {
          this.listLoading = false
        })
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
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '审核失败!'
          })
        })
      },
      // 删除
      delData(item) {
        this.$confirm('是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bannerDel({id: item.id}).then(res => {
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
      reset(item) {
        this.$confirm('是否重置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '重置失败!'
          })
        })
      },
      fetchData() {
        let params = {
          ...this.appform,
          ...this.page
        }
        this.listLoading = true
        this.bannerPageData(params)
      }
    }
  }
</script>
<style scoped lang="scss">
  .bannerImg{
  }
</style>
