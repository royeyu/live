<template>
  <div>
    <!--    <div class="texttitle">规则配置详情-->
    <!--      <el-button type="primary"   @click="goReturn">返回</el-button>-->
    <!--    </div>-->
    <div class="texttitle-back">
      <span>规则配置详情</span>
      <el-button type="primary" size="mini" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :gutter="30">
        <el-col>
          <info-sell title="规则编号:" :value="detailData.ruleNo" />
          <info-sell v-if="isSystem()" title="客户名称:" :value="detailData.customerName" />
          <info-sell title="业务类型:" :value="(detailData.whetherFusionService == '1' ? '融合服务 - ':'')+detailData.busiTypeName" />
          <info-sell v-if="isSystem()" title="规则对象:" :value="filterName(detailData.triggerTarget, basicsRuleObject)" />
          <info-sell title="发送周期:" :value="detailData.weekOfDayName" />
          <info-sell title="发送时段:" :value="detailData.hourOfDay" />
          <info-sell title="发送频率:" :value="filterName(detailData.sendFreq, basicsSetFrequency)" />
          <info-sell title="触发机制:" :value="filterName(detailData.ruleMechanism, basicsSetMechanism)" />
          <info-sell title="规则状态:" :value="detailData.statusName" />
          <info-sell title="状态时间:" :value="detailData.updateTime" />
          <div class="textCon">
            <p>展示给: {{ detailData.triggerTarget === 1 ? '全部业务号码' : detailData.groupName }}</p>
            <p>
              {{ detailData.content }}</p>
            <p>{{ detailData.createTime }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import infoSell from '@/components/infoCell'
import { bscruleDetail } from '@/api/settings'

export default {
  components: {
    infoSell
  },
  mixins: [data],
  data() {
    return {
      detailData: {}
    }
  },
  created() {
    this.bscruleDetailData()
  },
  methods: {
    // 规则配置 详情
    bscruleDetailData() {
      bscruleDetail({ id: this.$route.query.id }).then(res => {
        const data = res.data
        // data.weekOfDay = data.weekOfDay.split(',')
        // data.hourOfDay = data.hourOfDay.split('-')
        // data.startTime = data.hourOfDay[0] + ':00'
        // data.endTime = data.hourOfDay[1]+ ':00'
        this.detailData = data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.textCon{
  font-size: 14px;
  background-color: #ccc;
  margin-left: 45px;
  padding: 10px;
}
</style>
