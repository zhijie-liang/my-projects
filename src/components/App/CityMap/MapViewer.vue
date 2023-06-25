<template>
  <div class="map-viewer-wrapper">
    <div class="map-container" ref="mapContainer"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapViewer",
  data() {
    return {
      map: null,
      geojsonLayer: null,
    };
  },
  mounted() {
    // 初始化地图
    this.map = L.map(this.$refs.mapContainer).setView([39.9, 116.3], 10);
    L.tileLayer(
      "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      {}
    ).addTo(this.map);
  },
  methods: {
    // 加载geojson数据并渲染到地图上
    loadGeojsonData(adcode) {
      const url = `/static/${adcode}.json`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (this.geojsonLayer) {
            this.geojsonLayer.removeFrom(this.map);
          }
          this.geojsonLayer = L.geoJSON(data).addTo(this.map);
        })
        .catch((error) => {
          console.error("加载GeoJSON数据出错：", error);
        });
    },
  },
  watch: {
    // 监听选中的行政区划信息，并根据所选地点加载对应的geojson数据
    selectedRegion(value) {
      if (value && value.length === 2) {
        const adcode = value[1];
        this.loadGeojsonData(adcode);
      }
    },
  },
  props: {
    selectedRegion: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.map-viewer-wrapper {
  height: 100%;
  width: 100%;
}
.map-container {
  height: 100%;
}
</style>
