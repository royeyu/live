<template>
  <div>
    <div class="texttitle-back">
      <span>基本信息</span>
      <el-button type="primary" size="mini" @click="goReturn">返回</el-button>
    </div>
    <div class="infoSee">
      <el-row :type="'flex'" :justify="'flex-start'">
        <el-col :span="8">
          <info-sell title="客户名称:" :value="detailData.customerName" />
          <info-sell title="客户账户:" :value="detailData.customerAccount" />
          <info-sell title="数据来源:" :value="detailData.custSrcName" />
          <info-sell title="联系人:" :value="detailData.linkMan" />
          <info-sell title="联系号码:" :value="detailData.linkTel" />
          <info-sell title="身份证头像面:">
            <div>
              <span v-for="(item,index) of detailData.fileList8" :key="index" class="mr10" @click="handlePictureCardPreview(item)">
                <el-avatar class="pointer" shape="square" :size="100" fit="contain" :src="item.url" />
              </span>
            </div>
          </info-sell>
          <info-sell title="身份证国徽面:">
            <div>
              <span v-for="(item,index) of detailData.fileList9" :key="index" class="mr10" @click="handlePictureCardPreview(item)">
                <el-avatar class="pointer" shape="square" :size="100" fit="contain" :src="item.url" />
              </span>
            </div>
          </info-sell>
          <info-sell title="营业执照:">
            <div>
              <span v-for="(item,index) of detailData.fileList1" :key="index" class="mr10" @click="handlePictureCardPreview(item)">
                <el-avatar class="pointer" shape="square" :size="100" fit="contain" :src="item.url" />
              </span>
            </div>
          </info-sell>
          <info-sell title="授权函:">
            <div>
              <span v-for="(item,index) of detailData.fileList2" :key="index" class="mr10" @click="handlePictureCardPreview(item)">
                <el-avatar class="pointer" shape="square" :size="100" fit="contain" :src="item.url" />
              </span>
            </div>
          </info-sell>
          <info-sell title="其他证明文件:">
            <div>
              <span v-for="(item,index) of detailData.fileList11" :key="index" class="mr10" @click="handlePictureCardPreview(item)">
                <el-avatar class="pointer" shape="square" :size="100" fit="contain" :src="item.url" />
              </span>
            </div>
          </info-sell>
         </el-col>
        <el-col :span="8">
          <info-sell title="省份:" :value="detailData.provinceName" />
          <info-sell title="城市:" :value="detailData.cityName" />
          <info-sell title="单位地址:" :value="detailData.address" />
          <info-sell title="单位简称:" :value="detailData.unitName" />
          <info-sell title="客户经理:" :value="detailData.custManager" />
          <info-sell title="经理号码:" :value="detailData.managerPhone" />
          <info-sell title="描述:" :value="detailData.remark" />
          <!--       serviceStatus   0:待开通  1开通中 2停用中 3退订次月生效 4.已退订-->
          <info-sell title="业务状态:" :value="detailData.serviceStatus" :vcolor="detailData.serviceStatus== '开通中' ? '#3ace3a' : '#f44336' " />
          <!--          ckStatus 审核状态 99未审核 1:审核中 2审核通过 -1审核不通过-->
          <info-sell title="客户状态:" :value="detailData.ckStatus == 2 ? '审核通过': detailData.ckStatus == 1 ? '审核中':detailData.ckStatus == -1 ? '审核不通过':'未审核'" :vcolor="detailData.ckStatus==2 ? '#3ace3a' : '#f44336' " />
          <info-sell v-if="detailData.ckStatus == -1" title="拒绝理由:" :value="detailData.ckRemark" />

        </el-col>
      </el-row>
    </div>
    <!--    <div class="infoSee">
      <div class="texttitle">业务类型</div>
      <div v-for="(item,index) of detailData.list" :key="index">
        <el-row :gutter="30" >
          <el-col :span="8" >
            <info-sell title="业务类型:" :value="item.busiTypeName"></info-sell>
            <info-sell title="开通时间:" :value="item.startTime"></info-sell>
            <info-sell title="失效时间:" :value="item.endTime"></info-sell>
          </el-col>
          <el-col :span="8">
            <info-sell title="产品名称:" :value="item.productName"></info-sell>
            <info-sell title="有效时间:" :value="item.lifeCycle+ '月'"></info-sell>
            <info-sell title="业务状态:" :value="item.serviceStatusNmae"></info-sell>
          </el-col>
        </el-row>
        <div class="separate"></div>
      </div>
    </div>-->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import infoSell from '@/components/infoCell'
import { customerDetail } from '@/api/customer'

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
        list: []
      }
    }
  },
  mounted() {
    this.customerDetailData()
  },
  methods: {
    customerDetailData() {
      customerDetail({ id: this.$route.query.id }).then(res => {
        let cachedata = res.data
        cachedata.fileList8 = []
        cachedata.fileList9 = []
        cachedata.fileList1 = []
        cachedata.fileList2 = []
        cachedata.fileList11 = []

        if (cachedata.fileList != null && cachedata.fileList.length) {
          cachedata.fileList.map(item => {
            switch (item.attachType) {
              case 8:
                cachedata.fileList8.push(item)
                break
              case 9:
                cachedata.fileList9.push(item)
                break
              case 1:
                cachedata.fileList1.push(item)
                break
              case 2:
                cachedata.fileList2.push(item)
                break
              case 11:
                cachedata.fileList11.push(item)
                break
            }
          })
        }
        this.detailData = cachedata
        // console.log(this.detailData)
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
