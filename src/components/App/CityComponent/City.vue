<template>
  <div class="province-selector">
    <el-cascader
      :options="provinceOptions"
      v-model="selectedRegions"
      @change="handleRegionChange"
      clearable
      placeholder="请选择地区"
      size="medium"
    ></el-cascader>
  </div>
</template>

<script>
import { Cascader } from "element-ui";
import provinceData from "@/components/map/json/chinaout.json";

export default {
  name: "regionComponent",
  components: {
    "el-cascader": Cascader,
  },
  data() {
    return {
      selectedRegions: [],
      provinceOptions: getProvinceOptions(provinceData),
    };
  },
  methods: {
    handleRegionChange(value) {
      this.selectedRegions = value;
      // 触发父组件传递下来的事件，传递用户选择的城市信息
      this.$emit("select-region", this.selectedRegions);
    },
  },
};

function getProvinceOptions(data) {
  return [
    {
      value: data.adcode,
      label: data.name,
      children: data.provinces.map((province) => ({
        value: province.adcode,
        label: province.name,
        children: getCityOptions(province.cities),
      })),
    },
  ];
}

function getCityOptions(cities) {
  if (!cities || cities.length === 0) {
    return [];
  }
  return cities.map((city) => ({
    value: city.adcode,
    label: city.name,
    children: getDistrictOptions(city.districts),
  }));
}

function getDistrictOptions(districts) {
  if (!districts || districts.length === 0) {
    return [];
  }
  return districts.map((district) => ({
    value: district.adcode,
    label: district.name,
  }));
}
</script>

<style scoped>
.province-selector {
  width: 300px;
}
</style>
