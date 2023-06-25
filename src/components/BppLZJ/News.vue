<template>
  <div class="map">
    <div class="map-container">
      <div class="map-container-title">3D地图</div>
      <div class="map-chart" id="mapEchart"></div>
    </div>
  </div>
</template>

<script>
// import geoJson from "../map/dtsj/provinces/330000.json";
import geoJson from "../map/dtsj/100000副.json";
import * as echarts from "echarts";
import "echarts-gl"; //3D地图插件

export default {
  methods: {
    chartMap() {
      var myChart = echarts.init(document.getElementById("mapEchart"));
      echarts.registerMap("zhejiang", geoJson);
      myChart.hideLoading();
      // 图表配置项
      let option = {
        backgroundColor: 'transparent',
        visualMap: {
          type: "piecewise",
          pieces: [
            { min: 10000000, label: "大于1千万", color: "#7f1100" },
            { min: 1000000, max: 9999999, label: "100万-1000万", color: "#ff5428" },
            { min: 100000, max: 999999, label: "10万-100万", color: "#ff8c71" },
            { min: 10000, max: 99999, label: "1万-10万", color: "#ffd768" },
            { min: 1000, max: 9999, label: "1千-1万", color: "#ffefdb" },
            { max: 999, label: "<1千", color: "#f7f7f7" },
          ],
          orient: "vertical",
          left: "left",
          top: "bottom",
        },

        series: [
          {
            name: "浙江",
            type: "map3D",
            map: "zhejiang",
            data: [
              { name: "北京", value: 100 },
              { name: "天津", value: 2000 },
              { name: "河北", value: 30000 },
              { name: "山西", value: 100000 },
              { name: "内蒙古", value: 2000000 },
              { name: "辽宁", value: 30023 },
              { name: "吉林", value: 10012 },
              { name: "黑龙江", value: 20033 },
              { name: "上海", value: 300245 },
              { name: "江苏", value: 1002435 },
              { name: "浙江", value: 2002314 },
              { name: "安徽", value: 3004356 },
              { name: "福建", value: 1001243 },
              { name: "江西", value: 2003253 },
              { name: "山东", value: 30064576 },
              { name: "河南", value: 100123 },
              { name: "湖北", value: 2001 },
              { name: "湖南", value: 3001 },
              { name: "广东", value: 10024 },
              { name: "广西", value: 20042 },
              { name: "海南", value: 30036 },
              { name: "重庆", value: 100123 },
              { name: "四川", value: 205430 },
              { name: "贵州", value: 37400 },
              { name: "云南", value: 124100 },
              { name: "西藏", value: 25300 },
              { name: "陕西", value: 33534600 },
              { name: "甘肃", value: 165800 },
              { name: "青海", value: 212300 },
              { name: "宁夏", value: 343600 },
              { name: "新疆", value: 112400 },
              { name: "台湾", value: 20240 },
              { name: "香港", value: 345200 },
              { name: "澳门", value: 1143200 },
            ],
            light: {
              main: {
                intensity: 1.2, // 光强度
                shadow: true, // 设置阴影
                alpha: 50, // 阴影不透明度
                beta: -10, // 光源方向与x轴的夹角（为负数时表示光源在地图下方）
              },
            },
            label: {
              show: true,
              fontSize: 18,
              color: "#333",
            },
            itemStyle: {
              // opacity: 0.5,
              borderColor: "#000",
              borderWidth: 0.5,
              areaColor: "rgba(0,0,0,0)",
            },
            emphasis: {
              label: {
                show: true,
              },
              itemStyle: {
                areaColor: "#F08080",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },
  },

  mounted() {
    this.chartMap();
  },
  beforeDestroy() {
    // 防止内存泄露
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
};
</script>

<style lang="less" scoped>
.map {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  .map-container {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/R-C.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    .map-container-title {
      margin: 56px 0 16px;
      font-size: 24px;
      font-weight: 700;
      color: #333;
      line-height: 30px;
      display: flex;
      justify-content: center;
    }

    .map-chart {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
