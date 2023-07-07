<template>
  <div class="content">
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
        // backgroundColor: "transparent",
        backgroundColor: "#fff",
        title: [
          {
            text: "企业数量",
            left: "20",
            top: "250",
          },
        ],
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
            myFull: {
              show: true,
              title: "全屏",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: () => {
                this.fullFlag = true;
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
            saveAsImage: {},
          },
        },
        // visualMap: {
        //   type: "continuous", // 连续型可视化映射类型
        //   min: 0, // 数据范围最小值
        //   max: 20000, // 数据范围最大值
        //   inRange: {
        //     color: ["#fff2cc", "#ffe699", "#ffd966", "#ed7d31"], // 颜色区间，可以自定义颜色
        //   },
        //   textStyle: {
        //     color: "#333", // 文本样式颜色
        //   },
        //   orient: "vertical", // 可视化映射方向，水平或垂直
        //   left: "20",
        //   top: "300",
        // },
        visualMap: {
          type: "piecewise", //分段型可视化映射，即将数据按照一定的分段范围进行分类并显示不同的颜色或标签。
          // type: "continuous", //连续型可视化映射，即将数据按照一个连续的数值范围进行映射，并通过渐变的颜色表示数据的大小。
          // type: "category", //类别型可视化映射，即将数据按照一组离散的类别进行映射，并为每个类别指定一个特定的颜色。
          pieces: [
            { min: 10001, label: ">10000", color: "#ed7d31" },
            { min: 5001, max: 10000, label: "5001-10000", color: "#ffd966" },
            { min: 3001, max: 5000, label: "3001-5000", color: "#ffe699" },
            { max: 2999, label: "<3000", color: "#fff2cc" },
          ],
          orient: "vertical",
          left: "20",
          top: "300",
        },
        series: [
          {
            map: "chinamap",
            type: "map",
            roam: true,
            label: {
              normal: {
                show: true, //是否显示地名
                textStyle: {
                  fontSize: 15, //地名字体大小
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: "#fff", //地图边线颜色
              },
              emphasis: {
                areaColor: "#B7DFED", //鼠标移入颜色
              },
            },
            data: [
              { name: "西城区", value: 1559 },
              { name: "密云区", value: 1683 },
              { name: "东城区", value: 1694 },
              { name: "门头沟区", value: 2033 },
              { name: "延庆区", value: 2256 },
              { name: "石景山区", value: 2652 },
              { name: "怀柔区", value: 3172 },
              { name: "平谷区", value: 3241 },
              { name: "顺义区", value: 3341 },
              { name: "房山区", value: 4226 },
              { name: "通州区", value: 4342 },
              { name: "丰台区", value: 4408 },
              { name: "大兴区", value: 6587 },
              { name: "昌平区", value: 7831 },
              { name: "朝阳区", value: 11455 },
              { name: "海淀区", value: 19180 },
            ],
            //地图点
            markPoint: {
              symbolSize: 10, //标记大小
              itemStyle: {
                borderWidth: 2, //外层宽度
                color: "#fff", //内层颜色
                borderColor: "red", //外层颜色
              },
              data: [
                {
                  name: "东城区",
                  coord: [116.418757, 39.917544],
                },
                {
                  name: "西城区",
                  coord: [116.366794, 39.915309],
                },
                {
                  name: "海淀区",
                  coord: [116.310316, 39.956074],
                },
                {
                  name: "朝阳区",
                  coord: [116.486409, 39.921489],
                },
                {
                  name: "延庆区",
                  coord: [116.2, 40.465325],
                },
                {
                  name: "房山区",
                  coord: [115.839157, 39.735535],
                },
                {
                  name: "大兴区",
                  coord: [116.338033, 39.628908],
                },
                {
                  name: "通州区",
                  coord: [116.758603, 39.702486],
                },
                {
                  name: "顺义区",
                  coord: [116.653525, 40.128936],
                },
                {
                  name: "平谷区",
                  coord: [117.112335, 40.144783],
                },
                {
                  name: "怀柔区",
                  coord: [116.637122, 40.724272],
                },
                {
                  name: "昌平区",
                  coord: [116.235906, 40.218085],
                },
                {
                  name: "密云区",
                  coord: [116.943352, 40.477362],
                },
                {
                  name: "门头沟区",
                  coord: [115.705381, 39.937183],
                },
                {
                  name: "石景山区",
                  coord: [116.195445, 39.914601],
                },
                {
                  name: "丰台区",
                  coord: [116.286968, 39.863642],
                },
              ],
            },
          },
        ],
      },
    };
  },
  mounted() {
    const container = this.$refs.charts;
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
  },
};
</script>
<style scoped>
.content {
  height: 100%;
}
</style>
