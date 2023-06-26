<template>
  <div class="content">
    <div ref="charts" style="width: 100%; height: 600px; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
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
            type: "map",
            map: "chinamap",
            zlevel: 5,
            label: {
              show: true,
              fontSize: 10,
              color: "#a3c36a",
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.initCharts();
    this.$refs.charts.addEventListener("click", this.handleMapClick);
  },
  beforeDestroy() {
    this.$refs.charts.removeEventListener("click", this.handleMapClick);
  },
  methods: {
    initCharts() {
      this.charts = echarts.init(this.$refs.charts);
      this.registerMap();
      this.charts.setOption(this.option);
    },
    registerMap() {
      echarts.registerMap(this.mapName, this.mapJson);
    },
    handleMapClick(event) {
      const clickedRegion = event.target.getAttribute("name");

      if (clickedRegion === this.highlightedRegion) {
        // 如果点击的是已经高亮的区域，则输出"已经高亮"
        console.log("已经高亮");
      } else if (clickedRegion) {
        // 如果点击的是未高亮的区域，则输出"未高亮"
        console.log("未高亮");
      } else {
        // 如果点击的是地图区域之外的区域，则输出"空白"
        console.log("空白");
      }
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}
</style>
