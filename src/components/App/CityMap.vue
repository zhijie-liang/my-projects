<template>
  <div class="content">
    <div style="display: flex; align-items: center;">
      <el-input v-model="tempColor" placeholder="请输入颜色值"></el-input>
      <el-button type="text" @click="clearColor">清空</el-button>
      <el-button type="primary" @click="confirmColor">确定</el-button>
    </div>
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
      tempColor: "", // 临时存储颜色值的变量
      isConfirmed: false, // 用户是否点击了确认按钮
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
        .then((res) => {
          if (!res.data || !Array.isArray(res.data.features)) {
            console.error("无效的地图数据:", res.data);
            alert("无效的地图数据。请稍后再试。");
            return Promise.reject();
          }
          this.mapData = res.data;
          let featrues = this.mapData.features;
          let errorProvince = featrues.find(
            (f) => isNaN(parseInt(f.properties.adcode))
          );
          if (errorProvince) {
            alert(
              `地图数据 ${errorProvince.properties.name} 加载失败，请检查数据文件是否存在！`
            );
            return Promise.reject();
          }
          return Promise.resolve();
        })
        .catch((error) => {
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
              normal: {
                show: this.showMapLabel,
                textStyle: {
                  color: this.isConfirmed ? this.color : "",
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#6FA7CE",
                borderColor: "#fff",
              },
              emphasis: {
                areaColor: "#B7DFED",
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
    clearColor() {
      this.tempColor = "";
    },
    confirmColor() {
      if (this.tempColor) {
        this.color = this.tempColor;
        this.isConfirmed = true;
        this.updateLabelStyle();
      }
    },
    updateLabelStyle() {
      this.chart.setOption({
        series: [
          {
            label: {
              normal: {
                textStyle: {
                  color: this.color,
                },
              },
            },
          },
        ],
      });
    },
  },
  watch: {
    tempColor() {
      if (this.isConfirmed) {
        this.updateLabelStyle();
      }
    },
  },
};
</script>

<style scoped>
.content {
  height: 90%;
}
</style>
