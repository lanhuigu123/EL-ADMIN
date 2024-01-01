<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never">
          <div class="card">
            <div class="svgIcon"></div>
            <div class="title">
              <p>New Visits</p>
              <span>102,400</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="card">
            <div class="svgIcon"></div>
            <div class="title">
              <p>Message</p>
              <span>81,212</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="card">
            <div class="svgIcon"></div>
            <div class="title">
              <p>Purchases</p>
              <span>9,280</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="card">
            <div class="svgIcon"></div>
            <div class="title">
              <p>Shoppings</p>
              <span>13,600</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card shadow="never" style="margin-top: 20px">
      <div class="echarts"></div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
// import * as echarts from 'echarts'

// const getEcharts = () => {
//   var chartDom = document.getElementsByClassName('echarts')
//   var myChart = echarts.init(chartDom)
//   var option

//   option = {
//     title: {
//       text: 'Stacked Line'
//     },
//     tooltip: {
//       trigger: 'axis'
//     },
//     legend: {
//       data: ['Email', 'Union Ads']
//     },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true
//     },
//     toolbox: {
//       feature: {
//         saveAsImage: {}
//       }
//     },
//     xAxis: {
//       type: 'category',
//       boundaryGap: false,
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//     },
//     yAxis: {
//       type: 'value'
//     },
//     series: [
//       {
//         name: 'Email',
//         type: 'line',
//         stack: 'Total',
//         data: [120, 132, 101, 134, 90, 230, 210]
//       },
//       {
//         name: 'Union Ads',
//         type: 'line',
//         stack: 'Total',
//         data: [220, 182, 191, 234, 290, 330, 310]
//       }
//     ]
//   }

//   option && myChart.setOption(option)
// }
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    p {
      font-size: 16px;
      color: #999;
      line-height: 18px;
    }
    span {
      display: inline-block;
      font-size: 20px;
      color: #666666;
      margin-top: 10px;
    }
  }
}
.content {
  width: 100%;
  height: 100%;
  background-color: #eff1f4;
  padding: 20px;
}
</style>
