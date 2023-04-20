<template>
  <div class="customerForm app-container">
    <div class="texttitle">
      {{ $route.meta.title }}
      <span class="requiredText">注：带有 <i>*</i> 必填项</span>
    </div>
    <el-form ref="customerForm" :model="customerForm" :rules="rules" label-width="120px">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="8">
          <el-form-item label="客户名称" prop="custId">
            <el-select
              v-model="customerForm.custId"
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loadingS"
              style="width:280px"
              @change="changeUser"
            >
              <el-option
                v-for="item in customerNameoptions"
                :key="item.id"
                :label="item.customerName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!--          <el-form-item label="产品类型" prop="infoSource">-->
          <!--            <el-select  v-model="customerForm.infoSource" placeholder="请选择产品类型" style="width:280px">-->
          <!--              <el-option v-for="(item,index) of dataOption" :key="index":label="item.itemText" :value="item.itemValue">-->
          <!--              </el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <el-form-item label="拓展码" prop="extendCode">
            <el-input v-model="customerForm.extendCode" placeholder="请输入拓展码" style="width:280px" />
          </el-form-item>
          <el-form-item label="smsc_type" prop="smscType">
            <el-input v-model="customerForm.smscType" placeholder="请输入smsc_type" style="width:280px" />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="customerForm.remark" placeholder="请输入备注" type="textarea" style="width:280px" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form v-for="(item,index) of orderFormList" :key="index" ref="tableForm" :model="item" :rules="rules" label-width="120px" inline>
            <el-form-item label="业务类型" prop="busiType" style="width:460px">
              <el-select ref="select" v-model="item.busiType" placeholder="请选择业务类型" style="width:250px" @change="changeBusType($event,index)">
                <el-option
                  v-for="item in businessChildStatusOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="产品类型" prop="productType" style="width:460px">
              <el-select v-model="item.productType" clearable placeholder="请选择产品类型" style="width:250px" @change="changeType($event,index)">
                <el-option
                  v-for="item in item.productTypeChildOption"
                  :key="item.id"
                  :label="item.description"
                  :value="item.productType"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="产品名称" prop="productId" style="width:460px">
              <el-select v-model="item.productId" placeholder="请选择产品名称" style="width:250px" @change="changeName($event,index)">
                <el-option
                  v-for="item in item.productNameOption"
                  :key="item.id"
                  :label="item.productName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="订单号" prop="orderNo" style="width:460px">
              <el-input v-model="item.orderNo" placeholder="请输入订单号" style="width:250px" />
            </el-form-item>
            <el-form-item>
              <el-button v-if="orderFormList.length > 1 && index > 0" size="small" type="primary" @click="delForm(index)">删除行</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!--      <div class="texttitle" style="display:block">业务信息</div>-->
      <!--      <div class="businessAddTable">-->
      <!--        <div>-->
      <!--          <el-form v-for="(item,index) of orderFormList" :key="index" ref="tableForm" :model="item"-->
      <!--                   :rules="rules" label-width="120px" inline-->
      <!--          >-->
      <!--            <el-form-item label="业务类型" prop="busiType">-->
      <!--              <el-select ref="select" v-model="item.busiType" placeholder="请选择业务类型" @change="changeBusType($event,index)">-->
      <!--                <el-option-->
      <!--                  v-for="item in businessChildStatusOption"-->
      <!--                  :key="item.value"-->
      <!--                  :label="item.label"-->
      <!--                  :value="item.value"-->
      <!--                >-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="产品类型" prop="productType" >-->
      <!--              <el-select  v-model="item.productType" clearable placeholder="请选择产品类型" @change="changeType($event,index)">-->
      <!--                <el-option-->
      <!--                  v-for="item in item.productTypeChildOption"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.description"-->
      <!--                  :value="item.productType"-->
      <!--                >-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="产品名称" prop="productId">-->
      <!--              <el-select v-model="item.productId" placeholder="请选择产品名称" @change="changeName($event,index)">-->
      <!--                <el-option-->
      <!--                  v-for="item in item.productNameOption"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.productName"-->
      <!--                  :value="item.id"-->
      <!--                >-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="订单号" prop="orderNo">-->
      <!--              <el-input v-model="item.orderNo" placeholder="请输入订单号"></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item>-->
      <!--              <el-button size="small" v-if="orderFormList.length > 1 && index > 0" type="primary" @click="delForm(index)">删除行</el-button>-->
      <!--            </el-form-item>-->
      <!--            <div class="separate"></div>-->
      <!--          </el-form>-->
      <!--          <div class="addForm">-->
      <!--            <el-button @click="addForm">新增订单号</el-button>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="btnListCenter">-->
      <!--        <el-button  :loading="subloading" @click="subData" type="primary">保存</el-button>-->
      <!--        <el-button  @click="goReturn">取消</el-button>-->
      <!--      </div>-->
      <div class="butList">
        <el-button :loading="subloading" type="primary" style="" @click="subData">保存</el-button>
        <el-button @click="goReturn">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import { parseTime } from '@/utils'
import { customerPageNoAuth } from '@/api/customer'
import { productGetProduct } from '@/api/settings'
import { dictGetByCode } from '@/api/system'
import {checkNotRequired, validNotSmscType, validNotUsername} from '@/utils/form'

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
      orderFormList: [
        {
          busiType: '',
          productType: '',
          productId: '',
          orderNo: '',
          productTypeChildOption: [],
          productNameOption: []
        }
      ],
      loadingS: false,
      customerForm: {
        custId: null,
        infoSource: null,
        remark: null,
        extendCode: null,
        smscType: null
      },
      dataOption: [],
      rules: {
        custId: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        infoSource: [
          { required: true, message: '请输入产品类型', trigger: 'blur' }
        ],
        busiType: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        productType: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请输入备注', trigger: 'blur' },
          { validator: checkNotRequired }
        ],
        extendCode: [
          { required: false, message: '请输入拓展码', trigger: 'blur' },
          { validator: validNotUsername }
        ],
        smscType: [
          { required: false, message: '请输入smsc_type', trigger: 'blur' },
          { validator: validNotSmscType }
        ],
        productId: [
          { required: true, message: '请选择产品名称', trigger: 'blur' }
        ],
        orderNo: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '格式为英文数字组合' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      },
      customerNameoptions: [],
      busiTypeItem: {}
    }
  },
  created() {
    if (this.statusText === '新增') {
      // this.customerForm.createTime = parseTime(new Date())
    }
    // 业务类型
    this.dictGetByCodeData('service_type').then(res => {
      this.businessChildStatusOption = res
    })
    // 产品类型
    this.dictGetByCodeData('cust_src').then(res => {
      this.dataOption = res
    })
  },
  methods: {
    changeUser(val) {
      const item = this.customerNameoptions.find(item => {
        return item.id == val
      })
      this.busiTypeItem = item
      this.customerForm.infoSource = '' + item.custSrc
      this.orderFormList.splice(1)
      this.orderFormList.map(item => {
        for (const itemKey in item) {
          item[itemKey] = ''
        }
      })
    },
    // 业务类型 change
    changeBusType(value, index) {
      this.orderFormList[index].productType = ''
      this.orderFormList[index].productId = ''
      this.orderFormList[index].productNameOption = []
      this.productGetProductData(value).then(res => {
        this.orderFormList[index].productTypeChildOption = res
        const option = res.find(item => {
          return item.description === this.busiTypeItem.custSrcName
        })
        if (option) {
          this.orderFormList[index].productType = option.productType
          this.changeType(option.productType, index)
        }
      })
    },
    // 产品类型 change
    changeType(value, index) {
      this.orderFormList[index].productId = ''
      this.productGetProductData(this.orderFormList[index].busiType, value).then(res => {
        this.orderFormList[index].productNameOption = res
      })
    },
    //
    changeName(value, index) {
      this.orderFormList[index].id = value
      const tyid = this.orderFormList[index].productNameOption.find(item => {
        if (value == item.id) {
          return item
        }
      })
      this.orderFormList[index].telNum = tyid.telNum
    },
    productGetProductData(serviceType, productType) {
      return new Promise(resolve => {
        const parsma = {
          serviceType: serviceType,
          productType: productType
        }
        productGetProduct(parsma).then(res => {
          resolve(res.data)
        })
      })
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
    // 删除form
    delForm(index) {
      this.orderFormList.splice(index, 1)
      if (this.orderFormList.length <= 1) {
        this.$nextTick(() => {
          this.$refs.select.map(item => {
            item.disabled = false
          })
        })
      }
    },
    // 新增 form
    addForm() {
      const par = {
        ...this.orderFormList[0]
      }
      if (par.busiType && par.productType) {
        this.orderFormList.push(par)
      } else {
        this.$message.info('该业务类型下，无法找到对应的产品类型！')
        return
      }
      this.$nextTick(() => {
        this.$refs.select.map(item => {
          item.disabled = true
        })
      })
    },
    // 验证form
    tableFormvalid() {
      const arr = []
      this.$refs['tableForm'].map(item => {
        item.validate((valid) => {
          if (valid) {
            arr.push(true)
          } else {
            arr.push(false)
          }
        })
      })
      return arr
    },
    // 保存
    subData() {
      console.log(this.orderFormList)
      this.$refs['customerForm'].validate((valid) => {
        if (valid) {
          const params = {
            ...this.customerForm,
            list: this.orderFormList
          }
          const validArr = this.tableFormvalid()
          let iscal = true
          for (let i = 0; i < validArr.length; i++) {
            if (validArr[i] === false) {
              iscal = false
              break
            }
          }
          if (iscal) {
            this.subloading = true
            this.$emit('subData', params)
          }
        } else {
          console.log('error submit!!')
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
