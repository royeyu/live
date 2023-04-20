<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item v-if="isSystem()" label="客户名称">
          <el-input v-model.trim="appform.custName" clearable type="text" placeholder="请输入客户名称" />
        </el-form-item>
        <!--        <el-form-item label="业务号码:">
                  <el-input clearable type="text" placeholder="请输入业务号码" v-model.trim="appform.name"></el-input>
                </el-form-item>-->
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
        <el-form-item label="规则状态">
          <el-select v-model="appform.status" placeholder="请选择审核状态">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="isSystem()" label="业务类型">
          <el-select v-model="appform.busiType" placeholder="请选择业务类型">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-if="menubutscreen('ruleSet','查询')" type="primary" @click="searchData">查询</el-button>
          <el-button v-if="menubutscreen('ruleSet','新增')" type="primary" @click="goTo('/basicsSet/ruleSet/add')">新增规则</el-button>
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
        <template slot-scope="scope">
          <div v-if="item.value == 'statusName'">
            <span v-if="scope.row.status == 0" class="color_s">{{ scope.row.statusName }}</span>
            <span v-else-if="scope.row.status == 1" class="color_n">{{ scope.row.statusName }}</span>
            <span v-else-if="scope.row.status == 2" class="color_u">{{ scope.row.statusName }}</span>
            <span v-else>{{ scope.row.statusName }}</span>
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
            <el-button v-if="menubutscreen('ruleSet','详情')" size="mini" type="warning" @click="goTo('/basicsSet/ruleSet/see',{id: scope.row.id})">详情
            </el-button>
            <el-button v-if="(scope.row.status !== 2) && menubutscreen('ruleSet','编辑')" size="mini" type="primary" @click="goTo('/basicsSet/ruleSet/update',{id: scope.row.id})">编辑
            </el-button>
            <!--          <div class="mt8">-->
            <el-button v-if="(scope.row.status === 0) && menubutscreen('ruleSet','启动')" size="mini" type="primary" @click="delData(scope.row, '启动',1)">启动</el-button>
            <el-button v-if="(scope.row.status === 1) && menubutscreen('ruleSet','暂停')" size="mini" type="danger" @click="delData(scope.row, '暂停',0)">暂停</el-button>
            <el-button v-if="(scope.row.status === 1 || scope.row.status === 0) && menubutscreen('ruleSet','停止')" size="mini" type="danger" @click="delData(scope.row, '停止',2)">停止</el-button>
            <!--          </div>-->
            <!--            <el-button v-if="(scope.row.status !== 2) && menubutscreen('ruleSet','添加专业内容')" size="mini" type="primary" @click="goTo('/basicsSet/ruleSet/addContent',{id: scope.row.id})">-->
            <!--              添加专业内容-->
            <!--            </el-button>-->
          </ColumnOperation>
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
              <el-radio v-for="(item,index) of statusListText" :key="index" :label="item.value">{{ item.label }}
              </el-radio>
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
import { bscrulePause, bscruleStart, bscruleStatus, custRolePage } from '@/api/settings'

const lineTableData = [
  { label: '客户名称', value: 'customerName', width: 100, overText: true },
  { label: '规则编号', value: 'ruleNo', width: 100, overText: true },
  { label: '创建日期', value: 'createTime', width: 100, overText: true },
  { label: '业务类型', value: 'busiTypeName', width: 60, overText: true },
  { label: '发送周期', value: 'weekOfDayName', width: 100, overText: true },
  { label: '发送时段', value: 'hourOfDay', width: 40, overText: true },
  { label: '发送内容', value: 'content', width: 100, overText: true },
  { label: '规则状态', value: 'statusName', width: 50, overText: true }
]
const lineTableDataCust = [
  { label: '规则编号', value: 'ruleNo', width: 100, overText: true },
  { label: '创建日期', value: 'createTime', width: 100, overText: true },
  { label: '业务类型', value: 'busiTypeName', width: 60, overText: true },
  { label: '发送周期', value: 'weekOfDayName', width: 100, overText: true },
  { label: '发送时段', value: 'hourOfDay', width: 40, overText: true },
  { label: '发送内容', value: 'content', width: 100, overText: true },
  { label: '规则状态', value: 'statusName', width: 50, overText: true }
]
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'
import ColumnOperation from '@/components/ColumnOperation/index.vue'

export default {
  components: {
    ColumnOperation
  },
  mixins: [filter, data, butList],
  data() {
    return {
      // cokey 用来刷新ColumnOperation组件
      cokey: 0,
      statusForm: {
        status: '',
        text: ''
      },
      lineTableData: lineTableData,
      batchMessagedialog: false,
      appform: {
        custName: '',
        status: '',
        busiType: ''
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状态!', trigger: 'blur' }
        ]
      },
      statusOption: [
        {
          label: '全部',
          value: ''
        }
      ],
      typeOption: [
        {
          label: '全部',
          value: ''
        }
      ]
    }
  },
  created() {
    this.lineTableData = this.isSystem() ? lineTableData : lineTableDataCust
    // 业务类型
    this.dictGetByCodeData('service_type').then(res => {
      this.bannerTypeLIstOption = res
      this.typeOption = this.typeOption.concat(this.bannerTypeLIstOption)
    })
    this.statusOption = this.statusOption.concat(this.basicsSetOption)
    const schema = this.$store.state.app.inspectSchema
    if (schema) {
      this.appform = schema
      this.page = schema
    }
    this.fetchData()
  },
  methods: {
    descartes(list) {
      // parent上一级索引;count指针计数

      var point = {}

      var result = []

      var pIndex = null

      var tempCount = 0

      var temp = []

      // 根据参数列生成指针对象

      for (var index in list) {
        if (typeof list[index] === 'object') {
          point[index] = {

            'parent': pIndex,

            'count': 0

          }

          pIndex = index
        }
      }

      // 单维度数据结构直接返回

      if (pIndex == null) {
        return list
      }

      // 动态生成笛卡尔积

      while (true) {
        for (var index in list) {
          tempCount = point[index]['count']

          temp.push(list[index][tempCount])
        }

        // 压入结果数组
        result.push(temp)

        temp = []

        // 检查指针最大值问题

        while (true) {
          if (point[index]['count'] + 1 >= list[index].length) {
            point[index]['count'] = 0

            pIndex = point[index]['parent']

            if (pIndex == null) {
              return result
            }

            // 赋值parent进行再次检查

            index = pIndex
          } else {
            point[index]['count']++

            break
          }
        }
      }
    },
    cartesian(arr) {
      if (arr.length < 2) return arr[0] || []
      return [].reduce.call(arr, function(col, set) {
        const res = []
        col.forEach(c => {
          set.forEach(s => {
            const t = [].concat(Array.isArray(c) ? c : [c])
            t.push(s)
            res.push(t)
          })
        })
        return res
      })
    },
    delData(row, text, status) {
      this.$confirm(`是否${text}该数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          'id': row.id,
          'status': status
        }
        this.subloading = true
        if (status === 1) {
          bscruleStart(params).then(res => {
            this.successData()
            this.subloading = false
          }).catch(e => {
            this.subloading = false
          })
        } else {
          bscrulePause(params).then(res => {
            this.successData()
            this.subloading = false
          }).catch(e => {
            this.subloading = false
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败!'
        })
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
    // 规则配置 列表查询
    custRolePageData(params) {
      console.log(params)
      custRolePage(params).then(res => {
        res.data.records.map((item) => {
          if (item.weekOfDayName != null) {
            item.weekOfDayName = item.weekOfDayName.replaceAll('星期', '')
            if (item.weekOfDayName.indexOf('一') != -1 && item.weekOfDayName.indexOf('二') != -1 &&
                item.weekOfDayName.indexOf('三') != -1 && item.weekOfDayName.indexOf('四') != -1 &&
                item.weekOfDayName.indexOf('五') != -1 && item.weekOfDayName.indexOf('六') != -1 &&
                item.weekOfDayName.indexOf('日') != -1
            ) {
              item.weekOfDayName = '全周'
            }
          }
          // item.hourOfDay = item.hourOfDay.replace('-', '时-')+'时'
        })
        this.tableData = res.data.records
        this.total = res.data.total
        this.cokey++
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
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
      delete params.generateDate
      // console.log(params)
      this.listLoading = true
      this.custRolePageData(params)
    }
  }
}
</script>
