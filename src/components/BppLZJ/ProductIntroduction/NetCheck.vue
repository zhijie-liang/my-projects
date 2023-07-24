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

      const xAxisData = ["202302", "202303", "202304", "202305", "202306"]; // X轴数据
      const seriesData1 = [80, 40, 45, 55, 40]; // 第一条折线数据
      const seriesData2 = [5, 10, 5, 2, 12]; // 第二条折线数据
      const seriesData3 = [8, 12, 6, 8, 15]; // 第三条折线数据

      const option = {
        tooltip: {
          trigger: "axis",
        },
        title: [
          {
            text: "千兆宽带接入用户占比",
            subtext: "43%",
            left: "6%",
            textStyle: {
              fontSize: 10, // 标题的字体大小
            },
          },
          {
            text: "宽带网络下载速率",
            subtext: "11兆/s",
            left: "37%",
            textStyle: {
              fontSize: 10, 
            },
          },
          {
            text: "移动网络平均下载速率",
            subtext: "32兆/s",
            left: "63%",
            textStyle: {
              fontSize: 10, 
            },
          },
        ],
        legend: {
          data: ["千兆宽带接入用户占比", "宽带网络下载速率", "移动网络平均下载速率"],
          top: "bottom",
          left: "center",
          icon: "rect", //circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
        },
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
            name: "%", // 左侧 Y 轴单位名称
            min: 0, // Y 轴的最小值
            max: 100, // Y 轴的最大值
            interval: 20, // 刻度间隔
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "兆/s", // 右侧 Y 轴单位名称
            min: 0, // Y 轴的最小值
            max: 50, // Y 轴的最大值
            interval: 20, // 刻度间隔
            data: [0, 20, 50], // 自定义刻度
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "千兆宽带接入用户占比",
            type: "line",
            yAxisIndex: 0,
            data: seriesData1,
            areaStyle: {
              // 添加颜色
              color: "#03184c", // 使用 rgba 格式设置颜色和透明度
            },
            lineStyle: {
              // 设置折线样式
              color: "#052962",
            },
            symbol: "none", // 去除折线转折处的标记点
          },
          {
            name: "宽带网络下载速率",
            type: "line",
            yAxisIndex: 1,
            data: seriesData2,
            lineStyle: {
              // 设置折线样式
              color: "#052962",
            },
            symbol: "none", // 去除折线转折处的标记点
          },
          {
            name: "移动网络平均下载速率",
            type: "line",
            yAxisIndex: 1,
            data: seriesData3,
            lineStyle: {
              // 设置折线样式
              color: "#052962",
            },
            symbol: "none", // 去除折线转折处的标记点
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style></style>
