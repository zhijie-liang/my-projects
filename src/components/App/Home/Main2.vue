<template>
  <div class="content">
    <div
      style="
        padding-top: 26px;
        font-size: 24px;
        font-weight: 700;
        color: #902e2e;
        line-height: 30px;
        display: flex;
        justify-content: center;
      "
    >
      第七次全国人口普查
    </div>
    <div ref="charts" style="width: 100%; height: 600px; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import "echarts-gl";
import chinamap from "../../map/dtsj/100000副";
import axios from "axios"; // 引入 axios 库

export default {
  data() {
    return {
      mapName: "chinamap",
      mapJson: chinamap,
      charts: null,
      option: {
        tooltip: {
          formatter: "{b}<hr/>{c} (人)",
        },
        backgroundColor: "transparent",
        series: [
          {
            type: "map",
            map: "chinamap",
            zlevel: 5,
            label: {
              show: true,
              fontSize: 10,
              color: "#a3c36a",
            },
            itemStyle: {
              color: "transparent",
              borderWidth: "2",
              borderColor: "#579bd3",
              opacity: 0.8,
              shadowBlur: "100",
            },
            data: [], // 数据项为空数组
          },
        ],
      },
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      this.charts = echarts.init(this.$refs["charts"]);
      this.registerMap();
      // 异步请求数据，并更新 ECharts 数据项
      this.getData().then(data => {
        this.option.series[0].data = data;
        this.charts.setOption(this.option);
      });
    },
    registerMap() {
      echarts.registerMap(this.mapName, this.mapJson);
    },
    // 异步请求数据
    getData() {
      return axios

        .get("http://localhost:3000/data")
        .then(response => response.data)
        .catch(error => console.log(error));
    },
  },
};
</script>

<style scoped>
.content {
  background-image: url("../../../assets/R-C.jpg");
  background-size: cover;
  background-position: center;
  height: 120%;
}
</style>
