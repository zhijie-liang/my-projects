<template>
  <div class="content">
    <div ref="map" id="map" style="width: 100%; height: 100%; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import chinamap from "../../map/dtsj/100000副";

export default {
  data() {
    return {
      mapName: "chinamap",
      mapJson: chinamap,
      map: null,
      mapClicked: false,
      selectedProvince: null,
      option: {
        backgroundColor: "white",
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
            myFull: {
              show: true,
              title: "全屏查看",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: () => {
                this.fullFlag = true;
                let element = document.getElementById("map");
                // 一些浏览器的兼容性
                if (element.requestFullScreen) {
                  // HTML W3C 提议
                  element.requestFullScreen();
                } else if (element.msRequestFullscreen) {
                  // IE11
                  element.msRequestFullScreen();
                } else if (element.webkitRequestFullScreen) {
                  // Webkit (works in Safari5.1 and Chrome 15)
                  element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                  // Firefox (works in nightly)
                  element.mozRequestFullScreen();
                }
                if (this.map) {
                  element.style.width = window.innerWidth + "px";
                  element.style.height = window.innerHeight + 161 + "px";
                  this.map.resize();
                }
                // 退出全屏
                if (element.requestFullScreen) {
                  document.exitFullscreen();
                } else if (element.msRequestFullScreen) {
                  document.msExitFullscreen();
                } else if (element.webkitRequestFullScreen) {
                  document.webkitCancelFullScreen();
                } else if (element.mozRequestFullScreen) {
                  document.mozCancelFullScreen();
                }
              },
            },
          },
        },
        series: [
          {
            type: "map",
            map: "chinamap",
            selectedMode: "single",
            label: {
              show: true,
              emphasis: {
                show: true,
              },
            },
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    this.initCharts();
    this.map.on("click", this.onMapClick);
    window.addEventListener("click", this.onGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.onGlobalClick);
  },
  methods: {
    initCharts() {
      if (this.map) {
        // 如果 map 已经存在，就先 dispose
        this.map.dispose();
      }
      this.map = echarts.init(this.$refs["map"]);
      this.registerMap();
      this.map.setOption(this.option);
      this.map.on("click", this.onMapClick);
    },
    registerMap() {
      echarts.registerMap(this.mapName, this.mapJson);
    },
    onMapClick(e) {
      // 点击的是省份
      this.mapClicked = true;

      if (this.selectedProvince === e.name) {
        // 如果点击的省份已经是高亮的，取消高亮
        this.selectedProvince = null;
        this.option.series[0].data = this.option.series[0].data.filter(item => item.name !== e.name);
      } else {
        // 如果点击的省份不是已经高亮的，设置为高亮
        this.selectedProvince = e.name;
        this.option.series[0].data = [{ name: e.name, selected: true }];
      }

      console.log("点击的是省份：" + e.name);
      this.map.setOption(this.option);
    },
    onGlobalClick() {
      // 如果没有点击省份，取消所有省份的高亮
      if (!this.mapClicked) {
        console.log("点击的是空白处");
        // 清空数据
        this.option.series[0].data = [];
        // 更新图表
        this.map.setOption(this.option, true);
        // 强制更新选中状态
        this.option.series[0].selectedMode = "multiple";
        this.map.setOption(this.option, true);
        this.option.series[0].selectedMode = "single";
        this.map.setOption(this.option, true);
      }
      this.mapClicked = false;
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}
</style>
