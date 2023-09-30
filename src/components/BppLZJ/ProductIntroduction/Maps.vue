<template>
  <div class="content">
    <div ref="map" id="map" style="width: 100%; height: 100%; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
import Swal from "sweetalert2";

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
      this.chart = null;
    }
  },
  methods: {
    handleFullscreenChange() {
      this.$refs.map.focus();
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        const elem = this.$refs.map;
        elem.style.width = "100%";
        elem.style.height = "100%";
        this.chart.resize();
      }
    },

    getMapData() {
      return axios.get("/map/地图数据2/china/100000.json").then(res => {
        this.mapData = res.data;
      });
    },
    renderMap() {
      let chart = echarts.init(this.$refs.map);
      echarts.registerMap("chinamap", this.mapData);
      let option = {
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
          },
        },
        tooltip: {
          backgroundColor: "#344453",
          textStyle: {
            align: "left",
            color: "white",
          },
          formatter: "{b}<br/><br/>\u2003\u2003数字基础设施指数 88.93<br/><br/>\u2003\u2003数字基础设施指数环比 +1.23%",
        },
        series: [
          {
            map: "chinamap",
            type: "map",
            roam: true,
            itemStyle: {
              areaColor: "#1c3e9f",
              color: "transparent",
              borderWidth: "1",
              borderColor: "#3376d1",
            },
            emphasis: {
              itemStyle: {
                areaColor: "#3375cf",
              },
            },
            select: {
              itemStyle: {
                areaColor: "#3375cf",
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
      };
      chart.setOption(option, true);
      chart.on("click", this.handleMapClick); // 添加点击事件处理器
      // 监听容器宽度变化
      window.onresize = function () {
        // 获取容器的新宽度
        var newWidth = document.getElementById("map").offsetWidth;
        console.log(document.getElementById("map").offsetWidth);
        // 根据新的宽度计算地图应该有的top值
        var newTop = calculateTop(newWidth);
        // 更新地图的配置
        option.series.top = newTop;
        // 用新的配置更新地图
        chart.setOption(option, true);
        chart.resize(); // 新添加的这一行
      };
      // 计算新的top值的函数
      function calculateTop(width) {
        // 这里你需要根据实际需求来编写适合你的计算函数
        var percentage = (width / 1000) * 10; // 这只是一个示例，你需要根据实际情况进行调整
        return percentage + "%";
      }
      this.chart = chart;
    },
    async handleMapClick(params) {
      let selectedName = params.name;
      let adcode = params.value;
      try {
        let res = await axios.get(`/map/地图数据2/provinces/${adcode}.json`);
        let newMapData = res.data;
        echarts.registerMap(selectedName, newMapData);
        let toolbox = {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
          },
        };
        let series = {
          map: selectedName,
          type: "map",
          roam: true,
          itemStyle: {
            areaColor: "#1c3e9f",
            color: "transparent",
            borderWidth: "1",
            borderColor: "#3376d1",
          },
          emphasis: {
            itemStyle: {
              areaColor: "#3375cf",
            },
          },
          select: {
            itemStyle: {
              areaColor: "#3375cf",
            },
          },
          data: newMapData.features.map(feature => ({
            name: feature.properties.name,
            value: feature.properties.adcode,
          })),
        };
        this.chart.setOption({ toolbox, series }, true); // 更新series
        this.mapData = newMapData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Swal.fire({
            title: "没有下级地图了",
            timer: 300,
            showConfirmButton: false,
          });
        } else {
          console.error(error);
        }
      }
      // 监听容器宽度变化
      window.onresize = function () {
        // 获取容器的新宽度
        var newWidth = document.getElementById("map").offsetHeight;
        console.log(document.getElementById("map").offsetHeight);
        // 根据新的宽度计算地图应该有的top值
        var newTop = calculateTop(newWidth);
        // 更新地图的配置
        this.series.top = newTop;
        // 用新的配置更新地图
        this.chart.setOption(this.series, true);
        this.chart.resize(); // 新添加的这一行
      };
      // 计算新的top值的函数
      function calculateTop(width) {
        // 这里你需要根据实际需求来编写适合你的计算函数
        var percentage = (width / 1000) * 10; // 这只是一个示例，你需要根据实际情况进行调整
        return percentage + "%";
      }
      this.chart.on("click", this.handleMapClick);
    },
  },
};
</script>

<style scoped>
.content {
  height: 100vh;
}
</style>
