<template>
  <div style="width: 100%; height: 100%">
    <div ref="chart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "chart",
  mounted() {
    this.renderchart();
  },
  methods: {
    renderchart() {
      const chartDom = this.$refs.chart;
      const myChart = echarts.init(chartDom);

      const xAxisData = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"]; // X轴数据
      const seriesData = [2301, 3317, 3382, 3483, 3465, 3297, 3578, 3444]; // 折线数据

      const option = {
        tooltip: {
          trigger: "axis",
        },
        // grid: {
        // top: "23%",
        // left: "13%",
        // right: "14%",
        // bottom: "13%",
        // containLabel: true,
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData,
          axisTick: {
            show: false, // 隐藏刻度线
          },
        },
        yAxis: [
          {
            type: "value",
            name: "(万人)", // 左侧 Y 轴单位名称
            min: 0, // Y 轴的最小值
            max: 5000, // Y 轴的最大值
            interval: 1000, // 刻度间隔
            splitLine: {
              lineStyle: {
                type: "dashed", // 设置刻度线为虚线样式
                color: "#999999", // 设置刻度线颜色
                opacity: 1, // 设置刻度线透明度
                width: 2, // 设置刻度线宽度
              },
            },
          },
        ],
        series: [
          {
            name: "千兆宽带接入用户占比",
            type: "line",
            yAxisIndex: 0,
            data: seriesData,
            smooth: true,
            symbol: "none", // 去除折线转折处的标记点
            lineStyle: {
              // 设置折线样式
              color: "#052962",
            },
            areaStyle: {
              // 添加颜色
              color: "#03184c", // 使用 rgba 格式设置颜色和透明度
            },
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style></style>
