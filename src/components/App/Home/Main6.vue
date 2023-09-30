<template>
  <div style="height: 100%" @click="handleContainerClick">
    <div ref="map" id="map" style="height: 100%; widows: 100%; margin: 0 auto"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
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
        // return axios.get("/map/dtsj3/all/440112.json").then(res => {
        this.mapData = res.data;
      });
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
          orient: "vertical",
          feature: {
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
            myFull: {
              show: true,
              title: "全1234567屏",
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
            animationDurationUpdate: 0,
            label: {
              show: true,
              fontSize: 12,
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
      };
      chart.setOption(option, true);
      chart.on("click", this.handleMapClick); // 添加点击事件处理器
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
        // let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);
        let res = await axios.get(`/map/dtsj3/all/${adcode}.json`);
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
          orient: "vertical",
          feature: {
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
          type: "map",
          roam: true,
          animationDurationUpdate: 0,
          label: {
            show: true,
            fontSize: 12,
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
        this.chart.setOption({ backgroundColor, title, tooltip, toolbox, series }, true);
        this.mapData = newMapData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Swal.fire({
            title: "没有下级地图了",
            timer: 300,
          });
        } else {
          console.error(error);
        }
      }
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
