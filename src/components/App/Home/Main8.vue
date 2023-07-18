<template>
  <div style="width: 100%; position: relative; overflow: hidden; padding-bottom: 44.64%">
    <div ref="map" id="map" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  name: "ChinaMap",
  data() {
    return {
      chart: null,
      mapData: null,
    };
  },
  mounted() {
    this.getMapData().then(() => {
      this.renderMap();
    });
  },
  beforeDestroy() {
    if (this.chart != null) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    getMapData() {
      return axios.get("/map/dtsj3/china/100000副.json").then(res => {
        this.mapData = res.data;
      });
    },
    renderMap() {
      let chart = echarts.init(this.$refs.map);
      echarts.registerMap("chinamap", this.mapData);
      let option = {
        series: [
          {
            map: "chinamap",
            type: "map",
            roam: true,
            animationDurationUpdate: 0,
            label: {
              show: true,
              fontSize: 15,
              color: "red",
            },
            itemStyle: {
              areaColor: "#9dc49f",
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
            data: this.mapData.features.map(item => {
              return {
                name: item.properties.name,
                value: parseInt(item.properties.adcode),
              };
            }),
          },
        ],
        geo: [
          {
            name: "adcode",
            map: "chinamap",
            silent: true,
            top: "11%", //11%是相对容器高度而言的，可我想使其相对的是地图的高度而言，有啥好办法吗？
            roam: true,
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
      };
      chart.setOption(option, true);
      // 添加georoam事件处理函数,同步缩放功能
      chart.on("georoam", params => {
        let option = chart.getOption();
        if (params.zoom != null && params.zoom != undefined) {
          option.geo[0].zoom = option.series[0].zoom;
          option.geo[0].center = option.series[0].center;
        } else {
          option.geo[0].center = option.series[0].center;
        }
        chart.setOption(option, true);
      });
    },
  },
};
</script>
