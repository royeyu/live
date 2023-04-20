<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="专题名称">
          <el-input clearable type="text" placeholder="请输入专题名称" v-model.trim="appform.subjectName"></el-input>
        </el-form-item>
        <el-form-item label="显示位置">
          <el-select v-model="appform.location" clearable placeholder="请选择业务类型">
            <el-option
              v-for="item in positionData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="appform.busiType" clearable placeholder="请选择业务类型">
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
          <el-button   v-if="menubutscreen('specialList','查询')" @click="searchData" type="primary">查询</el-button>
          <el-button   v-if="menubutscreen('specialList','新增')" @click="goTo('/marketingCenter/specialList/add')" type="primary">新增</el-button>
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
        width="40"
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
        <template slot-scope="scope">
          <span v-if="item.value === 'status'"
          >
            <span v-if="scope.row['status'] === 1"   class="color_n">显示</span>
            <span v-else   class="color_u">隐藏</span>
          </span>
          <div v-else-if="item.value === 'bannerUrl' || item.value === 'coverUrl'" class="bannerImg">
            <el-avatar v-if="scope.row[item.value] && scope.row.location === 1" shape="square" :size="100" fit="contain" :src="scope.row[item.value]"></el-avatar>
          </div>
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
          <el-button size="mini" v-if="scope.row.status === 1" @click="setData(scope.row)" type="primary">隐藏</el-button>
          <el-button size="mini" v-else @click="setData(scope.row)" type="primary">显示</el-button>
          <el-button size="mini" v-if="menubutscreen('specialList','关联模板')"
                     @click="goTo('/marketingCenter/specialList/relationTemplate',{id: scope.row.id})" type="primary">关联模板</el-button>

          <el-button size="mini" v-if="menubutscreen('specialList','编辑')" @click="goTo('/marketingCenter/specialList/modify',{id: scope.row.id})" type="primary">
            编辑
          </el-button>
          <el-button size="mini" v-if="menubutscreen('specialList','删除')" @click="delData(scope.row)" type="danger">删除</el-button>
          </ColumnOperation>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>
  </div>
</template>

<script>
  import { subjectDel, subjectEdit, subjectPage } from '@/api/settings'

  const exportData = [
    { label: '专题名称', value: 'subjectName', width: 100, overText: true },
    { label: '封面图片', value: 'coverUrl', width: 120, overText: true },
    { label: '业务类型', value: 'busiTypeMsg', width: 100, overText: true },
    { label: '子页面banner', value: 'bannerUrl', width: 120, overText: true },
    { label: '来源', value: 'srcTypeMsg', width: 100, overText: true },
    { label: '关联条数', value: 'linkedNum', width: 100, overText: true },
    { label: '显示位置', value: 'locationMsg', width: 100, overText: true },
    { label: '排序', value: 'orders', width: 100, overText: true },
    { label: '状态', value: 'status', width: 100, overText: true }
  ]
  import { filter } from '@/mixns/filter'
  import { data } from '@/mixns/data'
  import { butList } from '@/mixns/butMenu'
  import ColumnOperation from '@/components/ColumnOperation/index.vue'

  export default {
    components: {
      ColumnOperation
    },
    mixins: [filter, data,butList],
    data() {
      return {
        // cokey 用来刷新ColumnOperation组件
        cokey: 0,
        appform: {
          subjectName: '',
          location: '',
          busiType: '',
        },
        positionData: [
          {
            label: '全部',
            value: ''
          }
        ],
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
      this.positionData = this.positionData.concat(this.bannerShowPosition)
      const schema = this.$store.state.app.inspectSchema
      if (schema) {
        this.appform = schema
        this.page = schema
      }
      this.fetchData()
    },
    methods: {
      // 修改
      setData(row) {
        let params = {
          id: row.id,
          status: row.status === 1 ? '2' : 1
        }
        subjectEdit(params).then(res => {
         this.successData()
        })
      },
      // 删除
      delData(item) {
        this.$confirm('是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          subjectDel({id: item.id}).then(res => {
            this.successData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作失败!'
          })
        })
      },
      subjectPageData(par) {
        subjectPage(par).then(res => {
          this.tableData = res.data.records
          this.total = res.data.total
          this.cokey++
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
        if (this.generateDate) {
          params.beginTime = this.generateDate[0]
          params.endTime = this.generateDate[1]
        }
        this.subjectPageData(params)
      }
    }
  }
</script>
