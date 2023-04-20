<template>
  <div>
    <div class="texttitle-back" >
      <span>基本信息</span>
      <el-button type="primary" size="mini" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :type="'flex'" :justify="'flex-start'">
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
      <div class="texttitle" style="display: block">业务信息</div>
      <div v-for="(item,index) of detailData.list">
        <el-row :gutter="30">
          <el-col :span="8">
            <info-sell title="业务类型:" :value="item.busiTypeName"></info-sell>
            <info-sell title="生效时间:" :value="item.startTime"></info-sell>
            <info-sell title="订单号:" :value="item.orderNo"></info-sell>
            <info-sell title="业务状态:" :value="item.orderStatusName" :vcolor="item.orderStatus == 4 ? '#f00':''"></info-sell>
          </el-col>
          <el-col :span="8">
            <info-sell title="产品类型:" :value="item.productTypeName"></info-sell>
            <info-sell title="失效时间:" :value="item.endTime"></info-sell>
            <info-sell title="创建时间:" :value="item.createTime"></info-sell>
            <info-sell title="生效状态:" :value="item.effectOrder == 1 ? '是' : '否'" ></info-sell>
          </el-col>
          <el-col :span="8">
            <info-sell title="产品名称:" :value="item.productName"></info-sell>
            <info-sell title="有效周期:" :value="item.lifeCycle == 0 ? '长期' : item.lifeCycle+'月'"></info-sell>
            <info-sell title="剩余条数:" :value="item.smsTotal == '-1' ? '无限' : item.residue+ '条'"></info-sell>
          </el-col>
        </el-row>
        <div class="separate"></div>
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
        }
      }
    },
    mounted() {
      this.custServiceDetailData()
    },
    methods: {
      custServiceDetailData() {
        console.log(1)
        custServiceDetail({ id: this.$route.query.id ,serviceId: this.$route.query.serviceId}).then(res => {
          this.detailData = res.data
          // this.detailData.list[0].smsTotal = -1
          // console.log(res)
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
