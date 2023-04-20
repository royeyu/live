<template>
  <div>
    <div class="texttitle-back">
      <span>基本信息</span>
      <el-button type="primary" size="mini" @click="goReturn">返回</el-button>
    </div>
<!--    <div class="infoSee">-->
<!--      <el-row :gutter="30">-->
<!--        <el-col :span="8">-->
<!--          <info-sell title="客户名称:" :value="detailData.custIdName" />-->
<!--          &lt;!&ndash;          <info-sell title="号码状态:" :value="filterName(detailData.orderStatus,businessTypeOption)"></info-sell>&ndash;&gt;-->

<!--          &lt;!&ndash;          <info-sell title="数据来源:" value="wzl_admin"></info-sell>&ndash;&gt;-->
<!--        </el-col>-->
<!--&lt;!&ndash;        <el-col :span="8">&ndash;&gt;-->
<!--&lt;!&ndash;          <info-sell title="备注:" :value="detailData.remark==''?'无':detailData.remark" />&ndash;&gt;-->
<!--&lt;!&ndash;        </el-col>&ndash;&gt;-->
<!--      </el-row>-->
<!--    </div>-->
    <div class="infoSee">
      <div class="texttitle">号码信息</div>
      <el-row :gutter="30">
        <el-col :span="8">
          <info-sell v-if="isSystem()" title="客户名称:" :value="detailData.custIdName" />
          <info-sell title="企业号码:" :value="detailData.mobile" />
          <info-sell title="创建日期:" :value="detailData.createTime" />
          <info-sell title="证明文件:">
            <div>
              <span v-if="detailData.url!=null&&detailData.url!=''&&detailData.url.indexOf('.pdf')==-1" class="mr10" style="cursor: pointer;color:#409EFF" @click="handlePictureCardPreviewUrl(detailData.url)">
                点击查看图片
              </span>
              <span v-else-if="detailData.url!=null&&detailData.url!=''&&detailData.url.indexOf('.pdf')!=-1" class="mr10" style="cursor: pointer;color:#409EFF">
                <a :href="detailData.url" target="_blank">点击查看图片</a>
              </span>
              <span v-else>无</span>
            </div>
          </info-sell>
          <info-sell title="审核状态:" :value="filterName(detailData.ckStatus,examineTypeOption)" />
          <info-sell title="备注:" :value="detailData.remark==''?'无':detailData.remark" />
        </el-col>
        <el-col :span="8">
          <info-sell title="户主姓名:" :value="detailData.custName" />
          <info-sell title="业务类型:" :value="detailData.busiTypeName"/>
          <!--          <info-sell title="失效时间:" :value="detailData.groupName"></info-sell>-->
          <info-sell title="所属群组:" :value="detailData.groupName==null?'无':detailData.groupName" />
          <info-sell v-if="detailData.ckStatus==-1" title="未通过理由:" :value="detailData.ckRemark==''?'无':detailData.ckRemark" />
        </el-col>
        <el-col :span="8">
          <!--          <info-sell title="产品名称:" :value="detailData.productName"></info-sell>-->
          <!--          <info-sell title="有效周期:" value=""></info-sell>-->
        </el-col>
      </el-row>
      <div class="family-wrapper" >
        <p class="title">亲情号码</p>
        <div class="separate" />
        <el-table
          v-if="detailData.kinshipVOList != null "
          :data="detailData.kinshipVOList"
          :show-header="false"
        >
          <el-table-column
            v-for="(item, index) in dataExport"
            :key="index"
            align="left"
            :prop="item.value"
            :show-overflow-tooltip="item.overText"
            :label="item.label"
            :min-width="item.width"
          >
            <template slot-scope="scope">
              <span v-if="item.value === 'name'">姓名：{{scope.row.name}}</span>
              <span v-if="item.value === 'phone'">号码：{{scope.row.phone}}</span>
              <span v-if="item.value === 'createTime'">创建日期：{{scope.row.createTime}}</span>
              <span v-if="item.value === 'remark'">备注：{{scope.row.remark}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="50%" top="5%" >
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { data } from '@/mixns/data'
import infoSell from '@/components/infoCell'
import { phoneDetail } from '@/api/customer'

const exportData = [
  { label: '姓名', value: 'name', width: 50, overText: true },
  { label: '号码', value: 'phone', width: 50, overText: true },
  { label: '创建日期', value: 'createTime', width: 50, overText: true },
  { label: '备注', value: 'remark', width: 50, overText: true }
]
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
      dataExport: exportData,
    }
  },
  mounted() {
    this.phoneDetailData()
  },
  methods: {
    phoneDetailData() {
      phoneDetail({ id: this.$route.query.id }).then(res => {
        this.detailData = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .family-wrapper{
      padding: 10px 40px 0;
      p.title {
        font-size: 15px;
      }
    }
</style>
