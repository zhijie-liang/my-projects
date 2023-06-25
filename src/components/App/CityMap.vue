<template>
  <div class="home-container">
    <CitySelector @select-region="handleSelectRegion"></CitySelector>
    <MapViewer :selected-region="selectedRegion"></MapViewer>
  </div>
</template>

<script>
import CitySelector from "@/components/App/CityMap/CitySelector.vue";
import MapViewer from "@/components/App/CityMap/MapViewer.vue";

export default {
  name: "Home",
  components: {
    CitySelector,
    MapViewer,
  },
  data() {
    return {
      selectedRegion: [],
    };
  },
  methods: {
    handleSelectRegion(region) {
      console.log("用户选择的行政区划信息：", region);
      this.selectedRegion = region;
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100%;
}
</style>
