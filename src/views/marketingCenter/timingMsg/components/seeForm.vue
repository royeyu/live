<template>
  <div>
    <div class="texttitle-back" >
      <span>{{$route.meta.title}}</span>
      <el-button type="primary" size="mini" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
    </div>
    <div class="infoSee">
      <div class="texttitle">发送详情</div>
      <el-table

        :data="detailTableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="60"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="statusMsg"
          label="发送状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { data } from '@/mixns/data'
  import infoSell from '@/components/infoCell'
  import { timingTaskDetail } from '@/api/settings'

  export default {
    mixins: [data],
    components: {
      infoSell
    },
    data() {
      return {
        detailTableData: []
      }
    },
    mounted() {
      this.timingTaskDetailData()
    },
    methods: {
      // 定时短信 详情
      timingTaskDetailData() {
        timingTaskDetail({id: this.$route.query.id}).then(res => {
          this.detailTableData = res.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
