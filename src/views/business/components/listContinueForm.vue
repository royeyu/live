<template>
  <div>
    <div class="texttitle">{{ $route.meta.title }}
      <el-button type="primary" size="small" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :gutter="30">
        <el-col :span="8">
          <info-sell title="客户名称:" :value="detailData.customerName" />
          <info-sell title="创建时间:" :value="detailData.createTime" />
          <info-sell title="数据来源:" :value="detailData.dataSourceName" />
          <info-sell title="备注:" :value="detailData.remark" />
        </el-col>
        <el-col :span="8">
          <info-sell title="扩展码:" :value="detailData.extendCode" />
          <info-sell title="smsc_type:" :value="detailData.smscType" />
        </el-col>
      </el-row>
    </div>
    <div class="infoSee">
      <div class="texttitle">业务信息</div>
      <div class="businessAddTable">
        <div>
          <el-form
            v-for="(item,index) of detailData.list"
            :key="index"
            :ref="'tableForm'"
            :model="item"
            :rules="rules"
            label-width="120px"
            inline
            size="small"
          >
            <el-form-item label="业务类型:" prop="busiTypeName">
              <el-input v-model="item.busiTypeName" disabled />
            </el-form-item>
            <el-form-item label="产品类型:" prop="productTypeName">
              <el-input v-model="item.productTypeName" disabled />
            </el-form-item>
            <el-form-item label="产品名称:" prop="productName">
              <el-input v-model="item.productName" disabled />
            </el-form-item>
            <el-form-item label="订单号:" prop="orderNo">
              <el-input v-model="item.orderNo" disabled placeholder="请输入订单号" />
            </el-form-item>
            <el-form-item label="创建时间:" prop="orderNo">
              <el-input v-model="item.createTime" disabled placeholder="请输入订单号" />
            </el-form-item>
            <el-form-item label="剩余条数:" prop="orderNo">
              <el-input v-model="item.residue" disabled placeholder="请输入订单号" />
            </el-form-item>
            <div class="separate" />
          </el-form>
          <el-form
            v-for="(item,index) of oldDetailData.list"
            :key="index+'1'"
            :ref="'tableForm'"
            :model="item"
            :rules="rules"
            label-width="120px"
            inline
            size="small"
            style="padding-top: 18px;"
          >
            <el-form-item label="业务类型:" prop="busiTypeName">
              <el-input v-model="item.busiTypeName" disabled />
            </el-form-item>
            <el-form-item label="产品类型:" prop="productTypeName">
              <el-input v-model="item.productTypeName" disabled />
            </el-form-item>
            <el-form-item label="产品名称:" prop="productId">
              <el-select v-model="item.productId" placeholder="请选择产品名称" @change="changeName($event,index)">
                <el-option
                  v-for="item in productNameOption"
                  :key="item.id"
                  :label="item.productName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="订单号:" prop="orderNo">
              <el-input v-model="item.orderNo" placeholder="请输入订单号" />
            </el-form-item>
            <el-form-item>
<!--              <el-button size="small" type="primary" @click="delForm(index)">删除行</el-button>-->
            </el-form-item>
            <div class="separate" />
          </el-form>
          <div class="addForm" style="padding: 0 0 40px 40px;">
<!--            <el-button size="small" @click="addForm" >新增订单号</el-button>-->
          </div>
        </div>
      </div>
      <div class="butList">
        <el-button :loading="subloading" type="primary" @click="subData">确认</el-button>
        <el-button @click="goReturn">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import infoSell from '@/components/infoCell'
import { custServiceDetail } from '@/api/customer'
import { productGetProduct } from '@/api/settings'

export default {
  components: {
    infoSell
  },
  mixins: [data],
  data() {
    return {
      detailData: {
        list: []
      },
      productNameOption: [],
      oldDetailData: {
        list: []
      },
      rules: {
        busiTypeName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        businessType: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        productTypeName: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        productId: [
          { required: true, message: '请选择产品名称', trigger: 'blur' }
        ],
        orderNo: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '格式为英文数字组合' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.custServiceDetailData()
  },
  methods: {
    custServiceDetailData() {
      custServiceDetail({ id: this.$route.query.id, serviceId: this.$route.query.serviceId }).then(res => {
        this.detailData = res.data
        this.productGetProductData(this.detailData.list[0].busiType, this.detailData.list[0].productType).then(res => {
          this.productNameOption = res
          this.addForm()
        })
      })
    },
    changeName(value, index) {
      const tyid = this.productNameOption.find(item => {
        if (value == item.id) {
          return item
        }
      })
      this.oldDetailData.list[index].telNum = tyid.telNum
    },
    // 删除form
    delForm(index) {
      this.oldDetailData.list.splice(index, 1)
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
      const validArr = this.tableFormvalid()
      let iscal = true
      for (let i = 0; i < validArr.length; i++) {
        if (validArr[i] === false) {
          iscal = false
          break
        }
      }
      if (iscal) {
        const params = {
          ...this.detailData
        }
        params.list = this.oldDetailData.list
        if (params.list.length <= 0) {
          this.$message.warning('请先新增订单号！')
          return false
        }
        if (params.id) {
          delete params.id
        }
        params.custId = params.custIdStr
        this.$emit('subData', params)
      }
    },
    // 新增 form
    addForm() {
      const par = {
        ...this.detailData.list[0]
      }
      par.productName = ''
      par.orderNo = ''
      par.productId = ''
      par.id = ''
      console.log(par)
      this.oldDetailData.list.push(par)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
