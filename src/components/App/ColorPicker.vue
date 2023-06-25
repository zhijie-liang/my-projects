<template>
  <div class="content">
    <el-button @click="changeBG">change</el-button>
    <div ref="map" style="width: 100%; height: 600px; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import axios from "axios";

export default {
  name: "ChinaMap",
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.getMapData().then(() => {
      this.renderMap();
    });
  },
  methods: {
    changeBG() {
      if (this.chart) {
        let option = this.chart.getOption();
        option.backgroundColor = option.backgroundColor === "white" ? "yellowgreen" : "white";
        this.chart.setOption(option);
      }
    },

    // 获取地图数据
    getMapData() {
      return axios.get("/map/dtsj3/china/100000副.json").then(res => {
        this.mapData = res.data;

        // 检查所有省份的 adcode 是否都已正确获取
        let featrues = this.mapData.features;
        let errorProvince = featrues.find(f => isNaN(parseInt(f.properties.adcode)));
        if (errorProvince) {
          alert(`地图数据 ${errorProvince.properties.name} 加载失败，请检查数据文件是否存在！`);
          return Promise.reject();
        }
        return Promise.resolve();
      });
    },
    // 渲染地图
    renderMap() {
      let chart = echarts.init(this.$refs.map);

      // 注册地图
      echarts.registerMap("china", this.mapData);

      let option = {
        backgroundColor: "white",
        tooltip: {
          trigger: "item",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            type: "map3D",
            map: "china",
            roam: true, // 开启用户缩放和平移
            boxHeight: 10, // 立体地图的高度（相对于地图区域宽度的比例）
            viewControl: {
              // 定义鼠标的旋转和缩放行为
              alpha: 20, // 初始视角的垂直角度
              beta: -30, // 初始视角的水平角度
              distance: 100, // 初始视角的距离
            },
            label: {
              show: true,
              color: "#333",
            },
            itemStyle: {
              //鼠标没有移上去的样式
              normal: {
                borderWidth: 1.5,
                borderColor: "#ccc",
                areaColor: "#f7f7f7",
              },
              //鼠标移上去的样式
              emphasis: {
                borderWidth: 0.5,
                borderColor: "#ccc",
                areaColor: "#f7f7f7",
              },
            },
            // 点击省份时下钻到该省份地图
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

      // 点击事件：下钻到下一级地图
      chart.on("click", async params => {
        let selectedName = params.name;
        let adcode = params.value;

        try {
          let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);

          // 使用异步加载的地图数据注册地图
          let newMapData = res.data;
          echarts.registerMap(selectedName, newMapData);
          // 切换到新的地图
          let series = {
            tooltip: {
              trigger: "item",
            },
            toolbox: {
              show: true,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                restore: {},
                saveAsImage: {},
              },
            },
            type: "map3D",
            map: selectedName,
            roam: true,
            label: { show: true, color: "#333" },
            itemStyle: {
              normal: {
                //鼠标没有移上去的样式
                borderWidth: 1.5,
                borderColor: "#ccc",
                areaColor: "#f7f7f7",
              },
              emphasis: {
                //鼠标移上去的样式
                borderWidth: 0.5,
                borderColor: "#ccc",
                areaColor: "#f7f7f7",
              },
            },
            viewControl: {
              // 定义鼠标的旋转和缩放行为
              alpha: 20, // 初始视角的垂直角度
              beta: -30, // 初始视角的水平角度
              distance: 100, // 初始视角的距离
            },
            shading: "lambert",
            data: newMapData.features.map(feature => ({
              name: feature.properties.name,
              value: feature.properties.adcode,
            })),
          };

          chart.clear(); // 首先清理掉原来的数据
          chart.setOption({ series }); // 更新 echarts 实例的 series 数据，完成下钻操作
        } catch (error) {
          if (error.response && error.response.status === 404) {
            alert("没有下级地图了");
          } else {
            // 处理其他错误
            console.error(error);
          }
        }
      });
      this.chart = chart;
    },
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
  height: 100%;
}
</style>
