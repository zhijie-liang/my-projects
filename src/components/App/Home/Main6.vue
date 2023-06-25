<template>
  <div class="content">
    <div ref="charts" style="width: 100%; height: 100%"></div>
    <div class="bar">
      <div ref="main" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
import chinamap from "../../map/dtsj/100000副";

export default {
  data() {
    return {
      mapName: "chinamap",
      mapJson: chinamap,
      charts: null,
      option: {
        backgroundColor: "transparent",
        series: [
          {
            map: "chinamap",
            type: "map",
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
              // shadowColor: "red",
              opacity: 1,
              shadowBlur: "50",
            },
          },
        ],
      },
      chartData: null,
    };
  },
  mounted() {
    this.initCharts();
    this.fetchData();
  },
  methods: {
    initCharts() {
      this.charts = echarts.init(this.$refs["charts"]);
      this.registerMap();
      this.charts.setOption(this.option);
    },
    registerMap() {
      echarts.registerMap(this.mapName, this.mapJson);
    },
    fetchData() {
      axios
        .get("http://localhost:3000/data")
        .then(response => {
          this.chartData = response.data;
          this.renderChart();
        })
        .catch(error => {
          console.error(error);
        });
    },
    renderChart() {
      if (!this.chartData) return;

      var myChart = echarts.init(this.$refs.main);
      var option = {
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: this.chartData.map(item => item.name),
          axisLabel: {
            rotate: 60, // 旋转标签文本
            formatter: function (value) {
              // 自定义标签格式
              return value.substring(0, 4) + "..."; // 只显示前四个字符
            },
          },
        },
        yAxis: {
          type: "value",
          name: "（人）",
        },
        series: [
          {
            data: this.chartData.map(item => item.value),
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              normal: {
                label: {
                  // show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 10,
                  },
                },
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

<style scoped>
.content {
  background-image: url("../../../assets/R-C.jpg");
  background-size: cover;
  height: 100%;
}
.bar {
  background-image: url("../../../assets/L.jpg");
  background-size: cover;
  height: 100%;
  opacity: 1;
  width: 300px;
  height: 250px;
  position: absolute;
  right: 80px;
  bottom: -50px;
}
</style>
