<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" label-width="auto" :rules="rules">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="8">
          <el-form-item label="产品名称:" prop="productName" label-width="120px">
            <el-input v-model="customerForm.productName" placeholder="请输入产品名称" style="width: 80%" />
          </el-form-item>
          <el-form-item label="业务类型:" prop="busiType" label-width="120px">
            <el-select v-model="customerForm.busiType" placeholder="请选择业务类型" style="width:80%" @change="typeChange">
              <!--            <el-select v-model="customerForm.busiType" placeholder="请选择业务类型" :style="{'width': subServiceTypeList!=null ? '80%':'80%'}">-->
              <el-option
                v-for="item in ServiceTypeList"
                :key="item.itemValue"
                :label="item.itemText"
                :value="item.itemValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="subServiceTypeList!=null" label="" prop="subBusiTypeArr" label-width="120px">
            <el-checkbox-group v-model="customerForm.subBusiTypeArr">
              <el-checkbox v-for="item in subServiceTypeList" :key="item.itemValue" :label="item.itemValue" name="subBusiType">{{ item.itemText }}</el-checkbox>
            </el-checkbox-group>
            <!--            <el-select v-model="customerForm.subBusiType" placeholder="请选择业务类型" style="width: 80%">-->
            <!--              <el-option-->
            <!--                v-for="item in subServiceTypeList"-->
            <!--                :key="item.itemValue"-->
            <!--                :label="item.itemText"-->
            <!--                :value="item.itemValue"-->
            <!--              />-->
            <!--            </el-select>-->
          </el-form-item>
          <el-form-item label="有效周期:" prop="lifeCycle" label-width="120px">
            <el-select v-model="customerForm.lifeCycle" clearable placeholder="请选择有效周期" style="width: 80%">
              <el-option
                v-for="item in youXiaoZhouQi"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="生效类型:" prop="effectType" label-width="120px">
            <el-select v-model="customerForm.effectType" clearable placeholder="请选择生效类型" style="width: 80%">
              <el-option
                v-for="item in shengXiaoLeiXing"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="产品类型:" prop="productType" label-width="120px">
            <el-select v-model="customerForm.productType" clearable placeholder="请选择产品类型" style="width: 80%" @change="changePT">
              <el-option
                v-for="item in productTypeList"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeId"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="showTemplate || customerForm.templateId !=''" label="模板ID:" prop="templateId" label-width="120px">
            <el-input v-model="customerForm.templateId" maxlength="16" placeholder="请输入微信产品支付ID" style="width: 80%" />
          </el-form-item>
          <el-form-item label="支持号码:" prop="supportNumber" label-width="120px">
            <el-radio-group v-model="customerForm.supportNumber">
              <el-radio
                v-for="(item,index) of basicsSetObject"
                :key="index"
                :label="item.value"
              >{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开通赠送:" prop="giveNum" label-width="120px">
            <el-input v-model="customerForm.giveNum" type="number" placeholder="请输入开通赠送" style="width: 80%" />
          </el-form-item>
          <el-form-item label="计费方式:" prop="billingType" label-width="120px">
            <el-select v-model="customerForm.billingType" clearable placeholder="请选择计费方式" style="width: 80%">
              <el-option
                v-for="item in jiFeiFangShi"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注:" label-width="120px">
            <el-input v-model="customerForm.remark" maxlength="100" show-word-limit placeholder="请输入备注" type="textarea" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item label="产品编号:" prop="productNum" label-width="120px">
            <el-input v-model="customerForm.productNum" placeholder="请输入产品编号" style="width: 80%" />
          </el-form-item>
          <el-form-item label="资费ID:" label-width="120px">
            <el-input v-model="customerForm.productPriceNum" placeholder="请输入资费ID" style="width: 80%" />
          </el-form-item>
          <el-form-item label="产品资费(元):" prop="productPrice" label-width="120px">
            <el-input v-model="customerForm.productPrice" type="number" placeholder="请输入产品资费" style="width: 80%" />
          </el-form-item>
          <el-form-item label="优惠资费(元):" prop="discountMoney" label-width="120px">
            <el-input v-model="customerForm.discountMoney" type="number" placeholder="请输入优惠资费" style="width: 80%" />
          </el-form-item>
          <el-form-item label="短信数量:" prop="smsNum" label-width="120px">
            <el-input v-model="customerForm.smsNum" type="number" placeholder="请输入短信数量" style="width: 80%" />
          </el-form-item>
          <el-form-item label="共享号线:" prop="telNum" label-width="120px">
            <el-input v-model="customerForm.telNum" type="number" maxlength="16" placeholder="共享号线(0 代表不限号线)" style="width: 80%" />
          </el-form-item>
          <el-form-item label="产品排序:" prop="productSort" label-width="120px">
            <el-input v-model="customerForm.productSort" maxlength="16" placeholder="请输入产品排序" style="width: 80%" />
          </el-form-item>
          <el-form-item label="默认通道:" prop="defaultAppid" label-width="120px">
            <el-select v-model="customerForm.defaultAppid" clearable placeholder="请选择默认通道" style="width: 80%" @change="changeAppid">
              <el-option
                v-for="item in channelList"
                :key="item.appid"
                :label="item.appName"
                :value="item.appid"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="可选通道:" prop="spareAppidArr" label-width="120px">
            <el-select v-model="customerForm.spareAppidArr" multiple clearable placeholder="请选择可选通道(允许多个)" style="width: 80%"  @change="(value)=>{return changeAppidArr(value)}">
              <el-option
                v-for="item in channelList"
                :key="item.appid"
                :label="item.appName"
                :value="item.appid"
                :disabled = "item.appid == customerForm.defaultAppid"
              />
            </el-select>
          </el-form-item>

          <!--          <el-form-item label="退订生效:" prop="templateId">-->
          <!--            <el-radio-group v-model="customerForm.triggerTarget" :disabled="editDisabled" @change="groupChange">-->
          <!--              <el-radio-->
          <!--                v-for="(item,index) of basicsSetObject"-->
          <!--                :key="index"-->
          <!--                :label="item.value"-->
          <!--              >{{ item.label }}-->
          <!--              </el-radio>-->
          <!--            </el-radio-group>-->
          <!--          </el-form-item>-->
        </el-col>
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="产品编号:" prop="productNum">-->
        <!--            <el-input v-model="customerForm.productNum" placeholder="请输入产品编号"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="产品资费(元):" prop="productPrice">-->
        <!--            <el-input v-model="customerForm.productPrice" type="number" placeholder="请输入产品资费"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="优惠资费(元):" prop="discountMoney">-->
        <!--            <el-input v-model="customerForm.discountMoney" type="number" placeholder="请输入优惠资费"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="短信数量:" prop="smsNum">-->
        <!--            <el-input v-model="customerForm.smsNum" type="number" placeholder="请输入短信数量"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="共享号线:" prop="telNum">-->
        <!--            <el-input maxlength="16" v-model="customerForm.telNum" placeholder="共享号线(0 代表不限号线)"></el-input>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>
      <!--      <el-row>-->
      <!--        <el-col :span="12">-->
      <!--          <el-form-item label="模板ID:" prop="templateId">-->
      <!--            <el-input maxlength="16" v-model="customerForm.templateId" placeholder="请输入模板ID"></el-input>-->
      <!--          </el-form-item>-->
      <!--&lt;!&ndash;          <el-form-item label="默认通道:">-->
      <!--            <el-select v-model="customerForm.area" clearable placeholder="请选择默认通道">-->
      <!--              <el-option-->
      <!--                v-for="item in moRenTongDao"-->
      <!--                :key="item.value"-->
      <!--                :label="item.label"-->
      <!--                :value="item.value"-->
      <!--              >-->
      <!--              </el-option>-->
      <!--            </el-select>-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="可以通道:">-->
      <!--            <el-checkbox-group v-model="customerForm.checkbox">-->
      <!--              <el-checkbox :label="item.value" v-for="(item,index) of keYiTongDao" :key="index">{{item.label}}</el-checkbox>-->
      <!--            </el-checkbox-group>-->
      <!--          </el-form-item>&ndash;&gt;-->
      <!--          <el-form-item label="备注:">-->
      <!--            <el-input maxlength="100" show-word-limit v-model="customerForm.remark" placeholder="请输入备注" type="textarea"></el-input>-->
      <!--          </el-form-item>-->
      <!--          <el-form-item>-->
      <!--            <el-button   @click="subData" type="primary">保存</el-button>-->
      <!--            <el-button   @click="goReturn">取消</el-button>-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <div class="butList">
        <el-button :loading="subloading" type="primary" @click="subData">保存</el-button>
        <el-button @click="goReturn">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import {validUsername, validMoney, validArrTwo, validIntNum, validAllIntNum} from '@/utils/form'
import { getProductAppidDict, getProductServiceTypeDict, getProductTypeList } from '@/api/system'
import { getServiceList } from '@/api/customer'

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
      customerForm: {
        productName: '',
        busiType: '',
        lifeCycle: '',
        effectType: '',
        productType: '',
        productNum: '',
        productPrice: '',
        discountMoney: '0',
        smsNum: '',
        telNum: '',
        templateId: '',
        remark: '',
        defaultAppid: '',
        spareAppid: '',
        productSort: '',
        billingType: '',
        giveNum: '0',
        supportNumber: '',
        subBusiType: '',
        subBusiTypeArr: [],
        spareAppidArr: []
      },
      rules: {
        productName: [
          { required: true, message: '请输入产品名称' },
          { min: 2, message: '最少输入2个字符' }
        ],
        busiType: [
          { required: true, message: '请选择业务类型' }
        ],
        lifeCycle: [
          { required: true, message: '请选择有效周期' }
        ],
        effectType: [
          { required: true, message: '请选择生效类型' }
        ],
        productType: [
          { required: true, message: '请选择产品类型' }
        ],
        productNum: [
          { required: true, message: '请输入产品编号' },
          { validator: validUsername }
        ],
        productPrice: [
          { required: true, message: '请输入产品资费' },
          { validator: validMoney }
        ],
        discountMoney: [
          { required: true, message: '请输入优惠资费' },
          { validator: validMoney }
        ],
        smsNum: [
          { required: true, message: '请输入短信数量' },
          { min: 1, max: 8, message: '1-8个字符' }
        ],
        telNum: [
          { required: true, message: '请输入共享号线' },
          { validator: validAllIntNum }
        ],
        templateId: [
          { required: true, message: '请输入微信产品支付ID' },
          { validator: validUsername }
        ],
        spareAppid: [
          { required: true, message: '请输入可用通道' }
        ],
        productSort: [
          { required: true, message: '请输入产品排序' },
          { validator: validIntNum }
        ],
        billingType: [
          { required: true, message: '请选择计费方式' }
        ],
        giveNum: [
          { required: true, message: '请输入赠送数量' }
        ],
        supportNumber: [
          { required: true, message: '请选择支持号码' }
        ],
        subBusiTypeArr: [
          { required: true, message: '请选择子业务' },
          { validator: validArrTwo, trigger: 'blur' }
        ],
        defaultAppid: [
          { required: true, message: '请选择默认通道' }
        ],
        spareAppidArr: [
          { required: true, message: '请选择可用通道' }
        ]
      },
      // 业务类型数据
      ServiceTypeList: [],
      // 融合服务业务类型数据
      subServiceTypeList: null,
      // 通道类型数据
      channelList: [],
      // 产品类型数据
      productTypeList: [],
      // 产品类型数据中，showTemplateId为1时，显示微信支付模版ID
      showTemplate: false
    }
  },
  watch: {
    // 'customerForm.busiType': {
    //   deep: true,
    //   handler(val) {
    //     console.log('aaa')
    //     let id = this.customerForm.busiType
    //     this.typeChange(id)
    //   }
    // }
  },
  created() {
    // 业务类型
    this.getServiceTypeList()
    // 通道
    this.getChannelTypeList()
    // 产品类型
    this.getProductTypeList()
  },
  methods: {
    chageText(val) {
      console.log(val)
    },
    // 获取业务类型数据
    getServiceTypeList() {
      return new Promise(resolve => {
        const params = {
          dictCode: 'service_type',
          subDictCode: 'fusion_service_type'
        }
        getProductServiceTypeDict(params).then(res => {
          this.ServiceTypeList = res.data
          // 查找融合服务id，有子数组，child
          let cacheid
          this.ServiceTypeList.map(item => {
            if (item.child != null) {
              cacheid = item.itemValue
            }
          })
          resolve(cacheid)
        })
      })
    },
    // 获取业务类型数据
    getChannelTypeList() {
      getProductAppidDict().then(res => {
        this.channelList = res.data
      })
    },
    // 获取产品类型数据
    getProductTypeList() {
      getProductTypeList().then(res => {
        this.productTypeList = res.data
      })
    },
    // 切换产品类型
    changePT() {
      this.showTemplate = false
      this.customerForm.templateId = ''
      this.productTypeList.map((item) => {
        if (item.typeId == this.customerForm.productType && item.showTemplateId == '1') {
          this.showTemplate = true
        }
      })
      console.log(this.customerForm.productType)
    },
    // 切换业务类型 - 无初始值时，每次都需要初始化子类型
    typeChange(val) {
      this.customerForm.subBusiType = ''
      this.customerForm.subBusiTypeArr = []
      console.log(val)
      this.typeChangeEdit(val)
    },

    // 切换业务类型  - 有初始值时
    typeChangeEdit(val) {
      let status = true
      this.ServiceTypeList.map(item => {
        if (item.itemValue == val && item.child != null) {
          this.subServiceTypeList = item.child
          console.log(this.subServiceTypeList)
          status = false
        }
      })
      if (status) {
        this.subServiceTypeList = null
      }
      this.customerForm = { ...this.customerForm }
    },
    // 切换默认通道
    changeAppid() {
      // 切换默认通道时，清空可选通道
      this.customerForm.spareAppidArr = []
    },
    // 刷新可选的值
    changeAppidArr(val) {
      this.customerForm.spareAppidArr = val
      this.$forceUpdate()
    },
    // 保存
    subData() {
      this.$refs['customerForm'].validate((valid) => {
        if (valid) {
          this.subloading = true
          if (this.customerForm.subBusiTypeArr != null) {
            this.customerForm.subBusiType = this.customerForm.subBusiTypeArr.join(',')
          }
          this.customerForm.spareAppid = this.customerForm.spareAppidArr.join(',')
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
