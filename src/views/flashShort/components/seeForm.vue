<template>
  <div>
    <div class="texttitle-back">
      <span>基本信息</span>
      <el-button type="primary" size="mini" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :gutter="30">
        <el-col :span="10">
          <info-sell title="业务类型:" :value="(detailData.detail.fusionServiceFlag == '1' ? '融合服务 - ' :'') + detailData.detail.busiTypeStr" />
          <info-sell title="模板类型:" :value="filterName(detailData.detail.templateType,flashShortType)" />
          <info-sell v-if="detailData.detail.templateKey!=''" title="变量名称:" :value="detailData.detail.templateKey" />
          <info-sell v-if="detailData.detail.signName!=null" title="签名:" :value="`【${detailData.detail.signName}】`" />
          <info-sell v-if="detailData.detail.templateName!=null" title="模板名称:" :value="detailData.detail.templateName" />
          <info-sell title="模板内容:" :value="detailData.detail.templateContent" />
          <info-sell v-if="!isSystem()" title="指定通用:" :value="detailData.detail.phones==null ? '已指定':'未指定'" />
          <info-sell v-if="!isSystem()" title="指定专用:" :value="detailData.detail.phones!=null && detailData.detail.phones  !='' ? detailData.detail.phones:'未指定'" />
        </el-col>
        <el-col :span="10">
          <info-sell title="短信模板:" :value="detailData.detail.templateInfoStr" />
          <info-sell title="模板ID:" :value="detailData.detail.templateNo" />
          <info-sell title="短闪账号:" :value="detailData.detail.apiAccountName" />
          <info-sell v-if="detailData.detail.templateInfo == 2" title="短信主题:" :value="detailData.detail.subjectName" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <info-sell v-if="detailData.detail.templateInfo == 2" title="短信素材:">
            <template v-if="detailData.detail.templateUrlList!=null">
              <div v-for="(item,index) of detailData.detail.templateUrlList" :key="index" class="mr10" @click="Preview(item)">
                <p style="padding-left: 10px">{{ decodeURIComponent(item.name) }}</p>
                <el-avatar v-if="item.fileType == 1" class="pointer" shape="square" fit="contain" :size="300" :src="item.url" />
                <video v-if="item.fileType == 2" :src="item.url" width="100%" controls />
                <video v-if="item.fileType == 3" :src="item.url" height="50" width="100%" controls />
              </div>
            </template>
          </info-sell>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <info-sell v-if="detailData.attach!=null" title="资质文件:">
            <template v-if="detailData.attach.length > 0">
              <span v-for="(item,index) of detailData.attach" :key="index" class="mr10" @click="PreviewIMG(item)">
                <el-avatar  class="pointer" shape="square" fit="contain" :size="100" :src="item.url" />
              </span>
            </template>
          </info-sell>
        </el-col>
      </el-row>
    </div>
    <div class="infoSee">
      <div class="texttitle">审核记录</div>
      <div v-for="(item,index) of detailData.review">
        <el-row :gutter="30">
          <el-col :span="8">
            <info-sell :title="(item.ckType === 2 ? '复审': '初审') +'状态:'" :value="item.ckStatusStr" />
            <info-sell v-if="(item.ckStatus === -1 || item.ckStatus === -2 )&& item.remark != ''" title="拒绝理由:" :value="item.remark" />
          </el-col>
          <el-col :span="8">
            <info-sell title="审核人员:" :value="item.userName" />
          </el-col>
          <el-col :span="8">
            <info-sell :title="(item.ckType === 2 ? '复审': '初审') +'时间:'" :value="item.ckTime" />
          </el-col>
        </el-row>
        <div class="separate" />
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
import { getTemplatePhoneInfo, templateDetail } from '@/api/customer'

export default {
  components: {
    infoSell
  },
  mixins: [data],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      detailData: {
        detail: {},
        review: []
      },
      statuslist: [
        { value: 99, label: '未审核' },
        { value: 1, label: '初审通过' },
        { value: 2, label: '复审通过' },
        { value: -1, label: '初审不通过' },
        { value: -2, label: '复审不通过' }
      ]
    }
  },
  created() {
    // 个人用户登录
    if (!this.isSystem()) {
      getTemplatePhoneInfo({ id: this.$route.query.id }).then(res => {
        // console.log(res)
      })
    }
  },
  mounted() {
    this.templateDetailData()
  },
  methods: {
    Preview(file) {
      // console.log(file)
      if (file.fileType != 1) {
        return
      }
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    PreviewIMG(file) {
      if (file.url == null) {
        return
      }
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    templateDetailData() {
      templateDetail({ id: this.$route.query.id }).then(res => {
        this.detailData = res.data
        if (this.detailData.detail.templateUrlList != null) {
          this.detailData.detail.templateUrlList.map((item) => {
            item.name = item.attachName.split('?')[0]
          })
        }
      })
    },
    resovled(val) {
      const items = this.statuslist.filter(item => {
        return item.value == val
      })
      return items[0].label
    }
  }
}
</script>

<style scoped lang="scss">

</style>
