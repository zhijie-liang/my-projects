<template>
  <div class="content" @click="handleContainerClick" style="height: 100%">
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
      wasFeatureClicked: false,
      selectedName: "中华人民共和国",
      selectName: "",
      mapStack: [],
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
      this.$refs.map.focus();
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // 退出全屏时恢复原始尺寸
        const elem = this.$refs.map;
        elem.style.width = "100%";
        elem.style.height = "100%";
        this.chart.resize();
      }
    },
    getMapData() {
      return (
        axios
          .get("/map/dtsj3/china/100000副.json")
          // .get("/map/dtsj3/provinces/140000.json")
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
          })
      );
    },
    renderMap() {
      let chart = echarts.init(this.$refs.map);
      echarts.registerMap("chinamap", this.mapData);
      let option = {
        backgroundColor: "white",
        title: [
          {
            text: this.selectedName,
            subtext: "地区",
            left: "center",
          },
        ],
        tooltip: {
          formatter: "{b}<br/>{c}",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            myRestore: {
              show: true,
              title: "还原",
              icon: "path://M330.667,233.376c-50.176,0-93.653,19.456-127.36,53.163C162.965,334.725,143.509,378.202,143.509,428.378s19.456,93.653,59.797,127.36c40.21,33.621,93.419,53.28,146.361,53.28s106.152-19.659,146.464-53.28c40.308-33.707,59.771-77.184,59.771-127.36S420.976,233.376,370.8,233.376L370.8,233.376z M370.8,614.058c-48.683,0-91.883-18.816-124.48-52.224c-32.501-33.504-52.117-76.928-52.117-128.455c0-51.522,19.616-94.949,52.117-128.448c32.597-33.411,75.797-52.224,124.48-52.224s91.881,18.813,124.48,52.224c32.5,33.498,52.112,76.925,52.112,128.448c0,51.527-19.612,94.951-52.112,128.455C462.677,595.242,419.483,614.058,370.8,614.058L370.8,614.058z M322.909,378.93l76.8,66.816l-76.8,66.816V378.93L322.909,378.93z", // 这应该是你自己的图标路径
              onclick: () => {
                chart.setOption(option, true);
              },
            },
            saveAsImage: {},
            myFull: {
              show: true,
              title: "全屏",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: () => {
                this.fullFlag = true;
                let element = document.getElementById("map");
                if (document.fullscreenElement) {
                  if (document.exitFullscreen) {
                    document.exitFullscreen(); // 标准全屏API
                  } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen(); // Firefox
                  } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen(); // Chrome, Safari和Opera
                  } else if (document.msExitFullscreen) {
                    document.msExitFullscreen(); // Internet Explorer
                  }
                } else {
                  // 当前不在全屏模式，请求全屏
                  if (element.requestFullscreen) {
                    element.requestFullscreen(); // 标准全屏API
                  } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen(); // Firefox
                  } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen(); // Chrome, Safari和Opera
                  } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen(); // Internet Explorer
                  }
                }
                if (this.chart) {
                  element.style.width = window.innerWidth + "px";
                  element.style.height = window.innerHeight + 161 + "px";
                  this.chart.resize();
                }
              },
            },
            myReturnMap: {
              show: true,
              title: "返回上级地图",
              icon: "M0 0h24v24H0z",
              onclick: () => {
                if (this.mapStack.length > 0) {
                  console.log("返回上级地图");
                  const lastMapState = this.mapStack.pop();
                  this.mapData = lastMapState.data;
                  this.selectedName = lastMapState.name;
                  this.renderMap();
                } else {
                  Swal.fire({
                    title: "没有上级地图了",
                    timer: 300,
                    showConfirmButton: false,
                  });
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
            // zoom:0.5,
            selectedMode: "single",
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
            roam: true,
            // zoom:0.5,
            selectedMode: "single",
            animationDurationUpdate: 0,
            silent: true,
            // top: "60",
            top: "11%",
            // layoutCenter: ["50%", "52%"],
            // layoutSize: "100%",
            // center: [115.97, 29.71],
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
        chart.dispatchAction({
          type: "restore",
        });
        chart.setOption(option, true);
      });
      this.chart = chart;
    },
    async handleMapClick(params) {
      if (params.name && params.value) {
        console.log(params.name);
        this.wasFeatureClicked = true;
      }
      let selectedName = params.name;
      this.selectName = params.name;
      let adcode = params.value;
      try {
        let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);
        let newMapData = res.data;
        if (selectedName !== this.selectedName) {
          console.log("添加新的状态到mapStack中");
          // 只有在进入新的地图时,才会添加新的状态到 mapStack 中
          this.mapStack.push({
            data: this.mapData,
            name: this.selectedName,
          });
        } else {
          console.log("错了");
          Swal.fire({
            title: "没有下级地图了",
            timer: 300,
            showConfirmButton: false,
          });
          return;
        }
        echarts.registerMap(selectedName, newMapData);
        this.selectedName = selectedName;
        let backgroundColor = "white";
        let title = [
          {
            text: this.selectedName,
            subtext: "地区",
            left: "center",
          },
        ];
        let tooltip = {
          formatter: "{b}<br/>{c}",
        };
        let toolbox = {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            myRestore: {
              show: true,
              title: "还原",
              icon: "path://M330.667,233.376c-50.176,0-93.653,19.456-127.36,53.163C162.965,334.725,143.509,378.202,143.509,428.378s19.456,93.653,59.797,127.36c40.21,33.621,93.419,53.28,146.361,53.28s106.152-19.659,146.464-53.28c40.308-33.707,59.771-77.184,59.771-127.36S420.976,233.376,370.8,233.376L370.8,233.376z M370.8,614.058c-48.683,0-91.883-18.816-124.48-52.224c-32.501-33.504-52.117-76.928-52.117-128.455c0-51.522,19.616-94.949,52.117-128.448c32.597-33.411,75.797-52.224,124.48-52.224s91.881,18.813,124.48,52.224c32.5,33.498,52.112,76.925,52.112,128.448c0,51.527-19.612,94.951-52.112,128.455C462.677,595.242,419.483,614.058,370.8,614.058L370.8,614.058z M322.909,378.93l76.8,66.816l-76.8,66.816V378.93L322.909,378.93z",
              onclick: () => {
                this.chart.setOption({ title, tooltip, toolbox, series, geo }, true);
              },
            },
            saveAsImage: {},
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
            myReturnMap: {
              show: true,
              title: "返回上级地图",
              icon: "M0 0h24v24H0z",
              onclick: () => {
                if (this.mapStack.length > 0) {
                  console.log("返回上级地图");
                  const lastMapState = this.mapStack.pop();
                  this.mapData = lastMapState.data;
                  this.selectedName = lastMapState.name;
                  this.renderMap();
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
          data: newMapData.features.map(feature => ({
            name: feature.properties.name,
            value: feature.properties.adcode,
          })),
        };
        let geo = {
          map: selectedName,
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
        this.chart.setOption({ backgroundColor, title, tooltip, toolbox, series, geo }, true);
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
      this.chart.on("click", this.handleMapClick);
    },
    handleContainerClick() {
      if (this.wasFeatureClicked) {
        this.wasFeatureClicked = false;
      } else {
        console.log("空白");
        this.chart.dispatchAction({
          type: "unselect",
          name: this.selectName,
        });
      }
    },
  },
};
</script>

<style scoped></style>
