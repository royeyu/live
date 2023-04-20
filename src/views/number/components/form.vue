<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" :label-width="'auto'" :rules="rules">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="10" :offset="1">
          <el-form-item label="客户名称" prop="custId" v-if="isSystem()">
            <el-select
              v-model="customerForm.custId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loadingS"
              style="width: 60%"
              @change="customerChange"
            >
              <el-option
                v-for="item in customerNameoptions"
                :key="item.id"
                :label="item.customerName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="业务类型" prop="busiType">
            <el-select v-model="customerForm.busiType" placeholder="请选择业务类型" @change="typeChange">
              <el-option
                v-for="(item,index) of typeList"
                :key="index"
                :label="item.itemText"
                :value="item.itemValue"
              />
            </el-select>
          </el-form-item>
          <!--          <el-form-item v-if="subTypeList!=null" label="" prop="sub_busi_type">-->
          <!--            <el-select v-model="customerForm.sub_busi_type" clearable placeholder="请选择业务类型">-->
          <!--              <el-option-->
          <!--                v-for="item in subTypeList"-->
          <!--                :key="item.itemValue"-->
          <!--                :label="item.itemText"-->
          <!--                :value="item.itemValue"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->

          <el-form-item
            label="企业号码"
            prop="phones"
            :rules="[
              {required: !customerForm.phoneFile.length,message: '请输入企业号码'},
              rules.phones[0]
            ]"
          >
            <el-input
              v-model.trim="customerForm.phones"
              maxlength="130"
              show-word-limit
              type="textarea"
              placeholder="请输入号码，示例: 18612345678,01012345678"
              :rows="5"
            />
          </el-form-item>
          <el-form-item
            label="企业号码文件"
            prop="phoneFile"
            :rules="[
              {required: !customerForm.phones,message: '请上传企业号码文件'}
            ]"
          >
            <div class="xlxsFile_upload">
              <el-upload
                ref="rebateUpload"
                class="form-upload"
                :file-list="customerForm.phoneFile"
                action="#"
                :auto-upload="false"
                :on-change="function (files, fileList) { return numberFileChange(files, fileList, 'phoneFile')}"
                accept=".xls,.xlsx"
                :limit="1"
                :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'phoneFile')}"
                :before-upload="beforeUpload"
                :on-exceed="function (files, fileList) { return handleExceed(files, fileList, 'phoneFile')}"
              >
                <el-button
                  type="primary"
                ><i class="el-icon-upload el-icon--right" />选择上传文件
                </el-button>
                <span
                  slot="tip"
                  class="form-upload__tip"
                >
                  <a href="./file/usertel.xls" download="企业号码模板.xls" style="margin-left: 50px;color:#409EFF;font-weight: bold;">模板下载</a>
                  <!--                  <el-button type="text" style="margin-left: 50px;">下载模板</el-button>-->
                  <div class="texttips">说明：支持xls、xlsx格式，只能上传联通号码</div>
                </span>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="号码归属证明文件" prop="attrFile">
            <div class="xlxsFile_upload">
              <el-upload
                ref="rebateUpload"
                class="form-upload"
                :file-list="customerForm.attrFile"
                list-type="picture"
                action="#"
                :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'attrFile')}"
                :on-change="function (files, fileList) { return numberFileChange(files, fileList, 'attrFile')}"
                :auto-upload="false"
                accept=".jpg,.png"
                :on-preview="handlePictureCardPreview"
                :limit="1"
                :before-upload="beforeUpload"
                :on-exceed="function (files, fileList) { return handleExceed(files, fileList, 'attrFile')}"
              >
                <el-button
                  type="primary"
                ><i class="el-icon-upload el-icon--right" />选择上传图片
                </el-button>
                <span
                  slot="tip"
                  class="form-upload__tip"
                >

                  <a href="./file/certificate.doc" download="联通助理挂短名片业务号码归属证明模板.doc" style="margin-left: 50px;color:#409EFF;font-weight: bold;">模板下载</a>

                  <!--                   <el-button type="text" style="margin-left: 50px;">下载模板</el-button>-->
                  <!--                  <span slot="tip" class="form-upload__tip">-->
                  <!--&lt;!&ndash;                    <el-button type="text">下载模板</el-button>&ndash;&gt;-->
                  <!--                    <div class="texttips">-->
                  <!--                    说明：支持JPG、PNG格式,允许上传的文件最大值50MB-->
                  <!--                  </div>-->
                  <!--               </span>-->
                  <div class="texttips">说明：支持JPG、PNG格式，允许上传的文件最大值10M</div>
                </span>
              </el-upload>
            </div>

          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="customerForm.remark" type="textarea" maxlength="100" :rows="5" show-word-limit />
          </el-form-item>
          <el-form-item label="">
            <el-button :loading="subloading" type="primary" :style="'padding: 12px 30px;'" @click="subData">保存</el-button>
            <el-button @click="goReturn">取消</el-button>
            <!--            <el-button @click="customerChange(697149266255364096)">取消</el-button>-->
          </el-form-item>
        </el-col>
      </el-row>
      <!--      <div class="butList">-->
      <!--        <el-button :loading="subloading" type="primary" @click="subData">保存</el-button>-->
      <!--        <el-button @click="goReturn">取消</el-button>-->
      <!--      </div>-->
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { customerPageNoAuth, getServiceList } from '@/api/customer'
import { validatePhoneAndTel } from '@/utils/form'
export default {
  mixins: [data],
  props: {
    statusText: {
      type: String,
      default: '新增'
    }
  },
  data() {
    // const validatePhones = (rule, value, callback) => {
    //   const allRexp = /^[0-1][0-9,-]*$/
    //   const mRexp = /^1[3-9][0-9]\d{8}$/
    //   const tRexp = /^0\d{2,3}-\d{7,8}$/
    //   if (!(allRexp.test(value))) {
    //     callback(new Error('请输入正确的号码，使用英文逗号 “ , ” 隔开'))
    //   } else {
    //     const arr = value.split(',')
    //     arr.map((item) => {
    //       if(item==''){
    //         callback(new Error('请输入正确的号码，使用英文逗号 “ , ” 隔开'))
    //       }
    //       if (!(mRexp.test(item)) && !(tRexp.test(item))){
    //         callback(new Error('请输入正确的手机号码或固话号码'))
    //       }
    //     })
    //     callback()
    //   }
    // }
    return {
      loadingS: false,
      customerNameoptions: [],
      customerForm: {
        custId: '',
        busiType: '',
        phones: '',
        remark: '',
        phoneFile: [],
        attrFile: []
      },
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        custId: [
          { required: true, message: '请输入客户名称' }
        ],
        busiType: [
          { required: true, message: '请选择业务类型' }
        ],
        phones: [
          { validator: validatePhoneAndTel }
        ],
        phoneFile: [
          { required: true, message: '请上传' }
        ],
        sub_busi_type: [
          { required: true, message: '请选择' }
        ]
      },
      typeList: [],
      subTypeList: null
    }
  },
  created() {
    // 登录为个人用户时
    if(!this.isSystem()){
        this.customerForm.custId = this.$store.state.user.id
        this.customerChange(this.customerForm.custId)
    }
    // // 业务类型
    // this.dictGetByCodeData('service_type').then(res => {
    //   this.bannerTypeLIstOption = res
    // })
  },
  methods: {
    numberFileChange(files, fileList, ref) {
      this.customerForm[ref] = fileList
    },
    // 远程搜索客户名称
    remoteMethod(query) {
      if (query !== '') {
        this.loadingS = true
        const parame = {
          customerName: query,
          ckStatus: 2,
          pageNum: 1,
          pageSize: 20
        }
        customerPageNoAuth(parame).then(res => {
          this.loadingS = false
          this.customerNameoptions = res.data.records
        })
      }
    },
    // 通过客户名称获取业务类型
    customerChange(val) {
      // console.log(val)
      const parame = {
        id: val
      }
      getServiceList(parame).then(res => {
        this.loadingS = false
        this.typeList = res.data
        this.$forceUpdate()
        // console.log(res)
      })
    },
    // 切换业务类型
    typeChange(val) {
      // console.log(val)
      let status = true
      this.typeList.map(item => {
        if (item.itemValue === val && item.child != null) {
          this.subTypeList = item.child
          status = false
        }
      })
      if (status) {
        this.subTypeList = null
      }
    },

    // 保存
    subData() {
      this.$refs['customerForm'].validate((valid) => {
        if (valid) {
          const params = {
            ...this.customerForm
          }
          this.$emit('subData', params)
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
