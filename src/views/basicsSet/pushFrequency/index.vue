<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      平台级推送频次设置
    </div>
    <el-form :model="customerForm"  ref="customerForm" label-width="220px"   :rules="rules">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="10" >
          <el-form-item label="来电名片当前推送频次" prop="callingFreq">
            <el-select v-model="customerForm.callingFreq" clearable placeholder="请选择推送频" :disabled="startEdit">
              <el-option
                v-for="item in basicsSetFrequency"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="挂机短信当前推送频次" prop="gjSmsFreq">
            <el-select v-model="customerForm.gjSmsFreq" clearable placeholder="请选择推送频次" :disabled="startEdit">
              <el-option
                v-for="item in basicsSetFrequency"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-if="startEdit && menubutscreen('pushFrequency','保存')"  @click="startEdit = !startEdit" type="primary">开始修改</el-button>
            <el-button v-else   v-show="menubutscreen('pushFrequency','保存')" @click="subData" type="primary">保存设置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
<!--    <div class="butList">-->
<!--      <el-button v-if="startEdit && menubutscreen('pushFrequency','保存')"  @click="startEdit = !startEdit" type="primary">开始修改</el-button>-->
<!--      <el-button v-else   v-show="menubutscreen('pushFrequency','保存')" @click="subData" type="primary">保存设置</el-button>-->
<!--    </div>-->
  </div>
</template>

<script>
  import { data } from '@/mixns/data'
  import { configDetail, configEdit } from '@/api/settings'
  import { butList } from '@/mixns/butMenu'

  export default {
    mixins: [data, butList],
    props: {
      statusText: {
        type: String,
        default: '新增'
      }
    },
    data() {
      return {
        startEdit: true,
        customerForm: {
          callingFreq: '',
          gjSmsFreq: '',
        },
        rules: {
          callingFreq: [
            {required: true, message: '请选择推送频'}
          ],
          gjSmsFreq: [
            {required: true, message: '请选择推送频'}
          ],
        }
      }
    },
    mounted() {
      // // 推送频次 详情
      this.configDetailData()
    },
    methods: {
      // // 推送频次 详情
      configDetailData() {
        configDetail().then(res => {
          let data = res.data
          data.map(item => {
            for (const customerFormKey in this.customerForm) {
              if (item.confKey === customerFormKey)
                this.customerForm[customerFormKey] = item.confVal
            }
          })
          console.log(res)
        })
      },
      chageText(val) {
        console.log(val)
      },
      // 保存
      subData() {
        this.$refs['customerForm'].validate((valid) => {
          if (valid) {
            configEdit(this.customerForm).then(res => {
              this.$message.success('操作成功')
              this.startEdit = true
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>
