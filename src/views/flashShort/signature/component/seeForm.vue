<template>
  <div>
    <div class="texttitle-back">
      <span>基本信息</span>
      <el-button type="primary" size="mini" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :gutter="30">
        <el-col :span="8">
          <info-sell title="业务号码:" :value="detailData.phone" />
          <info-sell title="签名:" :value="detailData.signName" />
          <info-sell title="授权文件:">
            <div @click="dialogVisible = true">
              <!--              <span class="mr10" @click="handlePictureCardPreview(item)" v-for="(item,index) of detailData.busiStr" :key="index">-->
              <el-avatar class="pointer" shape="square" :size="100" fit="contain" :src="detailData.signUrl" />
              <!--              </span>-->
            </div>
          </info-sell>
        </el-col>
        <el-col :span="8">
          <info-sell title="创建时间:" :value="detailData.createTime" />
          <info-sell title="审核状态:" :value="detailData.approvalStatusStr" />
          <info-sell title="不通过原因:" v-if="(detailData.approvalStatus==-1||detailData.approvalStatus==-2) && detailData.approvalReason!=null" :value="detailData.approvalReason" />
          <info-sell title="审核时间:" :value="detailData.approvalTime" />
        </el-col>
      </el-row>
    </div>
    <div v-if="detailData.approvalStatus == 0" class="audit-wrapper">
      <el-form ref="ckForm" :model="ckForm" label-width="10px" :rules="rules">
        <div class="audit-status">
          <!--          <span>审核状态：</span>-->
          <el-form-item prop="ckStatus" label="审核状态:" label-width="90px">
            <el-radio-group v-model="ckForm.ckStatus" size="small">
              <el-radio label="1">审核通过</el-radio>
              <el-radio label="-1">审核不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="audit-reson">
          <el-form-item v-if="ckForm.ckStatus == -1" prop="ckRemark">
            <el-input v-model="ckForm.ckRemark" :rows="3" type="textarea" placeholder="请输入审核不通过原因" />
          </el-form-item>
        </div>
      </el-form>
      <div class="audit-btn">
        <el-button v-prevent-re-click type="primary" @click="ckSubmit">审核</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="detailData.signUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import infoSell from '@/components/infoCell'
import { getSignManageApproval, getSignManageDetail } from '@/api/customer'

export default {
  components: {
    infoSell
  },
  mixins: [data],
  data() {
    return {
      detailData: {},
      dialogVisible: false,
      ckForm: {
        ckStatus: '',
        ckRemark: ''
      },
      rules: {
        ckStatus: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ],
        ckRemark: [
          { required: true, message: '请输入审核不通过原因', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.templateDetailData()
  },
  methods: {
    templateDetailData() {
      getSignManageDetail({ id: this.$route.query.id }).then(res => {
        this.detailData = res.data
      })
    },
    ckSubmit() {
      this.$refs.ckForm.validate(valid => {
        if (valid) {
          const params = {
            id: this.$route.query.id,
            approvalStatus: this.ckForm.ckStatus,
            approvalReason: this.ckForm.ckRemark
          }
          getSignManageApproval(params).then(res => {
            this.$message.success('操作成功')
            this.templateDetailData()
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .infoSee {
    margin-bottom: 10px;
  }
  .audit-wrapper{
    padding: 5px 25px;
    .audit-status{
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
    }
    .audit-reson{
      padding: 15px 85px;
    }
    .audit-btn{
      padding: 10px 90px;
    }
    .el-form-item{
      width: 100%;
      margin-bottom: 10px;
    }
  }
</style>
