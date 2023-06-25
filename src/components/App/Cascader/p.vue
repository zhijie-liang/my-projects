<template>
  <div ref="map" style="width: 600px; height: 400px"></div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js"; // 导入中国地图

export default {
  props: {
    adcode: String,
  },
  watch: {
    adcode(newValue) {
      this.loadMap(newValue); // 当adcode改变时，加载新地图
    },
  },
  methods: {
    loadMap(adcode) {
      // 这里简化了获取和渲染地图的代码，你可能需要根据实际情况来实现
      const mapJsonUrl = `${adcode}.json`;
      this.$http.get(mapJsonUrl).then(response => {
        echarts.registerMap("city", response.data);
        const chart = echarts.init(this.$refs.map);
        chart.setOption({
          series: [
            {
              type: "map",
              map: "city",
            },
          ],
        });
      });
    },
  },
};
</script>
