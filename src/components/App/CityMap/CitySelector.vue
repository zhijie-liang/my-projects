<template>
  <div class="city-selector-wrapper">
    <!-- <label class="selector-label">城市：</label> -->
    <CityComponent @select-region="handleSelectRegion"></CityComponent>
  </div>
</template>

<script>
import CityComponent from "@/components/App/CityComponent.vue";

export default {
  name: "CitySelector",
  components: {
    CityComponent,
  },
  methods: {
    handleSelectRegion(region) {
      console.log("用户选择的行政区划信息：", region);
      // 触发父组件传递下来的事件，传递用户选择的行政区划信息
      this.$emit("select-region", region);
    },
  },
};
</script>

<style scoped>
.selector-label {
  display: inline-block;
  width: 80px;
  text-align: right;
  margin-right: 8px;
  font-weight: bold;
}
</style>
