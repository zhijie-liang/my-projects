<template>
  <div class="content">
    <el-button @click="fullScreen" class="fullscreen-btn" style="color: #333">全屏</el-button>
    <el-button @click="changeBG" class="changeBG-btn" style="color: #333">
      {{ cbc ? "透明" : "白色" }}
    </el-button>

    <el-color-picker v-model="color"></el-color-picker>

    <el-button @click="changePN" class="changePN-btn" style="color: #333">
      {{ showMapLabel ? "取消" : "恢复" }}
    </el-button>
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
    changePN() {
      this.showMapLabel = !this.showMapLabel;
      let option = {
        series: [
          {
            label: {
              normal: {
                show: this.showMapLabel,
              },
            },
          },
        ],
      };
      this.chart.setOption(option);
    },
    changeBG() {
      this.cbc = !this.cbc;
      if (this.chart) {
        let option = this.chart.getOption();
        option.backgroundColor = option.backgroundColor === "white" ? "transparent" : "white";
        this.chart.setOption(option);
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
        backgroundColor: "white",
        tooltip: {
          formatter: "{b}<br/>{c}",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            restore: {},
            saveAsImage: {},
            // saveAsImage: {},
          },
        },
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
            data: this.mapData.features.map(item => {
              return {
                name: item.properties.name,
                value: parseInt(item.properties.adcode),
              };
            }),
          },
        ],
      };
      chart.setOption(option);
      chart.on("click", this.handleMapClick); // 添加点击事件处理器

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

        this.chart.setOption({ series });
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
.fullscreen-btn {
  top: 20px;
  right: 20px;
  background-color: #ccc;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.changePN-btn {
  top: 20px;
  right: 20px;
  background-color: #ccc;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.changeBG-btn {
  top: 20px;
  right: 20px;
  background-color: #ccc;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
