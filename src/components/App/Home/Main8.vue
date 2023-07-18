<template>
  <div style="width: 100%; position: relative; overflow: hidden; padding-bottom: 44.64%">
    <div ref="map" id="map" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
import "echarts-gl"; //3D地图插件

export default {
  name: "ChinaMap",
  data() {
    return {
      chart: null,
      mapData: null,
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
        this.mapData = res.data;
      });
    },
    renderMap() {
      let chart = echarts.init(this.$refs.map);
      echarts.registerMap("chinamap", this.mapData);
      let option = {
        // series: [
        //   {
        //     map: "chinamap",
        //     type: "map",
        //     roam: true,
        //     animationDurationUpdate: 0,
        //     label: {
        //       show: true,
        //       fontSize: 15,
        //       color: "red",
        //     },
        //     itemStyle: {
        //       areaColor: "#9dc49f",
        //       color: "transparent",
        //       borderWidth: "0.5",
        //       borderColor: "#579bd3",
        //     },
        //     emphasis: {
        //       label: {
        //         show: true,
        //         fontSize: 16,
        //         color: "#fff",
        //       },
        //       itemStyle: {
        //         areaColor: "#579bd3",
        //       },
        //     },
        //     select: {
        //       itemStyle: {
        //         areaColor: "#579bd3",
        //       },
        //     },
        //     data: this.mapData.features.map(item => {
        //       return {
        //         name: item.properties.name,
        //         value: parseInt(item.properties.adcode),
        //       };
        //     }),
        //   },
        // ],
        geo3D: {
          map: "chinamap",
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
      };
      chart.setOption(option, true);
      // 添加georoam事件处理函数,同步缩放功能
      // chart.on("georoam", params => {
      //   let option = chart.getOption();
      //   if (params.zoom != null && params.zoom != undefined) {
      //     option.geo[0].zoom = option.series[0].zoom;
      //     option.geo[0].center = option.series[0].center;
      //   } else {
      //     option.geo[0].center = option.series[0].center;
      //   }
      //   chart.setOption(option, true);
      // });
    },
  },
};
</script>
