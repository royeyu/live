<template>
  <div>
    <div class="texttitle">基本信息
      <el-button type="primary" size="small" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :gutter="30">
        <el-col :span="8">
          <info-sell title="客户名称:" value="" />
          <info-sell title="客户账户:" value="" />
          <info-sell title="单位地址:" value="" />
          <info-sell title="单位简称:" value="" />
          <info-sell title="客户经理:" value="" />
          <info-sell title="经理号码:" value="" />
          <info-sell title="联系人:" value="" />
          <info-sell title="手机:" value="" />
          <info-sell title="客户状态:" value="" />
        </el-col>
        <el-col :span="8">
          <info-sell title="省份:" value="" />
          <info-sell title="城市:" value="" />
          <info-sell title="营业执照:" value="" />
          <info-sell title="单位证明:" value="" />
          <info-sell title="产品类型:" value="" />
          <info-sell title="拒绝理由:" value="" />
          <info-sell title="描述:" value="" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import infoSell from '@/components/infoCell'

export default {
  components: {
    infoSell
  },
  mixins: [data],
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">

</style>
