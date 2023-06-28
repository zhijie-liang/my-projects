<template>
  <div class="content">
    <el-color-picker v-model="color"></el-color-picker>
    <div ref="map" style="width: 100%; height: 100%; margin: 0 auto"></div>
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
      cbc: true,
      chart: null, // 图表实例
      mapData: null, // 地图数据
      color: "rgba(19, 206, 102, 0.8)",
    };
  },
  mounted() {
    this.getMapData().then(() => {
      this.renderMap();
    });
  },
  methods: {
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
                  // color: "rgba(0,0,0)",
                  color: this.color,
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#6FA7CE", //地图颜色
                borderColor: "#fff", //地图边线颜色
              },
              emphasis: {
                areaColor: "#B7DFED", //鼠标移入颜色
              },
            },
          },
        ],
      };

      this.chart = chart;

      chart.setOption(option);
      chart.on("click", this.handleMapClick);
      chart.on("restore", this.handleRestore);
    },
  },
  watch: {
    color(val) {
      this.chart.setOption({
        series: [
          {
            label: {
              normal: {
                textStyle: {
                  color: val,
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.content {
  height: 90%;
}
</style>
