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
            map: "chinamap",
            type: "map",
            // zoom: 1,
            // geoIndex: 0,
            label: {
              show: true,
              fontSize: 10,
              color: "red",
            },
            itemStyle: {
              color: "transparent",
              borderWidth: "0.5",
              borderColor: "#579bd3",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                color: "#fff",
              },
              itemStyle: {
                areaColor: "#579bd3",
              },
            },
            select: {
              itemStyle: {
                areaColor: "#579bd3",
              },
            },
            roam: true,
          },
        ],
        geo: [
          {
            map: "chinamap",
            roam: true,
            silent: true,
            top: "12%",
            itemStyle: {
              color: "transparent",
              borderWidth: "0",
              areaColor: "#e0e7c8",
              shadowBlur: "12",
            },
            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                borderWidth: 0,
                borderColor: "#31A0E6",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.initCharts();
    this.charts.on("georoam", this.handleGeoRoam);
  },

  methods: {
    async initCharts() {
      this.charts = echarts.init(this.$refs["charts"]);
      this.registerMap();
      this.charts.setOption(this.option);
    },
    registerMap() {
      echarts.registerMap(this.mapName, this.mapJson);
    },
    // 处理地图拖动和缩放的事件
    handleGeoRoam(params) {
      let option = this.charts.getOption();

      if (params.zoom != null && params.zoom != undefined) {
        option.geo[0].zoom = option.series[0].zoom;
        option.geo[0].center = option.series[0].center;
      } else {
        option.geo[0].center = option.series[0].center;
      }

      this.charts.setOption(option);
    },
  },
};
</script>
<style scoped>
.content {
  height: 100%;
}
</style>
