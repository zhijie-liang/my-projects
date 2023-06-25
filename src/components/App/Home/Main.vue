<template>
  <div class="content">
    <div ref="charts" style="width: 100%; height: 600px; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import chinamap from "../../map/dtsj/100000副";
import axios from "axios"; // 引入 axios 库

export default {
  data() {
    return {
      mapName: "chinamap",
      mapJson: chinamap,
      charts: null,
      option: {
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        tooltip: {
          formatter: "{b} {c} (人)",
        },
        backgroundColor: "transparent",
        series: [
          {
            map: "chinamap",
            type: "map3D",
            label: {
              show: true,
              fontSize: 10,
              color: "red",
            },
            itemStyle: {
              color: "#ece8c2", // 背景
              borderWidth: "0.5", // 边框宽度
              borderColor: "#579bd3", // 边框颜色
              shadowBlur: "1000", //阴影模糊级别
            },
            emphasis: {
              // 鼠标移上去时的样式
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
            data: chinamap.features.map(item => {
              return {
                name: item.properties.name,
                value: item.properties.adcode,
              };
            }),
          },
        ],
      },
    };
  },
  mounted() {
    this.initCharts();
    this.charts.on("click", this.handleMapClick); // 添加点击事件处理函数
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
    handleMapClick(e) {
      // 提取 adcode 作为下级地图的名称
      let adcode = e.data.value;

      let mapUrl = `/map/dtsj3/provinces/${adcode}.json`;
      axios
        .get(mapUrl)
        .then(res => {
          this.mapName = e.name;
          this.mapJson = res.data;
          this.registerMap();
          this.charts.setOption({
            series: [
              {
                map: this.mapName,
                data: this.mapJson.features.map(item => {
                  return {
                    name: item.properties.name,
                    value: item.properties.adcode,
                  };
                }),
              },
            ],
          });
        })
        .catch(err => {
          console.error(err);
          alert("无法加载下级地图");
        });
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}
</style>
