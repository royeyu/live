<template>
  <div>
    <div class="texttitle">基本信息
      <el-button type="primary" size="small" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :gutter="30">
        <el-col :span="8">
          <info-sell title="企业名称:" value="闽南电信局"></info-sell>
          <info-sell title="群 组:" value="wzl_admin"></info-sell>
        </el-col>
        <el-col :span="8">
          <info-sell title="业务号码:" value="湖南"></info-sell>
          <info-sell title="号码状态:" value="长沙"></info-sell>
        </el-col>
      </el-row>
    </div>
    <div class="infoSee">
      <div class="texttitle">模板信息</div>
      <el-row :gutter="30">
        <el-col :span="8">
          <info-sell title="模板名称:" value="闽南电信局"></info-sell>
          <info-sell title="短信类型:" value="wzl_admin"></info-sell>
          <info-sell title="发送内容:" value="wzl_admin"></info-sell>
        </el-col>
        <el-col :span="8">
          <info-sell title="短信类型:" value="湖南"></info-sell>
          <info-sell title="信息类型:" value="长沙"></info-sell>
        </el-col>
      </el-row>
    </div>
    <div class="infoSee">
      <div class="texttitle">规则信息</div>
      <el-row :gutter="30">
        <el-col :span="8">
          <info-sell title="发送时段:" value="闽南电信局"></info-sell>
          <info-sell title="发送周期:" value="wzl_admin"></info-sell>
        </el-col>
        <el-col :span="8">
          <info-sell title="发送时段:" value="湖南"></info-sell>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { data } from '@/mixns/data'
  import infoSell from '@/components/infoCell'

  export default {
    mixins: [data],
    components: {
      infoSell
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">

</style>
