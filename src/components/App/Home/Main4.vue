<template>
  <div class="content">
    <el-button @click="fullScreen" class="fullscreen-btn" style="color: #333">全屏</el-button>
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
      chart: null, // 图表实例
      mapData: null, // 地图数据
      series: [{ name: "adcode", data: [] }],
    };
  },
  mounted() {
    this.getMapData().then(() => {
      this.renderMap();
    });

    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.addEventListener("msfullscreenchange", this.handleFullscreenChange);
  },
  beforeDestroy() {
    // 在组件销毁前释放图表实例
    if (this.chart != null) {
      this.chart.dispose();
      this.chart = null;
    }

    document.removeEventListener("fullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("msfullscreenchange", this.handleFullscreenChange);
  },
  methods: {
    handleFullscreenChange() {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // 退出全屏时恢复原始尺寸
        const elem = this.$refs.map;
        elem.style.width = "100%";
        elem.style.height = "100%";
        this.chart.resize();
      }
    },
    fullScreen() {
      const elem = this.$refs.map;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }

      if (this.chart) {
        elem.style.width = window.innerWidth + "px";
        elem.style.height = window.innerHeight + 161 + "px";
        this.chart.resize();
      }
    },
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
        // visualMap: {
        //   type: "piecewise",
        //   pieces: [
        //     { min: 100000000, label: ">100000000", color: "#9dc49f" },
        //     { min: 10000000, max: 99999999, label: "10000000-99999999", color: "#a8caa9" },
        //     { min: 1000000, max: 9999999, label: "1000000-9999999", color: "#b3d1b4" },
        //     { max: 999999, label: "<1000000", color: "#bed7bf" },
        //   ],
        //   orient: "vertical",
        //   left: "20",
        //   top: "400",
        // },
        backgroundColor: "white",
        tooltip: {
          formatter: "{b}<br/>{c}",
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
            dataView: {},
            dataZoom: {},
            magicType: {
              // type: ["line", "bar", "stack"],
            },
            brush: {},
          },
        },
        aria: {
        // 下面几行可以不写，因为 label.enabled 默认 true
        label: {
            enabled: true
        },
        enabled: true
    },
        series: [
          {
            name: "adcode",
            map: "chinamap",
            type: "map",
            // colorBy : "series",

            // selectedMode: "multiple",
            roam: true,
            //         projection: {
            //     project: (point) => [point[0] / 180 * Math.PI, -Math.log(Math.tan((Math.PI / 2 + point[1] / 180 * Math.PI) / 2))],
            //     unproject: (point) => [point[0] * 180 / Math.PI, 2 * 180 / Math.PI * Math.atan(Math.exp(point[1])) - 90]
            // },
            // color: "#9dc49f",
            animationDurationUpdate: 0,
            // geoIndex: 0,
            label: {
              show: true,
              fontSize: 10,
              color: "red",
            },
            itemStyle: {
              areaColor: "#9dc49f",
              color: "transparent",
              borderWidth: "0.5",
              borderColor: "#579bd3",
            },
            emphasis: {
              // disabled: true,
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
              disabled: true,
              itemStyle: {
                areaColor: "#579bd3",
              },
            },
            // labelLine: { show: true, showAbove: top },
            // layoutSize: 100,
            data: this.mapData.features.map(item => {
              return {
                name: item.properties.name,
                value: parseInt(item.properties.adcode),
              };
            }),
          },
        ],
        geo: [
          {
            map: "chinamap",
            // roam: true,
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
      };
      chart.setOption(option);
      chart.on("click", this.handleMapClick); // 添加点击事件处理器

      // 添加georoam事件处理函数,同步缩放功能
      chart.on("georoam", params => {
        let option = chart.getOption();

        if (params.zoom != null && params.zoom != undefined) {
          option.geo[0].zoom = option.series[0].zoom;
          option.geo[0].center = option.series[0].center;
        } else {
          option.geo[0].center = option.series[0].center;
        }

        chart.setOption(option);
      });

      this.chart = chart;

      chart.setOption(option);
      chart.on("click", this.handleMapClick);
      chart.on("restore", this.handleRestore);
    },
    async handleMapClick(params) {
      // 处理地图点击事件
      // 加载数据期间禁用地图
      this.chart.off("click");
      let selectedName = params.name;
      let adcode = params.value;
      try {
        let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);
        let newMapData = res.data;
        echarts.registerMap(selectedName, newMapData);
        let series = {
          type: "map",
          map: selectedName,
          data: newMapData.features.map(feature => ({
            name: feature.properties.name,
            value: feature.properties.adcode,
          })),
        };

        let geo = {
          map: selectedName,
        };

        this.chart.setOption({ series, geo }); // 更新series和geo
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("没有下级地图了");
        } else {
          console.error(error);
        }
      }

      // 加载数据后重新启用地图
      this.chart.on("click", this.handleMapClick);
    },
  },
};
</script>

<style scoped>
.content {
  /* background-image: url("../../../assets/R-C.jpg"); */
  background-size: cover;
  background-position: center;
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
