<template>
  <div class="content">
    <el-button @click="fullScreen" class="fullscreen-btn" style="color: #333">全屏</el-button>
    <div ref="charts" style="width: 100%; height: 100%; margin: 0 auto"></div>
    <div class="table">
      <table style="margin: 10px">
        <thead>
          <tr>
            <th>排名</th>
            <th>省份</th>
            <th>总指数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, name) in populationData" :key="name">
            <td>{{ item.index }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import chinamap from "../../map/dtsj/100000副";
import axios from "axios"; // 引入 axios 库
export default {
  data() {
    return {
      mapName: "chinamap",
      mapJson: chinamap,
      charts: null,
      option: {
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        tooltip: {
          formatter: "{b} {c} (人)",
        },
        visualMap: {
          type: "piecewise",
          pieces: [
            { min: 100000000, label: ">100000000", color: "#9dc49f" },
            { min: 10000000, max: 99999999, label: "10000000-99999999", color: "#a8caa9" },
            { min: 1000000, max: 9999999, label: "1000000-9999999", color: "#b3d1b4" },
            { max: 999999, label: "<1000000", color: "#bed7bf" },
          ],
          orient: "vertical",
          left: "20",
          top: "400",
        },
        backgroundColor: "white",
        series: [
          {
            map: "chinamap",
            type: "map",
            roam: true,
            animationDurationUpdate: 0,
            // geoIndex: 0,
            label: {
              show: true,
              fontSize: 10,
              color: "red",
            },
            itemStyle: {
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
          },
        ],
        geo: [
          {
            map: "chinamap",
            roam: true,
            animationDurationUpdate: 0,
            silent: true,
            top: "12%",
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
      },
      populationData: [
        { index: "1", name: "北京", value: Math.floor(Math.random() * 10000) },
        { index: "2", name: "上海", value: Math.floor(Math.random() * 10000) },
        { index: "3", name: "广东", value: 11346 },
        { index: "4", name: "其他", value: 17876 },
      ],
    };
  },
  mounted() {
    // 获取容器的引用
    const container = this.$refs.charts;

    // 在初始化地图之前，动态计算 top 的值
    const containerHeight = container.offsetHeight; // 获取容器的高度
    const topPercentage = ((containerHeight * 0.12) / containerHeight) * 100; // 计算 top 的百分比值

    // 更新地理坐标系的 top 属性
    this.option.geo[0].top = `${topPercentage}%`;

    // 初始化地图
    this.charts = echarts.init(container);
    this.registerMap();

    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.addEventListener("msfullscreenchange", this.handleFullscreenChange);
    this.initCharts();

    // 添加georoam事件处理函数,同步缩放功能
    this.charts.on("georoam", params => {
      let option = this.charts.getOption();

      if (params.zoom != null && params.zoom != undefined) {
        option.geo[0].zoom = option.series[0].zoom;
        option.geo[0].center = option.series[0].center;
      } else {
        option.geo[0].center = option.series[0].center;
      }

      this.charts.setOption(option);
    });
  },
  beforeUnmount() {
    document.removeEventListener("fullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("msfullscreenchange", this.handleFullscreenChange);
  },
  methods: {
    handleFullscreenChange() {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // 退出全屏时恢复原始尺寸
        const elem = this.$refs.charts;
        elem.style.width = "100%";
        elem.style.height = "100%";
        this.charts.resize();
      }
    },
    async initCharts() {
      this.charts = echarts.init(this.$refs["charts"]);
      this.registerMap();
      // 异步请求数据，并更新 ECharts 数据项
      this.getData().then(data => {
        this.option.series[0].data = data;
        this.charts.setOption(this.option);
      });
    },
    registerMap() {
      echarts.registerMap(this.mapName, this.mapJson);
    },
    // 异步请求数据
    getData() {
      return axios.get("http://localhost:3000/data").then(response => response.data);
    },
    fullScreen() {
      const elem = this.$refs.charts;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }

      if (this.charts) {
        elem.style.width = window.innerWidth + "px";
        elem.style.height = window.innerHeight + 151 + "px";
        this.charts.resize();
      }
    },
  },
};
</script>
<style scoped>
.content {
  /* background-image: url("../../../assets/R-C.jpg"); */
  background-size: cover;
  background-position: center;
  height: 100%;
}
.table {
  opacity: 0.8;
  background-image: url("../../../assets/L.jpg");
  background-size: cover;
  background-position: center;
  position: absolute;
  right: 50px;
  bottom: -30px;
  color: #769adf;
}
.fullscreen-btn {
  top: 20px;
  right: 20px;
  background-color: #ccc;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
