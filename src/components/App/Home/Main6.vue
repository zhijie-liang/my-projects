<template>
  <div style="height: 100%" @click="handleContainerClick">
    <div ref="China-Map" id="China-Map" style="height: 100%; widows: 100%; margin: 0 auto"></div>
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
      mapdata: null,
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
        this.mapdata = res.data;
      });
    },
    renderMap() {
      let chart = echarts.init(this.$refs["China-Map"]);
      echarts.registerMap("chinamap", this.mapdata);
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
            restore: {},
            myReturnMap: {
              show: true,
              title: "返回上级地图",
              icon: "M0 0h24v24H0z",
              onclick: () => {
                if (this.mapStack.length > 0) {
                  const lastMapState = this.mapStack.pop();
                  this.mapdata = lastMapState.data;
                  this.selectedName = lastMapState.name;
                  this.renderMap();
                } else {
                  Swal.fire({
                    title: "没有上级地图了",
                    timer: 300,
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
            data: this.mapdata.features.map(item => {
              return {
                name: item.properties.name,
                value: parseInt(item.properties.adcode),
              };
            }),
          },
        ],
      };
      chart.setOption(option, true);
      chart.on("click", this.handleMapClick);
      this.chart = chart;
    },
    async handleMapClick(params) {
      if (params.name && params.value) {
        console.log(params.name);
        this.wasFeatureClicked = true;
      }
      let selectedName = params.name;
      let adcode = params.value;
      this.selectName = params.name;
      try {
        let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);
        let newMapData = res.data;
        if (selectedName !== this.selectedName) {
          console.log("添加新的状态到mapStack中");
          this.mapStack.push({
            data: this.mapdata,
            name: this.selectedName,
          });
        } else {
          console.log("错了");
          Swal.fire({
            title: "没有下级地图了",
            timer: 300,
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
            restore: {},
            myReturnMap: {
              show: true,
              title: "返回上级地图",
              icon: "M0 0h24v24H0z",
              onclick: () => {
                if (this.mapStack.length > 0) {
                  const lastMapState = this.mapStack.pop();
                  this.mapdata = lastMapState.data;
                  this.selectedName = lastMapState.name;
                  this.renderMap();
                } else {
                  Swal.fire({
                    title: "没有上级地图了",
                    timer: 300,
                  });
                }
              },
            },
          },
        };
        let series = {
          map: selectedName,
          type: "map",
          data: newMapData.features.map(feature => ({
            name: feature.properties.name,
            value: feature.properties.adcode,
          })),
        };
        this.chart.setOption({ title, tooltip, toolbox, series }, true);
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
