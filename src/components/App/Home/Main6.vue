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
        // return axios.get("/map/dtsj3/all/310000.json").then(res => {
        this.mapData = res.data;
      });
    },
    renderMap() {
      let chart = echarts.init(this.$refs.map);
      echarts.registerMap("chinamap", this.mapData);
      let option = {
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
        this.chart.setOption({ title, tooltip, toolbox, series }, true);
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
