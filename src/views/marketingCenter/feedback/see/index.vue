<template>
  <div class="app-container">
    <div class="texttitle-back">
      <span>基本信息</span>
      <el-button type="primary" size="mini" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="8">
          <info-sell title="业务号码:" :value="detailData.phone" />
          <info-sell title="渠道类型:" :value="filterName(detailData.channel, feedbackChannelList)" />
        </el-col>
        <el-col :span="8">
          <info-sell title="反馈时间:" :value="detailData.createTime" />
<!--          <info-sell title="业务类型:" :value="detailData.busiTypeStr" />-->
        </el-col>
      </el-row>
    </div>
    <div class="texttitle-back" style="padding: 10px;margin: 30px 0 10px">
      <span>意见内容</span>
    </div>
    <div class="infoSee">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="16">
          <info-sell title="反馈内容:">
            <div style="padding: 0px 0px 0px 20px;">
              <p>{{detailData.content}}</p>
              <template v-if="detailData.pictureUrlList!=null">
                <span v-for="(item,index) of detailData.pictureUrlList" :key="index" class="mr10" @click="handlePictureCardPreview(item)">
                  <el-avatar class="pointer" shape="square" :size="100" fit="contain" :src="item.url" />
                </span>
              </template>
            </div>
          </info-sell>
          <info-sell title="回复内容:" style="padding: 0;">
            <div style="padding: 0px 0px 0px 20px;" v-if="detailData.replyStatus == 0">
              <el-input v-model="content" placeholder="请输入回复内容" type="textarea" rows="5" style="width:100%" />
            </div>
            <div style="padding: 0px 0px 0px 20px;"  v-else>
              <p>{{detailData.replyContent}}</p>
            </div>
          </info-sell>
          <info-sell title="回复人:"  v-if="detailData.replyStatus == 1" style="padding: 0;">
            <div style="padding: 0px 0px 0px 20px;">
              <p>{{detailData.replyPerson}}</p>
            </div>
          </info-sell>
          <info-sell title="回复时间:"  v-if="detailData.replyStatus == 1" style="padding: 0;">
            <div style="padding: 0px 0px 0px 20px;">
              <p>{{detailData.replyTime}}</p>
            </div>
          </info-sell>
        </el-col>
      </el-row>
      <div class="butList" v-if="detailData.replyStatus == 0">
        <div style="padding: 10px;">
          <el-button :loading="subloading" type="primary" style="" @click="sendReply">保存</el-button>
          <el-button @click="goReturn">取消</el-button>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import infoSell from '@/components/infoCell'
import { getFeedbackDetail, getFeedbackReply } from '@/api/customer'

export default {
  components: {
    infoSell
  },
  mixins: [data],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      detailData: {},
      content: '',
      subloading: false
    }
  },
  mounted() {
    this.customerDetailData()
  },
  methods: {
    customerDetailData() {
      // let arr = [
      //   {'url':'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF'},
      //   {'url':'https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF'},
      // ]
      getFeedbackDetail({ id: this.$route.query.id }).then(res => {
        this.detailData = res.data
        // this.detailData.pictureUrlList = arr
        // this.detailData.pictureUrlList = null
        console.log(res)
      })
    },
    sendReply() {
      if(this.content == "") {
        this.$message.error('请输入回复内容')
        return
      }
      getFeedbackReply({ id: this.$route.query.id, replyContent: this.content }).then(res => {
        this.$message.success('操作成功')
        this.customerDetailData()
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
