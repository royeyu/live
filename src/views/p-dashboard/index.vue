<template>
  <div v-loading="loading" class="app-container dashboard">
    <el-tabs v-if="tabList.length>0" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :label="item.itemText" :name="item.itemValue" />
      <!--      <el-tab-pane label="来电名片" name="11" />-->
    </el-tabs>
    <div v-if="baseInfo!=null" class="texttitle-index">
      基础信息
    </div>
    <div v-if="baseInfo!=null" class="dashboard-container">
      <el-row :gutter="30">
        <el-col :span="10">
          <info-sell title="单位名称:" twidth="120px" :value="baseInfo.customerName" />
          <info-sell title="开通时间:" twidth="120px" :value="baseInfo.userCreateTime" />
        </el-col>
        <el-col :span="10">
          <info-sell title="业务号码:" twidth="120px" :value="$store.state.user.name" />
          <info-sell title="用户状态:" twidth="120px" :value="baseInfo.ckStatus == 2 ? '审核通过' : gdbaseinfo.ckStatus == 1 ? '审核中' : gdbaseinfo.ckStatus == -1 ? '审核不通过' : '未审核' " />
        </el-col>
      </el-row>
    </div>
    <div v-if="baseInfo!=null" class="texttitle-busi">
      业务信息
    </div>
    <div v-if="baseInfoList.length > 0" class="busi-container">
      <el-row :gutter="30">
        <el-col :span="8">
          <info-sell title="业务类型:" twidth="120px" :value="baseInfoList[0].busiTypeStr" />
          <info-sell title="开通时间:" twidth="120px" :value="baseInfoList[0].startTime" />
          <info-sell title="创建时间:" twidth="120px" :value="baseInfoList[0].orderCreateTime" />
        </el-col>
        <el-col :span="8">
          <info-sell title="产品类型:" twidth="120px" :value="baseInfoList[0].productTypeStr" />
          <info-sell title="失效时间:" twidth="120px" :value="baseInfoList[0].endTime" />
          <info-sell title="订单号:" twidth="120px" :value="baseInfoList[0].orderNo" />
        </el-col>
        <el-col :span="8">
          <info-sell title="产品名称:" twidth="120px" :value="baseInfoList[0].productName!=null ? baseInfoList[0].productName : '-'" />
          <info-sell title="有效周期:" twidth="120px" :value="baseInfoList[0].lifeCycle != null ? baseInfoList[0].lifeCycle == 0 ? '长期' : baseInfoList[0].lifeCycle +'个月' : '-' " />
          <info-sell title="业务状态:" twidth="120px" :value="baseInfoList[0].orderStatusStr" />
        </el-col>
      </el-row>
      <template v-if="baseInfoList.length > 1 && listshow">
        <div v-for="(item,index) in baseInfoList" :key="index" class="list-container">
          <el-row v-if="index>0" :gutter="30">
            <el-col :span="8">
              <info-sell title="业务类型:" twidth="120px" :value="item.busiTypeStr" />
              <info-sell title="开通时间:" twidth="120px" :value="item.startTime" />
              <info-sell title="创建时间:" twidth="120px" :value="item.orderCreateTime" />
            </el-col>
            <el-col :span="8">
              <info-sell title="产品类型:" twidth="120px" :value="item.productTypeStr" />
              <info-sell title="失效时间:" twidth="120px" :value="item.endTime" />
              <info-sell title="订单号:" twidth="120px" :value="item.orderNo" />
            </el-col>
            <el-col :span="8">
              <info-sell title="产品名称:" twidth="120px" :value="item.productName!=null ? item.productName : '-'" />
              <info-sell title="有效周期:" twidth="120px" :value="item.lifeCycle != null ? item.lifeCycle == 0 ? '长期' : item.lifeCycle +'个月' : '-' " />
              <info-sell title="业务状态:" twidth="120px" :value="item.orderStatusStr" />
            </el-col>
          </el-row>
        </div>
      </template>
      <p v-if="baseInfoList.length > 1" class="more-container" @click="handleMore"><i :class="{'el-icon-caret-bottom':!listshow,'el-icon-caret-top':listshow}" />{{ (listshow ? '隐藏':'显示' )+ '更多' }}</p>
    </div>
    <div v-if="baseInfo!=null" class="texttitle-index">
      业务状态
    </div>
    <div v-if="busiInfo!=null" class="dashboard-container">
      <div class="dashboard-proline">
        <p class="txt">使用量：</p>
        <p class="line"><el-progress v-if="busiInfo.userate!=null" :text-inside="true" :stroke-width="20" :percentage="busiInfo.userate*100" status="success" /></p>
      </div>
      <el-row :gutter="30">
        <el-col :span="10">
          <info-sell title="套餐数量:" twidth="120px" :value="busiInfo.total != null ? busiInfo.total : '0'" />
          <info-sell title="今日计数:" twidth="120px" :value="busiInfo.billNum != null ? busiInfo.billNum : '0'" />
          <info-sell title="昨日计数:" twidth="120px" :value="busiInfo.ybillNum != null ? busiInfo.ybillNum : '0'" />
          <info-sell title="本月计数:" twidth="120px" :value="busiInfo.mbillNum != null ? busiInfo.mbillNum : '0'" />
        </el-col>
        <el-col :span="10">
          <info-sell title="剩余数量:" twidth="120px" :value="busiInfo.residue != null ? busiInfo.residue : '0'" />
          <info-sell title="今日推送:" twidth="120px" :value="busiInfo.sendNum != null ? busiInfo.sendNum : '0'" />
          <info-sell title="昨日推送:" twidth="120px" :value="busiInfo.ysendNum != null ? busiInfo.ysendNum : '0'" />
          <info-sell title="本月推送:" twidth="120px" :value="busiInfo.msendNum != null ? busiInfo.msendNum : '0'" />
        </el-col>
      </el-row>
    </div>
    <div v-if="baseInfo!=null" class="texttitle-index">
      推送规则
    </div>
    <div v-for="(item,index) in ruleList" :key="index" class="dashboard-container">
      <el-row :gutter="30">
        <el-col :span="15">
          <info-sell title="规则编号:" twidth="120px" :value="item.ruleNo" />
          <info-sell title="触发对象:" twidth="120px" :value="item.ruleObject" />
          <info-sell title="推送周期:" twidth="120px" :value="resolvedWeek(item.weekOfDay)" :dflex="'2'" :dcolor="'#ff2525'" :desc="'说明：推送的星期范围'" />
          <info-sell title="推送时段:" twidth="120px" :value="resolvedHour(item.hourOfDay)" :dflex="'2'" :dcolor="'#ff2525'" :desc="'说明：推送的起止时间'" />
          <info-sell title="推送频次:" twidth="120px" :value="resolvedFreq(item.sendFreq)" :dflex="'2'" :dcolor="'#ff2525'" :desc="'说明：针对同一呼叫用户在设定周期内只触发推送一次'" />
        </el-col>
        <el-col :span="8">
          <div style="display: flex; justify-content: end; align-items: center;">
            <el-switch
              :value="item.status==1 ? true : false"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(val)=>{return rulestatusChange(val,item)}"
            />
            <el-button size="mini" type="primary" style="margin-left: 20px" @click="goRulePage(item.id)">修改规则</el-button>
          </div>
        </el-col>
        <!--        @click="delData(scope.row, '启动',1)"-->
      </el-row>
      <div class="dashboard-template">
        <div v-if="item.content!=null" class="container">
          <p><span class="showtitle">展示给：</span><span class="showall">所有人</span></p>
          <p class="showcontent">{{ item.content }}</p>
          <p><span class="showtitle">更新时间：</span><span class="showall"> {{ item.updateTime }}</span></p>
        </div>
        <div v-for="items in item.tdDto" class="container">
          <p><span class="showtitle">展示给：</span><span class="showall">{{ items.recPhones }}</span></p>
          <p class="showcontent">{{ items.content }}</p>
          <p><span class="showtitle">更新时间：</span><span class="showall">{{ items.createTime }}</span></p>
        </div>
      </div>
    </div>
    <div v-if="baseInfo==null" class="dashboard-none">暂无数据</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import charLine from './components/Line'
import infoSell from '@/components/infoCell'
import { getUserServices, getUserServicesInfo } from '@/api/customer'
import { filter } from '@/mixns/filter'
import { data } from '@/mixns/data'
import { butList } from '@/mixns/butMenu'
import { bscrulePause, bscruleStart } from '@/api/settings'
export default {
  name: 'Dashboard',
  components: {
    charLine,
    infoSell
  },
  mixins: [filter, data, butList],
  data() {
    return {
      loading: false,
      servicesList: [],
      tabList: [],
      activeName: null,
      baseInfo: null,
      busiInfo: null,
      baseInfoList: [],
      listshow: false,
      ruleList: []
    }
  },
  created() {
    this.init()
  },
  mounted() {

  },
  methods: {
    goRulePage(id) {
      this.$router.push({
        path: '/basicsSet/ruleSet/update',
        query: { id: id }
      })
    },
    async init() {
      this.loading = true
      this.getserviceTypeList()
    },
    // 获取业务类型列表
    getserviceTypeList() {
      this.dictGetByCodeData('service_type').then(res => {
        this.servicesList = res
        this.GetUserServices()
      })
    },
    // 获取用户服务
    GetUserServices() {
      getUserServices({ 'custId': this.$store.state.user.id }).then(res => {
        const userList = res.data
        userList.map((item) => {
          const cacheitem = this.servicesList.filter((items) => {
            return items.itemValue == item
          })
          if (cacheitem.length > 0) this.tabList.push(cacheitem[0])
        })
        if (this.tabList.length > 0) {
          this.activeName = this.tabList[0].value.toString()
          this.GetUserServicesInfo()
        } else {
          this.loading = false
        }
      })
    },
    // 获取用户服务的详情
    GetUserServicesInfo() {
      getUserServicesInfo({ 'custId': this.$store.state.user.id, 'busiType': this.activeName }).then(res => {
        this.loading = false
        if (res.data.baseInfoList != null && res.data.baseInfoList.length > 0) this.baseInfo = res.data.baseInfoList[0]
        this.busiInfo = res.data.businessInfo
        console.log(this.busiInfo)
        this.busiInfo.userate = this.busiInfo.total == 0 || this.busiInfo.total == null ? 1 : (this.busiInfo.total - this.busiInfo.residue) / this.busiInfo.total
        this.baseInfoList = res.data.baseInfoList
        this.ruleList = res.data.ruleList
        // console.log(this.ruleList)
        // console.log(this.baseInfoList[0])
      })
    },
    handleClick() {
      this.loading = true
      this.GetUserServicesInfo()
    },
    resovletypename(val) {
      const cacheitem = this.servicesList.filter((item) => {
        return item.itemValue == val
      })
      // console.log(cacheitem)
      return cacheitem[0].itemText
    },
    handleMore() {
      this.listshow = !this.listshow
    },
    rulestatusChange(val, item) {
      console.log(val)
      console.log(item)
      if (!val) {
        this.delData(item, '暂停', 0)
      } else {
        this.delData(item, '启动', 1)
      }
    },
    delData(obj, text, status) {
      this.$confirm(`确认${text}规则?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          'id': obj.id,
          'status': status
        }
        this.subloading = true
        let request
        if (status === 1) {
          request = bscruleStart(params)
        } else {
          request = bscrulePause(params)
        }
        request.then(res => {
          this.ruleList.forEach((item) => {
            if (item.id == obj.id) {
              item.status = (item.status + 1) % 2
            }
          })
          this.successData()
          this.subloading = false
        }).catch(e => {
          this.subloading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败!'
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>

  .dashboard {
    &_chart {
      height: 300px;
    }

    .box-card {
      height: 100%;
    }

    &-container {
      margin:20px 10px;
      padding: 30px 0;
      border: 1px solid #d7d3d3;
      box-shadow: 3px 5px 7px 1px #ccc;

    }
    &-proline{
      display: flex;
      padding: 10px 30px;
      justify-content: center;
      align-items: center;
      .txt{
        color: #333;
      }
      .line{
          flex: 1;
      }
      ::v-deep.el-progress-bar__inner{
        border-radius: 4px;
      }
      ::v-deep.el-progress-bar__outer{
        border-radius: 4px;
      }
    }
    &-template{
      margin: 20px 100px;
      border: 1px #f3f3f3 solid;
      padding: 10px 20px;
      font-size: 14px;
      color: #555;
      .container{
        border-bottom: 1px #f3f3f3 solid;
      }
      .container:nth-last-child(1) {
        border: 0;
      }
      .showtitle{
        font-weight: bold;
      }
      .showall{

      }
      .showcontent{
          color: #25962a;
      }

    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }

    &_card {
      margin-bottom: 20px;

      &_body {
        display: flex;
      }

      &_body2 {
        display: flex;
        text-align: center;

        > div {
          flex: 1;
        }
      }
    }
    .texttitle-index {
      padding: 5px 10px;
      min-height: 42px;
      margin-bottom: 20px;
      color: #606266;
      border-left: 2px solid #0b7bff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f2f2f2;
    }
    .texttitle-busi {
      padding: 5px 10px 0 10px;
      min-height: 42px;
      margin-bottom: 20px;
      color: #606266;
      border-left: 2px solid #0b7bff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f2f2f2;
    }
    .busi-container{
      margin:10px 10px 10px 10px;
      padding: 10px 10px 10px 10px;
    }
    .list-container{
      border-bottom: 1px solid #f8f8f8;
      padding: 20px 0;
    }
    .list-container:nth-last-child(2){
      border:0
    }
    .more-container{
      border-top: 1px solid #f8f8f8;
      padding-top: 20px;
      color: #666;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }
    &-none {
     margin: 100px auto 0;
      text-align: center;
      color: #999;
    }
  }
</style>
