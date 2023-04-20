<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" :label-width="'120px'" :rules="rules">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="8">
          <el-form-item label="客户名称" prop="customerName">
            <el-input v-model.trim="customerForm.customerName" :disabled="isEdit" placeholder="请输入客户名称" style="width: 90%" />
            <div class="texttips">说明：必须与单位签章保持一致</div>
          </el-form-item>
          <el-form-item label="客户账户" prop="customerAccount">
            <el-input v-model.trim="customerForm.customerAccount" @blur="linephoneToCity" :disabled="isEdit" placeholder="请输入客户账户" style="width: 90%" />
          </el-form-item>
          <el-form-item label="数据来源" prop="custSrc">
            <el-select v-model="customerForm.custSrc" :disabled="isEdit" size="'medium'" style="width: 90%">
              <el-option v-for="(item,index) of dataSourcesOption" :key="index" :label="item.itemText" :value="item.itemValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="linkMan">
            <el-input v-model.trim="customerForm.linkMan" placeholder="请输入联系人" style="width: 90%" />
          </el-form-item>
          <el-form-item label="联系号码" prop="linkTel">
            <el-input v-model.trim="customerForm.linkTel" placeholder="请输入联系号码" style="width: 90%" />
          </el-form-item>

          <!--        </el-col>-->
          <!--        <el-col :xs="24" :span="8">-->
          <el-form-item label="身份证头像面" prop="fileList8">
            <div class="xlxsFile_upload">
              <el-upload
                class="form-upload"
                :file-list="customerForm.fileList8"
                :action="fileUrl"
                list-type="picture"
                :on-preview="handlePictureCardPreview"
                :headers="{'Authorization': tokenData}"
                :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'fileList8')}"
                :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 'fileList8')}"
                accept=".jpg,.png"
                :limit="1"
                size="'medium'"
                :before-upload="beforeUpload"
                :on-exceed="handleExceed"
              >
                <el-button
                  size="small"
                  type="primary"
                ><i class="el-icon-upload el-icon--right" />选择上传图片</el-button>
                <div
                  slot="tip"
                  class="texttips"
                >说明：支持JPG、PNG格式，允许上传的文件最大值10M</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="身份证国徽面" prop="fileList9">
            <div class="xlxsFile_upload">
              <el-upload
                class="form-upload"
                :file-list="customerForm.fileList9"
                :action="fileUrl"
                list-type="picture"
                :headers="{'Authorization': tokenData}"
                :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'fileList9')}"
                :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 'fileList9')}"
                accept=".jpg,.png"
                :limit="1"
                size="'medium'"
                :before-upload="beforeUpload"
                :on-exceed="handleExceed"
              >
                <el-button
                  size="small"
                  type="primary"
                ><i class="el-icon-upload el-icon--right" />选择上传图片</el-button>
                <div
                  slot="tip"
                  class="texttips"
                >说明：支持JPG、PNG格式，允许上传的文件最大值10M</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="其他证明材料" prop="fileList11">
            <div class="xlxsFile_upload">
              <el-upload
                class="form-upload"
                :file-list="customerForm.fileList11"
                :action="fileUrl"
                list-type="picture"
                :headers="{'Authorization': tokenData}"
                :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'fileList11')}"
                :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 'fileList11')}"
                accept=".jpg,.png"
                :limit="7"
                size="'medium'"
                :before-upload="beforeUpload"
                :on-exceed="handleExceed"
              >
                <el-button
                  size="small"
                  type="primary"
                ><i class="el-icon-upload el-icon--right" />选择上传图片</el-button>
                <div
                  slot="tip"
                  class="texttips"
                >说明：支持JPG、PNG格式，允许上传的文件最大值10M</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="customerForm.remark" type="textarea" :autosize="{'minRows': 5}" style="width: 90%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省份" prop="province">
            <el-select v-model="customerForm.province" size="'medium'" style="width: 90%" @change="changeProvince">
              <el-option
                v-for="item in provinceOption"
                :key="item.id"
                :label="item.province"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-select v-model="customerForm.city" size="'medium'" style="width: 90%">
              <el-option
                v-for="item in areaOption"
                :key="item.id"
                :label="item.city"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="单位简称" prop="unitName">
            <el-input v-model.trim="customerForm.unitName" placeholder="请输入单位简称" style="width: 90%" />
          </el-form-item>
          <el-form-item label="单位地址" prop="address">
            <el-input v-model.trim="customerForm.address" placeholder="请输入单位地址" style="width: 90%" />
          </el-form-item>
          <el-form-item label="客户经理" prop="custManager">
            <el-input v-model.trim="customerForm.custManager" placeholder="请输入客户经理" style="width: 90%" />
          </el-form-item>
          <el-form-item label="经理号码" prop="managerPhone">
            <el-input v-model.trim="customerForm.managerPhone" placeholder="请输入经理号码" style="width: 90%" />
          </el-form-item>

          <el-form-item label="营业执照" prop="fileList1">
            <div class="xlxsFile_upload">
              <el-upload
                class="form-upload"
                :file-list="customerForm.fileList1"
                :action="fileUrl"
                list-type="picture"
                :on-preview="handlePictureCardPreview"
                :headers="{'Authorization': tokenData}"
                :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'fileList1')}"
                :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 'fileList1')}"
                accept=".jpg,.png"
                :limit="1"
                :on-exceed="handleExceed"
                size="'medium'"
                :before-upload="beforeUpload"
              >
                <el-button
                  size="small"
                  type="primary"
                ><i class="el-icon-upload el-icon--right" />选择上传图片</el-button>
                <div
                  slot="tip"
                  class="texttips"
                >说明：支持JPG、PNG格式，允许上传的文件最大值10M</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="授权函" prop="fileList2">
            <div class="xlxsFile_upload">
              <el-upload
                class="form-upload"
                :file-list="customerForm.fileList2"
                :action="fileUrl"
                list-type="picture"
                :on-preview="handlePictureCardPreview"
                :headers="{'Authorization': tokenData}"
                :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'fileList2')}"
                :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 'fileList2')}"
                accept=".jpg,.png"
                :limit="1"
                :on-exceed="handleExceed"
                size="'medium'"
                :before-upload="beforeUpload"
              >
                <el-button
                  size="small"
                  type="primary"
                ><i class="el-icon-upload el-icon--right" />选择上传图片</el-button>
                <span
                  slot="tip"
                  class="form-upload__tip"
                >
                  <a href="./file/usershouquan.doc" download="授权函.doc" style="margin-left: 50px;color:#409EFF;font-weight: bold;">授权函下载</a>
                </span>
                <div
                  slot="tip"
                  class="texttips"
                >说明：支持JPG、PNG格式，允许上传的文件最大值10M</div>

              </el-upload>
            </div>
          </el-form-item>
          <!--          <el-form-item label="单位证明">-->
          <!--            <div class="xlxsFile_upload">-->
          <!--              <el-upload-->
          <!--                class="form-upload"-->
          <!--                :file-list="customerForm.unitStr"-->
          <!--                :action="fileUrl"-->
          <!--                list-type="picture"-->
          <!--                :headers="{'Authorization': tokenData}"-->
          <!--                :on-preview="handlePictureCardPreview"-->
          <!--                :on-change="changeFile"-->
          <!--                :on-remove="function (files, fileList) { return remopveFile(files, fileList, 'unitStr')}"-->
          <!--                :on-success="function (response,files, fileList) { return handleSuccess(response,files, fileList, 'unitStr')}"-->
          <!--                accept=".jpg,.png"-->
          <!--                :limit="2"-->
          <!--                :before-upload="beforeUpload"-->
          <!--                :on-exceed="function (files, fileList) { return handleExceed(files, fileList, 'rebateUploadd')}"-->
          <!--              >-->
          <!--                <el-button-->
          <!--                  size="small"-->
          <!--                  type="primary"-->
          <!--                ><i class="el-icon-upload el-icon&#45;&#45;right" />选择上传图片</el-button>-->
          <!--                <div-->
          <!--                  slot="tip"-->
          <!--                  class="texttips"-->
          <!--                >说明：支持JPG、PNG格式，允许上传的文件最大值10M</div>-->
          <!--              </el-upload>-->
          <!--              <el-dialog :visible.sync="dialogVisible">-->
          <!--                <img width="100%" :src="dialogImageUrl" alt="">-->
          <!--              </el-dialog>-->
          <!--            </div>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item>-->
          <!--            <el-button :loading="subloading" type="primary" :style="'padding: 12px 30px;'" @click="subData('customerForm')">保存</el-button>-->
          <!--            <el-button @click="goReturn">取消</el-button>-->
          <!--          </el-form-item>-->
        </el-col>
      </el-row>
      <div class="butList">
        <el-button :loading="subloading" type="primary" @click="subData('customerForm')">保存</el-button>
        <el-button @click="goReturn">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { data } from '@/mixns/data'
import {
  checkNotRequired,
  checkTextName,
  validatePhoneOrTel,
  validChineseName,
  validUsername
} from '@/utils/form'
import {dictCity, dictGetByCode, dictProvince, getCityInfoByTel} from '@/api/system'
import {isvalidTelephone} from "@/utils/validate";
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
      dialogImageUrl: '',
      dialogVisible: false,
      isEdit: false,
      tokenData: '',
      customerForm: {
        customerName: null,
        customerAccount: null,
        province: null,
        city: null,
        address: null,
        unitName: null,
        custManager: null,
        linkMan: null,
        managerPhone: null,
        linkTel: null,
        remark: null,
        custSrc: null,
        fileList8: [],
        fileList9: [],
        fileList1: [],
        fileList2: [],
        fileList11: [],
        fileList: []
      },
      rules: {
        customerName: [
          { required: true, message: '请输入客户名称' },
          { validator: checkTextName, trigger: 'blur' }
        ],
        customerAccount: [
          { required: true, message: '请输入' },
          { validator: validUsername }
        ],
        province: [
          { required: true, message: '请选择' }
        ],
        city: [
          { required: true, message: '请选择' }
        ],
        address: [
          { required: false, message: '请输入' },
          { validator: checkNotRequired }
        ],
        unitName: [
          { required: false, message: '请输入' },
          { validator: checkNotRequired }
        ],
        custManager: [
          { required: false, message: '请输入' },
          { validator: validChineseName }
        ],
        linkMan: [
          { required: true, message: '请输入' },
          { validator: validChineseName }
        ],
        managerPhone: [
          { required: false, message: '请输入' },
          { trigger: 'blur', validator: validatePhoneOrTel }
        ],
        linkTel: [
          { required: true, message: '请输入' },
          { trigger: 'blur', validator: validatePhoneOrTel }
        ],
        remark: [
          { required: false, message: '请输入' },
          { validator: checkNotRequired }
        ],
        custSrc: [
          { required: true, message: '请选择' }
        ]
        // fileList8: [
        //   { required: true, message: '请上传图片' }
        // ],
        // fileList9: [
        //   { required: true, message: '请上传图片' }
        // ],
        // fileList1: [
        //   { required: true, message: '请上传图片' }
        // ],
        // fileList2: [
        //   { required: true, message: '请上传图片' }
        // ]
      },
    }
  },
  mounted() {
    this.tokenData = getToken()
    // 产品类型
    this.dictGetByCodeData()
    // 省份查询
    this.dictProvinceData()
  },
  methods: {
    // 当账户为固话号码时，查询并预设省市
    linephoneToCity() {
      if(this.customerForm.customerAccount!=null&&this.customerForm.customerAccount.length > 2){
        getCityInfoByTel({'linkTel': this.customerForm.customerAccount.toString()}).then(res => {
          // console.log(res)
          if(res.data!=null){
            this.customerForm.province = parseInt(res.data.provId)
            this.changeProvince(parseInt(res.data.provId),parseInt(res.data.cityId))
          }else{
            this.customerForm.province = null
            this.customerForm.city = null
            this.areaOption = []
          }
        })
      }else{
        this.customerForm.province = null
        this.customerForm.city = null
        this.areaOption = []
      }
    },
    handleSuccess(response, files, fileList, ref) {
      fileList.filter(item => {
        if (item.response) {
          item.url = item.response.data.url
          item.attachName = item.name
        }
        return item
      })
      this.customerForm[ref] = fileList
    },
    // 省份查询
    dictProvinceData() {
      dictProvince().then(res => {
        this.provinceOption = res.data
      })
    },
    // 地市查询
    dictCityData(id) {
      return new Promise(resolve => {
        dictCity({pId: id}).then(res => {
          this.areaOption = res.data
          resolve()
        })
      })
    },
    handleExceed(){
      this.$message.error('请先删除已上传的图片')
    },
    async changeProvince(value, cityid) {
      this.customerForm.city = null
      this.areaOption = []
      if (value) {
        await this.dictCityData(value)
        if(cityid){
          this.customerForm.city = cityid
        }
      }
    },
    // 产品类型
    dictGetByCodeData() {
      dictGetByCode({ dictCode: 'cust_src' }).then(res => {
        this.dataSourcesOption = res.data.filter(item => {
          item.itemValue = Number(item.itemValue)
          return item
        })
      })
    },
    // 保存
    subData(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.customerForm.fileList = []
          if (this.customerForm.fileList8.length > 0) {
            this.customerForm.fileList = [
              ...this.customerForm.fileList, {
                attachName: this.customerForm.fileList8[0].attachName,
                attachType: 8,
                url: this.customerForm.fileList8[0].url
              }
            ]
          }
          if (this.customerForm.fileList9.length > 0) {
            this.customerForm.fileList = [
              ...this.customerForm.fileList, {
                attachName: this.customerForm.fileList9[0].attachName,
                attachType: 9,
                url: this.customerForm.fileList9[0].url
              }
            ]
          }
          if (this.customerForm.fileList1.length > 0) {
            this.customerForm.fileList = [
              ...this.customerForm.fileList, {
                attachName: this.customerForm.fileList1[0].attachName,
                attachType: 1,
                url: this.customerForm.fileList1[0].url
              }
            ]
          }
          if (this.customerForm.fileList2.length > 0) {
            this.customerForm.fileList = [
              ...this.customerForm.fileList, {
                attachName: this.customerForm.fileList2[0].attachName,
                attachType: 2,
                url: this.customerForm.fileList2[0].url
              }
            ]
          }
          if (this.customerForm.fileList11.length > 0) {
            this.customerForm.fileList11.forEach((item)=>{
              this.customerForm.fileList = [
                ...this.customerForm.fileList, {
                  attachName: item.attachName,
                  attachType: 11,
                  url: item.url
                }
              ]
            })
          }
          this.subloading = true
          this.customerForm.id = this.customerForm.idStr
          const params = { ...this.customerForm }
          delete params.fileList8
          delete params.fileList9
          delete params.fileList1
          delete params.fileList2
          delete params.fileList11
          this.$emit('subData', params)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
