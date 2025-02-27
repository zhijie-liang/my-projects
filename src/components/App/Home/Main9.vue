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
    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
  },
  beforeDestroy() {
    if (this.chart != null) {
      this.chart = null;
    }

    document.removeEventListener("fullscreenchange", this.handleFullscreenChange);
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
      return axios
        .get("/map/dtsj3/china/100000副.json")
        .then(res => {
          if (!res.data || !Array.isArray(res.data.features)) {
            console.error("无效的地图数据:", res.data);
            alert("无效的地图数据。请稍后再试。");
            return Promise.reject();
          }
          this.mapData = res.data;
          let featrues = this.mapData.features;
          let errorProvince = featrues.find(f => isNaN(parseInt(f.properties.adcode)));
          if (errorProvince) {
            alert(`地图数据 ${errorProvince.properties.name} 加载失败，请检查数据文件是否存在！`);
            return Promise.reject();
          }
          return Promise.resolve();
        })
        .catch(error => {
          console.error("获取地图数据失败:", error);
          alert("获取地图数据失败。请稍后再试。");
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
            myFull: {
              show: true,
              title: "全屏",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: () => {
                this.fullFlag = true;
                let element = document.getElementById("map");
                if (document.fullscreenElement) {
                  if (document.exitFullscreen) {
                    document.exitFullscreen();
                  } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                  } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                  } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                  }
                } else {
                  if (element.requestFullscreen) {
                    element.requestFullscreen();
                  } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                  } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                  } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                  }
                }
                if (this.chart) {
                  element.style.width = window.innerWidth + "px";
                  element.style.height = window.innerHeight + 161 + "px";
                  this.chart.resize();
                }
              },
            },
          },
        },
        series: [
          {
            map: "chinamap",
            type: "map",
            roam: true,
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
        let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);
        let newMapData = res.data;
        echarts.registerMap(selectedName, newMapData);
        let toolbox = {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            myFull: {
              show: true,
              title: "全屏",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: () => {
                this.fullFlag = true;
                let element = document.getElementById("map");
                if (document.fullscreenElement) {
                  if (document.exitFullscreen) {
                    document.exitFullscreen();
                  } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                  } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                  } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                  }
                } else {
                  if (element.requestFullscreen) {
                    element.requestFullscreen();
                  } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                  } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                  } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                  }
                }
                if (this.chart) {
                  element.style.width = window.innerWidth + "px";
                  element.style.height = window.innerHeight + 161 + "px";
                  this.chart.resize();
                }
              },
            },
          },
        };
        let series = {
          map: selectedName,
          type: "map",
          roam: true,
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
  height: 90%;
}
</style>
