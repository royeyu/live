<template>
  <div>
    <div class="texttitle">{{$route.meta.title}}
      <el-button type="primary" size="small" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :gutter="30">
        <el-col :span="8">
          <info-sell title="客户名称:" :value="detailData.customerName"></info-sell>
          <info-sell title="创建时间:" :value="detailData.createTime"></info-sell>
          <info-sell title="数据来源:" :value="detailData.dataSourceName"></info-sell>
          <info-sell title="备注:" :value="detailData.remark"></info-sell>
        </el-col>
        <el-col :span="8">
          <info-sell title="扩展码:" :value="detailData.extendCode"></info-sell>
          <info-sell title="smsc_type:" :value="detailData.smscType"></info-sell>
        </el-col>
      </el-row>
    </div>
    <div class="infoSee">
      <div class="texttitle">业务信息</div>
      <div class="businessAddTable">
        <div>
          <el-form v-for="(item,index) of detailData.list" :key="index" :ref="'tableForm'" :model="item"
                   :rules="rules" label-width="120px" inline size="small"
          >
            <el-form-item label="业务类型:" prop="busiTypeName">
              <el-input disabled v-model="item.busiTypeName"></el-input>
            </el-form-item>
            <el-form-item label="产品类型:" prop="productTypeName">
              <el-input disabled v-model="item.productTypeName"></el-input>
            </el-form-item>
            <el-form-item label="产品名称:" prop="productName">
              <el-input disabled v-model="item.productName"></el-input>
            </el-form-item>
            <el-form-item label="订单号:" prop="orderNo">
              <el-input v-model="item.orderNo" placeholder="请输入订单号"></el-input>
            </el-form-item>
            <el-form-item label="创建时间:" prop="orderNo">
              <el-input disabled v-model="item.createTime" placeholder="请输入订单号"></el-input>
            </el-form-item>
            <el-form-item label="剩余条数:" prop="orderNo">
              <el-input disabled v-model="item.residue" placeholder="请输入订单号"></el-input>
            </el-form-item>
            <el-form-item>
<!--              <el-button size="small" v-if="index > 0" type="primary" @click="delForm(index)">删除行</el-button>-->
            </el-form-item>
            <div class="separate"></div>
          </el-form>
          <div class="addForm">
<!--            <el-button size="small" @click="addForm">新增订单号</el-button>-->
          </div>
        </div>
      </div>
      <div class="butList">
        <el-button size="small" :loading="subloading" @click="subData" type="primary">确认</el-button>
        <el-button size="small" @click="goReturn">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { data } from '@/mixns/data'
  import infoSell from '@/components/infoCell'
  import { custServiceDetail } from '@/api/customer'

  export default {
    mixins: [data],
    components: {
      infoSell
    },
    data() {
      return {
        detailData: {
          list: []
        },
        orderFormList: [
          {
            businessType: null,
            productType: null,
            productName: null,
            orderNum: null
          }
        ],
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
          productName: [
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
        custServiceDetail({ id: this.$route.query.id ,serviceId: this.$route.query.serviceId}).then(res => {
          this.detailData = res.data
        })
      },
      // 验证form
      tableFormvalid() {
        let arr = []
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
        let validArr = this.tableFormvalid()
        let iscal = true
        for (let i = 0; i < validArr.length; i++) {
          if (validArr[i] === false) {
            iscal = false
            break
          }
        }
        if (iscal) {
          this.subloading = true
          this.$emit('subData', this.detailData)
        }
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
    }
  }
</script>

<style scoped lang="scss">

</style>
