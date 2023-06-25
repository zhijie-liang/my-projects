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
      highlightedArea: null,
      option: {
        // 添加"背景"区域
        graphic: {
          type: 'rect',
          shape: {
            width: '100%',
            height: '100%'
          },
          z: -10,
          invisible: false,
          draggable: false,
          onclick: () => {
            this.highlightedArea = null;
            this.updateMap();
          }
        },
        series: [
          {
            type: "map",
            map: "chinamap",
            data: chinamap.features.map(feature => {
              return {
                name: feature.properties.name,
                itemStyle: {
                  areaColor: '#fff',
                },
              };
            }),
            emphasis: {
              itemStyle: {
                areaColor: '#fbd437',
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
    async initCharts() {
      this.charts = echarts.init(this.$refs["charts"]);
      echarts.registerMap(this.mapName, this.mapJson);
      this.charts.setOption(this.option);

      this.charts.on("click", params => {
        if (params.componentType === "series") {
          if (this.highlightedArea === params.name) {
            this.highlightedArea = null;
          } else {
            this.highlightedArea = params.name;
          }
          this.updateMap();
        }
      });
    },

    updateMap() {
      this.option.series[0].data = this.mapJson.features.map(feature => {
        return {
          name: feature.properties.name,
          itemStyle: {
            areaColor: feature.properties.name === this.highlightedArea ? '#fbd437' : '#fff',
          },
        };
      });

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
