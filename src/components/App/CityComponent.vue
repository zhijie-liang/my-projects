<template>
  <div class="city-selector-wrapper">
    <label class="selector-label">{{ label }}</label>
    <CityComponent @select-city="handleSelectCity"></CityComponent>
  </div>
</template>

<script>
import CityComponent from "@/components/App/CityComponent/City.vue";

export default {
  name: "CitySelector",
  components: {
    CityComponent,
  },
  props: {
    label: {
      type: String,
      default: "城市：",
    },
  },
  methods: {
    handleSelectCity(city) {
      console.log("用户选择的城市信息：", city);
      // 可以在这里处理用户选择的城市信息
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
