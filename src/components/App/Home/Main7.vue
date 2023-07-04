<template>
  <div class="content">
    <div>
      字体颜色:
      <el-color-picker
        v-model="fontColor"
        style="margin-left: 10px; margin-right: 10px; margin-bottom: 20px; top: 10px"
        size="mini"
      ></el-color-picker>
      地图区域颜色:
      <el-color-picker
        v-model="mapAreaColor"
        style="margin-left: 10px; margin-right: 10px; margin-bottom: 20px; top: 10px"
        size="mini"
      ></el-color-picker>
      背景颜色:
      <el-color-picker
        v-model="backgroundColor"
        style="margin-left: 10px; margin-right: 10px; margin-bottom: 20px; top: 10px"
        size="mini"
      ></el-color-picker>
    </div>
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
      showMapLabel: true,
      chart: null, // 图表实例
      mapData: null, // 地图数据
      fontColor: "rgba(0,0,0)",
      mapAreaColor: "#6FA7CE",
      backgroundColor: "#fff",
    };
  },
  mounted() {
    this.getMapData().then(() => {
      this.renderMap();
    });
    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.addEventListener("msfullscreenchange", this.handleFullscreenChange);
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
        // backgroundColor: this.backgroundColor,
        tooltip: {
          formatter: "{b}<br/>{c}",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
            saveAsImage: {
              backgroundColor: "transparent",
            },
            myFull: {
              show: true,
              title: "全屏",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: () => {
                this.fullFlag = true;
                let element = document.getElementById("map");
                if (document.fullscreenElement) {
                  // 当前已在全屏模式，先退出全屏
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
                  // 当前不在全屏模式，请求全屏
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
            myChangePN: {
              show: true,
              title: "不显地名",
              icon: "M0 0h24v24H0z",
              onclick: () => {
                this.showMapLabel = !this.showMapLabel;
                this.renderMap();
              },
            },
          },
        },
        series: [
          {
            name: "adcode",
            map: "chinamap",
            type: "map",
            label: {
              emphasis: {
                show: false,
              },
              // 不需要显示地名可直接删除normal此项
              normal: {
                show: this.showMapLabel, // 是否显示对应地名
                textStyle: {
                  color: this.fontColor,
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: this.mapAreaColor,
                borderColor: "#fff", //地图边线颜色
              },
              emphasis: {
                areaColor: "#B7DFED", //鼠标移入颜色
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
      };
      chart.setOption(option, true);
      chart.on("click", this.handleMapClick); // 添加点击事件处理器
      this.chart = chart;
      chart.on("restore", this.handleRestore);
    },
    async handleMapClick(params) {
      // 处理地图点击事件
      // 加载数据期间禁用地图
      this.chart.off("click");
      let selectedName = params.name;
      let adcode = params.value;
      try {
        let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);
        let newMapData = res.data;
        echarts.registerMap(selectedName, newMapData);
        let series = {
          // type: "map",
          map: selectedName,
          data: newMapData.features.map(feature => ({
            name: feature.properties.name,
            value: feature.properties.adcode,
          })),
        };

        this.chart.setOption({ series });
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
  },
  watch: {
    fontColor(val1) {
      this.chart.setOption({
        series: [
          {
            label: {
              normal: {
                textStyle: {
                  color: val1,
                },
              },
            },
          },
        ],
      });
    },
    mapAreaColor(val2) {
      this.chart.setOption({
        series: [
          {
            itemStyle: {
              normal: {
                areaColor: val2,
              },
            },
          },
        ],
      });
    },
    backgroundColor(val3) {
      this.chart.setOption({
        backgroundColor: val3,
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
