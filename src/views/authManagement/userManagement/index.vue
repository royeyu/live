<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px">
        <el-form-item label="账户:">
          <el-input v-model.trim="appform.username" clearable type="text" placeholder="请输入账户" />
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="appform.status" placeholder="请选择状态">
            <el-option
              v-for="item in userStatusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-if="menubutscreen('userManagement','查询')" type="primary" @click="searchData">查询</el-button>
          <el-button v-if="menubutscreen('userManagement','新增')" type="primary" @click="goTo('/authManagement/userManagement/add')">新增用户</el-button>
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
          <div v-if="item.value === 'username'">{{ scope.row.username }}</div>
          <div v-else-if="item.value === 'status'">
            <span v-if="scope.row.status === 1" class="color1">启用</span>
            <span v-else class="color4">禁用</span>
          </div>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
        align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="(scope.row.status === 1) && menubutscreen('userManagement','禁用') " v-prevent-re-click size="mini" type="danger" @click="setUserStatusData(scope.row)">禁用
          </el-button>
          <el-button v-else v-show="menubutscreen('userManagement','启用')" v-prevent-re-click size="mini" type="primary" @click="setUserStatusData(scope.row)">启用</el-button>
          <el-button v-if="menubutscreen('userManagement','编辑')" size="mini" type="warning" @click="goTo('/authManagement/userManagement/update',{id: scope.row.id})">编辑</el-button>
          <el-button v-if="menubutscreen('userManagement','删除')" size="mini" type="danger" @click="delData(scope.row)">删除</el-button>
          <el-button v-if="menubutscreen('userManagement','编辑')" size="mini" type="primary" @click="resetPwd(scope.row)">重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage" />
    </div>
  </div>
</template>

<script>
import { setUserStatus, userDelete, userQuery, userResetPass } from '@/api/system'

const lineTableData = [
  { label: '账户', value: 'username', width: 100, overText: true },
  { label: '用户组', value: 'roleNames', width: 100, overText: true },
  { label: '备注', value: 'remark', width: 100, overText: true },
  { label: '电话', value: 'phone', width: 100, overText: true },
  { label: '状态', value: 'status', width: 100, overText: true },
  { label: '添加时间', value: 'createTime', width: 100, overText: true }
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
        username: null,
        status: null
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状态!', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const schema = this.$store.state.app.inspectSchema
    if (schema) {
      this.appform = schema
      this.page = schema
    }
    this.fetchData()
  },
  methods: {
    setUserStatusData(row) {
      const params = {
        'id': row.id,
        'status': row.status == 1 ? '2' : 1
      }
      setUserStatus(params).then(res => {
        this.fetchData()
        this.$message.success('操作成功!')
      })
    },
    // 获取用户列表
    userQueryData(params) {
      userQuery(params).then(res => {
        this.listLoading = false
        const data = res.data
        this.tableData = data.records
        this.total = data.total
        console.log(res)
      })
    },
    delData(row) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userDelete({ id: row.id }).then(res => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        }).catch(e => {
          this.$message.error(e)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败!'
        })
      })
    },
    resetPwd(row) {
      this.$confirm('确定要重置用户密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userResetPass({ id: row.id }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        }).catch(e => {
          this.$message.error(e)
        })
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
    fetchData() {
      this.listLoading = true
      const form = {
        ...this.page,
        ...this.appform
      }
      this.userQueryData(form)
    }
  }
}
</script>
