<template>
  <div class="content">
    <el-button @click="fullScreen" class="fullscreen-btn" style="color: #333">全屏</el-button>
    <div ref="charts" style="width: 100%; height: 100%; margin: 0 auto"></div>

  </div>
</template>

<script>
import * as echarts from "echarts";
import chinamap from "../../map/dtsj/provinces/110000.json";
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
        visualMap: {
          type: "piecewise",
          pieces: [
            { min: 20, max: 25, label: "20-25", color: "#e7c0c3" },
            { min: 15, max: 20, label: "15-20", color: "#edeac6" },
            { min: 10, max: 15, label: "10-15", color: "#cbded5" },
            { min: 5, max: 10, label: "5-10", color: "#ecd3b9" },
            { max: 5, label: "<5", color: "#e6bfe0" },
          ],
          orient: "vertical",
          left: "20",
          top: "1800",
        },
        backgroundColor: "white",
        series: [
          {
            map: "chinamap",
            type: "map",
            label: {
              emphasis: {
                show: false,
              },
              normal: {
                show: true,
                textStyle: {
                  color: "rgba(0,0,0)",
                },
                formatter: function (params) {
                  if (params.name === "朝阳区" || params.name === "海淀区") {
                    return params.name; // 只显示朝阳和海淀的地名
                  } else {
                    return ""; // 其他地方不显示地名
                  }
                },
                textFixed: {
                  // 控制地名位置
                  朝阳: [110.5, 39.8], // 朝阳的地名显示在[110.5, 39.8]处
                  海淀: [116.2, 40.1], // 海淀的地名显示在[116.2, 40.1]处
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
            data: [
              { name: "海淀区", value: 8 },
              { name: "朝阳区", value: 8 },
              { name: "延庆区", value: 8 },
              { name: "东城区", value: 3 },
              { name: "西城区", value: 3 },
              { name: "房山区", value: 18 },
              { name: "大兴区", value: 23 },
              { name: "通州区", value: 13 },
              { name: "顺义区", value: 18 },
              { name: "平谷区", value: 23 },
              { name: "怀柔区", value: 3 },
              { name: "昌平区", value: 13 },
              { name: "密云区", value: 13 },
              { name: "门头沟区", value: 3 },
              { name: "石景山区", value: 18 },
              { name: "丰台区", value: 13 },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    // 获取容器的引用
    const container = this.$refs.charts;


    // 初始化地图
    this.charts = echarts.init(container);
    this.registerMap();

    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.addEventListener("msfullscreenchange", this.handleFullscreenChange);
    this.initCharts();
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
        this.charts.setOption(this.option);
    },
    registerMap() {
      echarts.registerMap(this.mapName, this.mapJson);
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
  height: 90%;
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
