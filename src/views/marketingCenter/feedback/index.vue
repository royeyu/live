<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item label="业务号码">
          <el-input v-model.trim="appform.phone" clearable type="text" style="width: 145px" placeholder="请输入业务号码" />
        </el-form-item>
<!--        <el-form-item label="业务类型">-->
<!--          <el-select v-model="appform.busiType" placeholder="请选择业务类型">-->
<!--            <el-option-->
<!--              v-for="item in typeOption"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="渠道类型">
          <el-select v-model="appform.channel" placeholder="请选择渠道类型">
            <el-option
              v-for="item in feedbackChannelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="appform.replyStatus" placeholder="请选择状态">
            <el-option
              v-for="item in feedbackReplyStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
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
            end-placeholder="结束日期"
          />
        </el-form-item>

        <el-form-item>
          <el-button v-if="menubutscreen('number','查询')" type="primary" @click="searchData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="tableData"
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
        width="55"
      />
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
          <span
            v-if="item.value === 'busiType'"
          >{{ filterName(scope.row[item.value], typeOption) }}</span>
          <span
            v-else-if="item.value === 'channel'"
          >{{ filterName(scope.row[item.value], feedbackChannelList) }}</span>
          <span
            v-else-if="item.value === 'replyStatus'"
          >
            <span v-if="scope.row[item.value] === 0" plain>未回复</span>
            <span v-else-if="scope.row[item.value] === 1" class="color_n">已回复</span>
          </span>
          <span
            v-else-if="item.value === 'orderStatus'"
          >{{ filterName(scope.row[item.value], businessTypeOption) }}</span>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="menubutscreen('number','查看')" size="mini" type="warning" @click="goTo('/marketingCenter/feedbackList/see',{id: scope.row.id})">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
  </div>
</template>

<script>
import {
  getFeedbackList
} from '@/api/customer'

const exportData = [
  { label: '业务号码', value: 'phone', width: 50, overText: true },
  // { label: '业务类型', value: 'busiType', width: 40, overText: true },
  { label: '渠道类型', value: 'channel', width: 40, overText: true },
  { label: '反馈内容', value: 'content', width: 100, overText: true },
  { label: '状态', value: 'replyStatus', width: 30, overText: true },
  { label: '反馈日期', value: 'createTime', width: 70, overText: true },
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'

export default {
  mixins: [filter, data, butList],
  data() {
    return {
      appform: {
        channel: '',
        phone: '',
        groupName: '',
        busiType: '',
        replyStatus: ''
      },
      typeOption: [
        {
          label: '全部',
          value: null
        }
      ],
      loadingS: false,
      dataExport: exportData,
    }
  },
  created() {
    // 业务类型
    this.dictGetByCodeData('service_type').then(res => {
      this.typeOption = this.typeOption.concat(res)
    })
    // bannerTypeLIstOption
    this.$nextTick(() => {
      const schema = this.$store.state.app.inspectSchema
      if (schema) {
        this.appform = schema
        this.page = schema
      }
      this.fetchData()
    })
  },
  methods: {
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
      this.feedbackPageData(params)
    },
    // 列表
    feedbackPageData(params) {
      getFeedbackList(params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.cokey++
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
      })
    },
  }
}
</script>
