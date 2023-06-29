<template>
  <div class="content">
    <div ref="charts" style="width: 100%; height: 100%; margin: 0 auto"></div>
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
      charts: null,
      mapClicked: false,
      selectedProvince: null,
      option: {
        backgroundColor: "white",
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
    this.charts.on("click", this.onMapClick);
    window.addEventListener("click", this.onGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.onGlobalClick);
  },
  methods: {
    initCharts() {
      if (this.charts) {
        // 如果 charts 已经存在，就先 dispose
        this.charts.dispose();
      }
      this.charts = echarts.init(this.$refs["charts"]);
      this.registerMap();
      this.charts.setOption(this.option);
      this.charts.on("click", this.onMapClick);
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
      this.charts.setOption(this.option);
    },
    onGlobalClick() {
      // 如果没有点击省份，取消所有省份的高亮
      if (!this.mapClicked) {
        console.log("点击的是空白处");
        // 清空数据
        this.option.series[0].data = [];
        // 更新图表
        this.charts.setOption(this.option, true);
        // 强制更新选中状态
        this.option.series[0].selectedMode = "multiple";
        this.charts.setOption(this.option, true);
        this.option.series[0].selectedMode = "single";
        this.charts.setOption(this.option, true);
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
