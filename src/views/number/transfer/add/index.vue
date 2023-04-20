<template>
  <div>
    <addForm ref="form" status-text="新增" @subData="subData" />
    <el-dialog
      title="号码导入失败"
      :visible.sync="examineDelDialog"
      width="80%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :destroy-on-close="true"
      center
    >
      <div class="formWidth">
        <el-table
          :data="failList"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="导入时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="num"
            label="失败数量"
            align="center">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <download-excel
              class="export-btn"
              :data="numberList"
              :fields="jsonFields"
              type="xls"
              header="携号转网号码导入失败列表"
              :name="`携号转网号码导入失败列表_${new Date().getFullYear()}_${new Date().getMonth()+1}_${new Date().getDate()}_${new Date().getTime()}.xls`"
            >导出</download-excel>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addForm from './form'
import {transferAdd} from '@/api/customer'
import { data } from '@/mixns/data'
import JsonExcel from "vue-json-excel"

export default {
  components: {
    DownloadExcel: JsonExcel,
    addForm
  },
  data() {
    return {
      examineDelDialog: false,
      failList: null,
      numberList: null,
      jsonFields: {  //导出Excel表格的表头设置
        '号码': {
          field: 'phone',
          callback: (value) => {
            return `"${value}"`
          }
        },
        '失败原因': 'remark'
      },
      custName:null,
    }
  },
  mixins: [data],
  methods: {
    // 获取新增数据
    subData(data) {
      const params = new FormData()
      for (const dataKey in data) {
        if (dataKey === 'phoneFile') {
          if (data[dataKey].length > 0) {
            for (let i = 0; i < data[dataKey].length; i++) {
              params.append(dataKey, data[dataKey][i].raw)
            }
          }else{
            params.append(dataKey, null)
          }
        } else {
          params.append(dataKey, data[dataKey])
        }
      }
      this.$refs.form.subloading = true
      transferAdd(params).then(res => {
        this.$refs.form.subloading = false
        // 存在上传失败的时候
        if(res.data!=null){
          this.numberList = res.data
          const now = new Date()
          this.failList = [{
            'date': `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`,
            'num': res.data.length
          }]
          this.examineDelDialog = true
        }else{
          this.$message.success('操作成功')
          this.goReturn()
        }
      }).catch(e => {
        this.$refs.form.subloading = false
      })
    },
    closeDialog(){
      this.examineDelDialog = false
      this.goReturn()
    },
  }
}
</script>

<style scoped>
.export-btn{
  color:#409EFF;cursor:pointer
}
</style>
