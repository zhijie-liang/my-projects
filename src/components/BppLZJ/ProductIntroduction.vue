<template>
  <div id="map" style="width: 100%; height: 600px; margin: 0 auto"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import chinaJson from "../map/dtsj/100000.json";

export default {
  name: "ChinaMap3D",
  data() {
    return {
      mapChart: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      echarts.registerMap("china", chinaJson);
      this.mapChart = echarts.init(document.getElementById("map"));

      const option = {
        series: [
          {
            type: "map3D",
            map: "china",
            environment: "#333",
            realisticMaterial: {
              roughness: 0.8,
              metalness: 0,
            },
            postEffect: {
              enable: true,
            },
            light: {
              main: {
                intensity: 1,
                shadow: true,
                shadowQuality: "high",
              },
              ambientCubemap: {
                texture: "../assets/pisa.hdr",
                exposure: 1,
                diffuseIntensity: 0.5,
              },
            },
            viewControl: {
              distance: 50,
            },
            regionHeight: 3,
          },
        ],
      };
      this.mapChart.setOption(option);
    },
  },
};
</script>
