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
      selectedName: "中华人民共和国",
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
        title: [
          {
            text: this.selectedName,
            subtext: "地名",
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
            myReturnMap: {
              show: true,
              title: "先取消选中再返回上级地图",
              icon: "M0 0h24v24H0z",
              onclick: () => {
                if (this.mapStack.length > 0) {
                  console.log("先取消选中再返回上级地图");
                  const lastMapState = this.mapStack.pop();
                  this.mapData = lastMapState.data;
                  this.selectedName = lastMapState.name;
                  this.renderMap();
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
      chart.on("click", this.handleMapClick);
      this.chart = chart;
    },
    async handleMapClick(params) {
      if (params.name && params.value) {
        console.log(params.name);
      }
      let selectedName = params.name;
      let adcode = params.value;
      this.mapStack.push({
        data: this.mapData,
        name: this.selectedName,
      });
      try {
        let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);
        let newMapData = res.data;
        echarts.registerMap(selectedName, newMapData);
        this.selectedName = selectedName;
        let title = [
          {
            text: this.selectedName,
            subtext: "地名",
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
            myReturnMap: {
              show: true,
              title: "先取消选中再返回上级地图",
              icon: "M0 0h24v24H0z",
              onclick: () => {
                if (this.mapStack.length > 0) {
                  console.log("先取消选中再返回上级地图");
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
            showConfirmButton: false,
          });
        } else {
          console.error(error);
        }
      }
      this.chart.on("click", this.handleMapClick);
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}
</style>
