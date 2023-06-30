<template>
  <div class="content">
    <!-- <el-button @click="fullScreen" class="fullscreen-btn" style="color: #333">全屏</el-button> -->
    <div ref="map" id="map" style="width: 100%; height: 100%; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

export default {
  name: "ChinaMap",
  data() {
    return {
      chart: null, // 图表实例
      mapData: null, // 地图数据
      selectedProvince: null, // 当前选中的省份
      mapClicked: false, // 是否点击了地图
    };
  },
  mounted() {
    this.getMapData().then(() => {
      this.renderMap();
    });

    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.addEventListener("msfullscreenchange", this.handleFullscreenChange);

    window.addEventListener("click", this.onGlobalClick);
  },
  beforeDestroy() {
    // 在组件销毁前释放图表实例
    if (this.chart != null) {
      this.chart.dispose();
      this.chart = null;
    }

    document.removeEventListener("fullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("msfullscreenchange", this.handleFullscreenChange);

    window.removeEventListener("click", this.onGlobalClick);
  },
  methods: {
    handleFullscreenChange() {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // 退出全屏时恢复原始尺寸
        const elem = this.$refs.map;
        elem.style.width = "100%";
        elem.style.height = "100%";
        this.chart.resize();
      }
    },
    highlightProvince(params) {
      this.mapClicked = true;
      console.log("省份名：" + params.name); // 新增代码

      if (this.selectedProvince === params.name) {
        // 如果点击的省份已经是高亮的，取消高亮
        this.selectedProvince = null;
        this.chart.dispatchAction({
          type: "mapUnSelect",
          seriesIndex: 0,
          name: params.name,
        });
      } else {
        // 如果点击的省份不是已经高亮的，设置为高亮
        this.selectedProvince = params.name;
        this.chart.dispatchAction({
          type: "mapSelect",
          seriesIndex: 0,
          name: params.name,
        });
      }
    },
    onGlobalClick() {
      if (this.mapClicked) {
        if (this.selectedProvince) {
          this.chart.dispatchAction({
            type: "mapUnSelect",
            seriesIndex: 0,
            name: this.selectedProvince,
          });
          this.selectedProvince = null;
        }
      } else {
        console.log("空白处"); // 新增代码
      }
      this.mapClicked = false;
    },
    getMapData() {
      // 获取地图数据
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
      // 渲染地图
      let chart = echarts.init(this.$refs.map);
      echarts.registerMap("chinamap", this.mapData);
      let option = {
        backgroundColor: "white",
        tooltip: {
          formatter: "{b}<br/>{c}",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
            saveAsImage: {},
            myFull: {
              show: true,
              title: "全屏",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: () => {
                this.fullFlag = true;
                let element = document.getElementById("map");
                // 一些浏览器的兼容性
                if (element.requestFullScreen) {
                  // HTML W3C 提议
                  element.requestFullScreen();
                } else if (element.msRequestFullscreen) {
                  // IE11
                  element.msRequestFullScreen();
                } else if (element.webkitRequestFullScreen) {
                  // Webkit (works in Safari5.1 and Chrome 15)
                  element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                  // Firefox (works in nightly)
                  element.mozRequestFullScreen();
                }

                if (this.chart) {
                  element.style.width = window.innerWidth + "px";
                  element.style.height = window.innerHeight + 161 + "px";
                  this.chart.resize();
                }
                // window.location.reload()
                // this.$refs.map.focus();
                // this.handleRestore()
                // 退出全屏
                if (element.requestFullScreen) {
                  document.exitFullscreen();
                } else if (element.msRequestFullScreen) {
                  document.msExitFullscreen();
                } else if (element.webkitRequestFullScreen) {
                  document.webkitCancelFullScreen();
                } else if (element.mozRequestFullScreen) {
                  document.mozCancelFullScreen();
                }
              },
            },
          },
        },
        series: [
          {
            name: "adcode",
            map: "chinamap",
            type: "map",
            roam: true,
            selectedMode: "single",
            // zlevel: 1,
            // color: "#9dc49f",
            animationDurationUpdate: 0,
            // geoIndex: 0,
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
            // zlevel: 2,
            type: "map",
            roam: true,
            selectedMode: "single",
            animationDurationUpdate: 0,
            silent: true,
            top: "11%",
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
      chart.on("click", this.highlightProvince);
      chart.on("click", this.handleMapClick); // 添加点击事件处理器

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

      this.chart = chart;

      chart.setOption(option, true);
      chart.on("click", this.handleMapClick);
      chart.on("restore", this.handleRestore);
    },
    async handleMapClick(params) {
      // 处理地图点击事件
      // 加载数据期间禁用地图
      this.chart.off("click");

      window.addEventListener("click", this.onGlobalClick);
      let selectedName = params.name;
      let adcode = params.value;
      try {
        let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);
        let newMapData = res.data;
        echarts.registerMap(selectedName, newMapData);
        let backgroundColor = "white";
        let tooltip = {
          formatter: "{b}<br/>{c}",
        };
        let toolbox = {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
            saveAsImage: {},
            myFull: {
              show: true,
              title: "全屏查看",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: () => {
                this.fullFlag = true;
                let element = document.getElementById("map");
                // 一些浏览器的兼容性
                if (element.requestFullScreen) {
                  // HTML W3C 提议
                  element.requestFullScreen();
                } else if (element.msRequestFullscreen) {
                  // IE11
                  element.msRequestFullScreen();
                } else if (element.webkitRequestFullScreen) {
                  // Webkit (works in Safari5.1 and Chrome 15)
                  element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                  // Firefox (works in nightly)
                  element.mozRequestFullScreen();
                }
                this.$refs.map.focus();
                if (this.chart) {
                  element.style.width = window.innerWidth + "px";
                  element.style.height = window.innerHeight + 161 + "px";
                  this.chart.resize();
                }
                // 退出全屏
                if (element.requestFullScreen) {
                  document.exitFullscreen();
                } else if (element.msRequestFullScreen) {
                  document.msExitFullscreen();
                } else if (element.webkitRequestFullScreen) {
                  document.webkitCancelFullScreen();
                } else if (element.mozRequestFullScreen) {
                  document.mozCancelFullScreen();
                }
              },
            },
          },
        };
        let series = {
          map: selectedName,
          name: "adcode",
          type: "map",
          roam: true,
          selectedMode: "single",
          // color: "#9dc49f",
          animationDurationUpdate: 0,
          // geoIndex: 0,
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
          data: newMapData.features.map(feature => ({
            name: feature.properties.name,
            value: feature.properties.adcode,
          })),
        };
        let geo = {
          map: selectedName,
          // roam: true,
          animationDurationUpdate: 0,
          silent: true,
          top: "11%",
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
        };
        this.chart.setOption({ backgroundColor, tooltip, toolbox, series, geo }, true); // 更新series和geo
        this.chart.on("click", this.highlightProvince);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("没有下级地图了");
        } else {
          console.error(error);
        }
      }

      // 加载数据后重新启用地图
      this.chart.on("click", this.handleMapClick);
    },
    handleRestore() {
      this.renderMap();
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}
/* .fullscreen-btn {
  top: 20px;
  right: 20px;
  background-color: #ccc;
  border: none;
  padding: 10px;
  cursor: pointer;
} */
</style>
