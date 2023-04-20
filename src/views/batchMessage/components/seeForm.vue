<template>
  <div>
    <div class="texttitle">{{$route.meta.title}}
      <el-button type="primary" size="small" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :gutter="30">
        <el-col :span="12">
          <info-sell title="客户名称:" :value="detailData.customerName"></info-sell>
          <info-sell title="业务类型:" :value="detailData.busiTypeMsg"></info-sell>
          <info-sell title="发送类型:" :value="detailData.sendTypeMsg"></info-sell>
          <info-sell title="发送内容:" :value="detailData.content"></info-sell>
          <info-sell title="计费条数:" :value="detailData.billingNum"></info-sell>
          <info-sell title="发送数量:" :value="detailData.sendNum"></info-sell>
          <info-sell title="发送情况:">
            <div>
              <span class="mr14">实发：{{detailData.realNum}}</span>
              <span class="mr14">错号：{{detailData.errNum}}</span>
              <span class="mr14">重复：{{detailData.repeNum}}</span>
              <span class="mr14">黑名单：{{detailData.blackNum}}</span>
            </div>
          </info-sell>
          <info-sell title="审核状态:" :value="detailData.statusMsg"></info-sell>
          <info-sell title="提交时间:" :value="detailData.submitTime"></info-sell>
          <info-sell title="审核时间:" :value="detailData.checkTime"></info-sell>
          <info-sell title="备注:" :value="detailData.remark"></info-sell>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { data } from '@/mixns/data'
  import infoSell from '@/components/infoCell'
  import { batchTaskDetail } from '@/api/settings'

  export default {
    mixins: [data],
    components: {
      infoSell
    },
    data() {
      return {
        detailData: {}
      }
    },
    mounted() {
      this.batchTaskDetailData()
    },
    methods: {
      batchTaskDetailData(){
        batchTaskDetail({id: this.$route.query.id}).then(res => {
          this.detailData = res.data
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
