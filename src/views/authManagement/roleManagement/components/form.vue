<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" label-width="auto" :rules="rules">
      <el-row type="flex" justify="flex-start">
        <el-col :span="10" :offset="1">
          <el-form-item label="用户组名称:" prop="roleName">
            <el-input v-model="customerForm.roleName" placeholder="请输入用户组名称" />
            <div class="texttips">用户组名称，不能为空。中英文2-8长度</div>
          </el-form-item>
          <el-form-item label="备注:" prop="description">
            <el-input v-model="customerForm.description" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item label="菜单权限:" prop="resIds">
            <el-tree
              ref="tree"
              v-loading="treeLoad"
              :data="treedata"
              show-checkbox
              node-key="id"
              :default-checked-keys="customerForm.resIds"
              :props="defaultProps"
              @check-change="treeChanhe"
            />
          </el-form-item>
<!--          <el-form-item label="数据权限:" prop="">-->
<!--            <el-select v-model="customerForm.datarole" placeholder="请选择用户角色" style="width:250px">-->
<!--              <el-option-->
<!--                v-for="item in roleList"-->
<!--                :key="item.itemValue"-->
<!--                :label="item.itemText"-->
<!--                :value="item.itemValue"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item>
            <el-button :loading="subloading" type="primary" @click="subData('customerForm')">保存</el-button>
            <el-button @click="goReturn">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!--      <div class="butList">-->
      <!--        <el-button   @click="goReturn">取消</el-button>-->
      <!--        <el-button   :loading="subloading" @click="subData('customerForm')" type="primary">保存</el-button>-->
      <!--      </div>-->
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { dictGetByCode, getMenuTreeList } from '@/api/system'

export default {
  mixins: [data],
  props: {
    statusText: {
      type: String,
      default: '新增'
    }
  },
  data() {
    return {
      treedata: [],
      treeLoad: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称' },
          { min: 2, max: 8, message: '长度在2-8之间' }
        ],
        description: [
          { required: true, message: '请输入备注' },
          { min: 2, max: 50, message: '长度在2-50之间' }
        ],
        resIds: [
          { required: true, message: '请选择菜单权限' }
        ],
        datarole: [
          { required: true, message: '请选择菜单权限' }
        ]
      },
      customerForm: {
        roleName: '',
        description: '',
        resIds: [],
        datarole: []
      },
      roleList: []
    }
  },
  mounted() {
    // this.getMenuTreeListData() // 获取菜单树
  },
  methods: {
    chageText(val) {
      console.log(val)
    },
    treeChanhe() {
      const res = this.$refs.tree.getCheckedKeys()
      this.customerForm.resIds = res
    },
    // 获取菜单树
    getMenuTreeListData() {
      this.treeLoad = true
      return new Promise(resolve => {
        getMenuTreeList().then(res => {
          this.treedata = res.data
          this.treeLoad = false
          resolve(res.data)
        })
      })
    },
    // 获取菜单树
    getDataPermsListData() {
      return new Promise(resolve => {
        dictGetByCode({dictCode: 'sys_data_perms'}).then(res => {
          this.roleList = res.data
        })
      })
    },

    // 保存
    subData(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.subloading = true
          const form = { ...this.customerForm }
          const list = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
          form.resIds = list
          this.$emit('subData', form)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
