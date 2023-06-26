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
      this.charts.setOption(this.option);
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}
</style>
