<template>
  <div class="content" style="height: 100%">
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
    };
  },
  mounted() {
    this.getMapData().then(() => {
      this.renderMap();
    });
  },
  beforeDestroy() {
    // 在组件销毁前释放图表实例
    if (this.chart != null) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
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
          feature: {
            restore: {},
          },
        },
        series: [
          {
            map: "chinamap",
            type: "map",
            // roam: true,
            animationDurationUpdate: 0,
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

        this.chart.setOption({ series }); // 更新series
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("没有下级地图了");
        } else {
          console.error(error);
        }
      }
      this.chart.on("click", this.handleMapClick);
    },
  },
};
</script>

<style scoped></style>
