<template>
  <div class="app-container dashboard">
<!--    <div class="texttitle-index">-->
<!--      业务概览-->
<!--    </div>-->
    <div class="texttitle-index">
      业务概况
    </div>
    <div class="dashboard_card">
      <el-row :gutter="30">
        <el-col v-for="(item,index) in indexCard" :key="index" :span="6" style="height: 133px">
          <el-card class="box-card" :class="'bgColor' + index">
            <div slot="header" class="clearfix">
              <span>{{ item.name }}</span>
            </div>
            <div v-if="!item.subName2" class="dashboard_card_body">
              <div>{{ item.subName }}:</div>
              <div>{{ item.valve }}</div>
            </div>
            <div v-else>
              <div class="dashboard_card_body2">
                <div>
                  <div>{{ item.subName }}</div>
                  <div>{{ item.valve }}</div>
                </div>
                <div>
                  <div>{{ item.subName2 }}</div>
                  <div>{{ item.valve2 }}</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="texttitle-index">
      任务推送情况-今日
    </div>
    <div class="dashboard_chart">
      <char-line :legend-data="mouthLine.legendData" :x-axis-data="todayLine.xAxisData" :series-data="todayLine.seriesData" />
    </div>
    <div class="texttitle-index">
      任务推送情况-本月
    </div>
    <div class="dashboard_chart">
      <char-line :legend-data="mouthLine.legendData" :x-axis-data="mouthLine.xAxisData" :series-data="mouthLine.seriesData" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import charLine from './components/Line'
import { indexGetIndexBusiCount, indexGetSmsSendDayCount, indexGetSmsSendMonthCount } from '@/api/report'

export default {
  name: 'Dashboard',
  components: {
    charLine
  },
  data() {
    return {
      todayLine: {
        xAxisData: [],
        seriesData: []
      },
      mouthLine: {
        xAxisData: [],
        seriesData: []
      },
      indexCard: [
        {
          name: '挂机短信',
          subName: '个人用户数',
          key: 'gdIndividuals',
          valve: 0
        },
        {
          name: '挂机短信',
          subName: '企业用户数',
          subName2: '号码数',
          key: 'gdEnterprises',
          key2: 'gdEnterprisesPhones',
          valve: 0,
          valve2: 0
        },
        {
          name: '来电名片',
          subName: '个人用户数',
          key: 'ldIndividuals',
          valve: 0
        },
        {
          name: '来电名片',
          subName: '企业用户数',
          subName2: '号码数',
          key: 'ldEnterprises',
          key2: 'ldEnterprisesPhones',
          valve: 0,
          valve2: 0
        }
      ]
    }
  },
  mounted() {
    // 业务概况统计
    this.indexGetIndexBusiCountData()
    // 短信发送日统计
    this.indexGetSmsSendDayCountData()
    // 短信发送月统计
    this.indexGetSmsSendMonthCountData()
  },
  methods: {
    // 生成随机数
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1)
          break
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum)
          break
        default:
          return 0
          break
      }
    },
    // 业务概况统计
    indexGetIndexBusiCountData() {
      indexGetIndexBusiCount().then(res => {
        const data = res.data
        for (const dataKey in data) {
          // data[dataKey] = this.randomNum(1, 50)
          this.indexCard.filter(item => {
            if (item.key === dataKey) {
              item.valve = data[dataKey]
            }
            if (item.key2 === dataKey) {
              item.valve2 = data[dataKey]
            }
            return item
          })
        }
      })
    },
    // 短信发送日统计
    indexGetSmsSendDayCountData() {
      indexGetSmsSendDayCount().then(res => {
        const hour = []
        const gdTotal = []
        const ldTotal = []
        const data = res.data.filter(item => {
          // item.gdTotal = this.randomNum(1, 50)
          // item.ldTotal = this.randomNum(1, 50)
          if (item.hour < 10) {
            item.hour = '0' + item.hour + ':00'
          } else {
            item.hour = item.hour + ':00'
          }
          hour.push(item.hour)
          gdTotal.push(item.gdTotal)
          ldTotal.push(item.ldTotal)
          return item
        })
        const par = {
          xAxisData: hour,
          legendData: ['挂机短信', '来电名片'],
          seriesData: [
            {
              data: gdTotal,
              name: '挂机短信'
            },
            {
              data: ldTotal,
              name: '来电名片'
            }
          ]
        }
        this.todayLine = par
      })
    },
    // 短信发送月统计
    indexGetSmsSendMonthCountData() {
      indexGetSmsSendMonthCount().then(res => {
        const hour = []
        const gdTotal = []
        const ldTotal = []
        const data = res.data.filter(item => {
          // item.gdTotal = this.randomNum(1, 50)
          // item.ldTotal = this.randomNum(1, 50)
          hour.push(item.day)
          gdTotal.push(item.gdTotal)
          ldTotal.push(item.ldTotal)
          return item
        })
        const par = {
          xAxisData: hour,
          legendData: ['挂机短信', '来电名片'],
          seriesData: [
            {
              data: gdTotal,
              name: '挂机短信'
            },
            {
              data: ldTotal,
              name: '来电名片'
            }
          ]
        }
        this.mouthLine = par
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
      margin: 30px;
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
  }
</style>
