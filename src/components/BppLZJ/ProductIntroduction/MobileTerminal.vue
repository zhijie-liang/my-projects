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

      const xAxisData = ["2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月"]; // X轴数据
      const seriesData1 = [100, 200, 250, 400, 450, 250, 400, 450]; // 第一条折线数据
      const seriesData2 = [55, 100, 85, 72, 62, 35, 82, 62]; // 柱图数据

      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["用户数", "渗透率"],
          top: "bottom",
          left: "center",
          icon: "rect",
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisTick: {
            alignWithLabel: true, // 将刻度线与刻度标签对齐
          },
        },
        yAxis: [
          {
            type: "value",
            name: "(万人)", // 左侧 Y 轴单位名称
            min: 0, // Y 轴的最小值
            max: 500, // Y 轴的最大值
            interval: 100, // 刻度间隔
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "(%)", // 右侧 Y 轴单位名称
            min: 0, // Y 轴的最小值
            max: 100, // Y 轴的最大值
            interval: 20, // 刻度间隔
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "用户数",
            type: "line",
            yAxisIndex: 0,
            data: seriesData1,
            lineStyle: {
              // 设置折线样式
              color: "#0a569e",
            },
            symbol: "none", // 去除折线转折处的标记点
          },
          {
            name: "渗透率",
            type: "bar",
            yAxisIndex: 1,
            data: seriesData2,
            barMinHeight: 0, // 设置最小高度为0
            barMaxWidth: "30%", // 可选项，用于控制柱状图的宽度
            itemStyle: {
              normal: {
                color: "#147ce1", // 设置柱子的颜色
              },
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
