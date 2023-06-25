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
        geo3D: {
          map: "zhejiang",
          zoom: 0.1, // 地图比例
          roam: true,
          regions: [
            {
              name: "",
              itemStyle: {
                // 隐藏地图
                normal: {
                  opacity: 0, // 为 0 时不绘制该图形
                },
              },
              label: {
                show: false, // 隐藏文字
              },
            },
          ],
          label: {
            show: true,
            position: "top",
            color: "#111", //地图初始化区域字体颜色
            fontSize: 14,
            lineHeight: 16,
          },
          itemStyle: {
            // color: "#007aff",
            color: "yellowgreen",
            opacity: 1,
            borderWidth: 0.4,
            borderColor: "#000",
            // areaColor: '#fff'
          },
          viewControl: {
            // autoRotate: true,//是否旋转
            autoRotateAfterStill: 3,
            distance: 120,
            minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
            maxAlpha: 90, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
            minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
            maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
            animation: true, // 是否开启动画。[ default: true ]
            animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
            animationEasingUpdate: "cubicInOut", // 过渡动画的缓动效果。[ default: cubicInOut ]
          },

          emphasis: {
            disabled: true, //是否可以被选中
            label: {
              //移入时的高亮文本
              show: true,
              color: "#333", //显示字体颜色变淡
              fontSize: 18, //显示字体变大
            },
            itemStyle: {
              color: "#ff7aff", //显示移入的区块变粉色
            },
          },

          shading: "lambert",
          light: {
            //光照阴影
            main: {
              // color: "#fff", //光照颜色
              intensity: 1, //光照强度
              //shadowQuality: 'high', //阴影亮度
              shadow: true, //是否显示阴影
              shadowQuality: "medium", //阴影质量 ultra //阴影亮度
              alpha: 55,
              beta: 10,
            },
            ambient: {
              intensity: 0.7,
            },
          },
        },
        series: [
          {
            name: "浙江",
            type: "scatter3D",
            coordinateSystem: "geo3D",
            symbol: "pin",
            symbolSize: 30,
            itemStyle: {
              borderWidth: 0.5,
              // borderColor: "#fff",
              borderColor: "#fff",
              // color: "rgb(100, 62, 238)",
              color: "rgb(100, 62, 238)",
            },
            data: [
              { name: "杭州", value: [120.19, 30.26] },
              { name: "宁波", value: [121.55, 29.88] },
              { name: "温州", value: [120.7, 28.01] },
            ],
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
    background: #fff;
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
