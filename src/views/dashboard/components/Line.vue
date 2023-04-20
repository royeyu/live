<template>
  <div ref="line" style="height: 100%;width: 100%"/>
</template>
<script>

  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')			//柱状图
  //下面的是需要的提示框
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/grid')
  export default {
    name: 'charLine',
    props: {
      xAxisData: {
        type: Array
      },
      legendData: {
        type: Array
      },
      seriesData: {
        type: Array
      },
      charTitle: {
        type: String,
        default: '条'
      }
    },
    data: () => ({
      chart: null
    }),
    //图表更新
    watch: {
      seriesData:{ //监听的对象
        deep:true, //深度监听设置为 true
        handler:function(newV,oldV){
          this.init()
        }
      }
    },
    created() {
      this.$nextTick(() => {
      })
    },
    beforeDestroy() {
      this.chart && window.removeEventListener('resize', this.resize)
    },
    methods: {
      init() {
        this.chart = echarts.init(this.$refs.line)
        this.chart.clear()
        let arr = []
        this.seriesData.map(item => {
          arr.push({
            data: item.data,
            name: item.name,
            type: 'line',
            areaStyle: {}
          })
        })
        this.chart.setOption({
          title: {
            text: this.charTitle,
            textStyle: {
              fontSize: 14,
              color: '#999'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.legendData
          },
          grid: {
            top: 30,
            left: 30,
            right: 40
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,// 是否两边留白
            data: this.xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: arr
        }, true)
        window.addEventListener('resize', this.resize)
      },
      resize() {
        this.chart.resize()
      }
    }
  }
</script>
