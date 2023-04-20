<template>
  <div class="app-container customerList">
    <div class="texttitle">
      {{ $route.meta.title }}
    </div>
    <div class="appform conbody-flex formWidth">
      <el-form :model="appform" inline label-width="80px"  >
        <el-form-item label="角色名称:">
          <el-input clearable type="text" placeholder="请输入角色名称" v-model.trim="appform.rolename"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="appform.roleStatus" placeholder="请选择状态">
            <el-option
              v-for="item in userStatusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button   v-if="menubutscreen('roleManagement','查询')" @click="searchData" type="primary">查询</el-button>
          <el-button   v-if="menubutscreen('roleManagement','新增')" @click="goTo('/authManagement/roleManagement/add')" type="primary">新增角色</el-button>
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
          <div v-if="item.value === 'roleName'">{{ scope.row.roleName }}</div>
          <div v-else-if="item.value === 'status'">
            <span class="color1" v-if="scope.row.status === 1">启用</span>
            <span class="color4" v-else>禁用</span>
          </div>
          <span v-else>{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
        align="center"
      >
        <template slot-scope="scope" v-if="scope.row.roleName!== '超级管理员'"  >
<!--         -->
          <el-button v-prevent-re-click v-if="(scope.row.status === 1) && menubutscreen('roleManagement','禁用')" size="mini" @click="setStatusData(scope.row)" type="danger">禁用
          </el-button>
          <el-button v-prevent-re-click v-else size="mini" v-show="menubutscreen('roleManagement','启用')" @click="setStatusData(scope.row)" type="primary">启用</el-button>
          <el-button size="mini" v-if="menubutscreen('roleManagement','编辑')" @click="goTo('/authManagement/roleManagement/update',{id: scope.row.id})"
                     type="warning"
          >编辑
          </el-button>
          <el-button size="mini" v-if="menubutscreen('roleManagement','删除')" @click="delData(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="lm-page">
      <el-page :total="total" :limit="page.pageSize" :page="page.pageNum" :hidden="total < 1" @pagination="changePage"></el-page>
    </div>
  </div>
</template>

<script>
  import { roleDelete, roleQuery, setRoleStatus } from '@/api/system'

  const lineTableData = [
    { label: '用户组', value: 'roleName', width: 100, overText: true },
    { label: '状态', value: 'status', width: 100, overText: true },
    { label: '创建时间', value: 'createTime', width: 100, overText: true }
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
          rolename: null,
          roleStatus: null
        },
        rules: {
          status: [
            { required: true, message: '请选择审核状态!', trigger: 'blur' }
          ]
        },
      }
    },
    created() {
      const schema = this.$store.state.app.inspectSchema
      console.log(schema)
      if (schema) {
        this.appform = schema
        this.page = schema
      }
      this.fetchData()
    },
    methods: {
      setStatusData(row) {
        let params = {
          'id': row.id,
          'status': row.status == 1 ? '2' : 1
        }
        setRoleStatus(params).then(res => {
          this.fetchData()
          this.$message.success('操作成功!')
        })
      },
      delData(row) {
        this.$confirm('是否删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          roleDelete({ id: row.id }).then(res => {
            this.successData()
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
      roleQueryData(params) {
        roleQuery(params).then(res => {
          this.listLoading = false
          let data = res.data
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
        this.roleQueryData(form)
      }
    }
  }
</script>
