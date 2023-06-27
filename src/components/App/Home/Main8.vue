<template>
  <div class="content">
    <div ref="charts" style="width: 100%; height: 100%; margin: 0 auto"></div>
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
        backgroundColor: "white",
        series: [
          {
            type: "map",
            map: "chinamap",
            label: {
              emphasis: {
                show: false,
              },
              // 不需要显示地名可直接删除normal此项
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: "rgba(0,0,0)",
                },
              },
            },
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
      this.charts.setOption(this.option);
    },
    registerMap() {
      echarts.registerMap(this.mapName, this.mapJson);
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}
</style>
