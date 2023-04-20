<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form :model="customerForm" :rules="rules" ref="customerForm" label-width="auto">
      <el-row :type="'flex'" :justify="'center'">
        <el-col :span="10">
          <el-form-item label="上级分类:" prop="parentId">
            <el-cascader
              :disabled="disabledList"
              v-model="customerForm.parentId"
              :options="treeOptions"
              :show-all-levels="false"
              :props="treeProps"
              clearable></el-cascader>
          </el-form-item>
          <el-form-item label="分类名称:" prop="name">
            <el-input v-model="customerForm.name" placeholder="请输入分类名称"></el-input>
          </el-form-item>
          <el-form-item label="URL:" prop="url">
            <el-input v-model="customerForm.url" placeholder="请输入URL"></el-input>
          </el-form-item>
          <el-form-item label="组件路径:" prop="component">
            <el-input v-model="customerForm.component" placeholder="请输入component路径"></el-input>
          </el-form-item>
          <el-form-item label="排序:">
            <el-input v-model="customerForm.sortNo" type="number" placeholder="请输入排序"></el-input>
            <div class="texttips">不填默认1</div>
          </el-form-item>
          <el-form-item label="ICON图标:">
            <el-input v-model="customerForm.icon" placeholder="menu-icon fa fa-caret-right"></el-input>
          </el-form-item>
          <el-form-item label="是否隐藏路由:">
            <el-radio-group v-model="customerForm.hidden">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分类描述:">
            <el-input v-model="customerForm.description" placeholder="请输入分类描述" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  :loading="subloading"  @click="subData" type="primary">保存</el-button>
            <el-button   @click="goReturn">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
<!--      <div class="butList">-->
<!--        <el-button   @click="goReturn">取消</el-button>-->
<!--        <el-button   @click="subData" :loading="subloading" type="primary">保存</el-button>-->
<!--      </div>-->
    </el-form>
  </div>
</template>

<script>
  import { data } from '@/mixns/data'
  import { menuGetMenuTreeList } from '@/api/system'

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
        showLineTable: false,
        disabledList: false,
        orderFormList: [
          {
            businessType: null,
            productType: null,
            productName: null,
            orderNum: null
          }
        ],
        customerForm: {
          parentId: '',
          name: '',
          url: '',
          sortNo: '1',
          icon: '',
          hidden: '',
          description: '',
        },
        treeOptions: [],
        treeProps: {
          checkStrictly: true,
          label: 'name',
          value: 'id'
        },
        rules: {
          parentId: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入URL', trigger: 'blur' }
          ],
          component: [
            { required: true, message: '请输入组件路径', trigger: 'blur' }
          ],
          sortNo: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请选择产品名称', trigger: 'blur' }
          ],
          hidden: [
            { required: true, message: '是否隐藏路由', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入分类描述', trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {
      this.menuGetMenuTreeListData()
    },
    methods: {
      menuGetMenuTreeListData() {
        menuGetMenuTreeList().then(res => {
          this.treeOptions = res.data
        })
      },
      // 删除form
      delForm(index) {
        this.orderFormList.splice(index, 1)
      },
      // 新增 form
      addForm() {
        this.orderFormList.push({
          businessType: null,
          productType: null,
          productName: null,
          orderNum: null
        })
      },
      // 保存
      subData() {
        this.$refs['customerForm'].validate((valid) => {
          if (valid) {
            this.$emit('subData', this.customerForm)
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .addForm {
    padding-left: 120px;
    margin: 20px 0;
  }
</style>
