<template>
  <div>
    <s-cascader @change="handleCityChange" />
    <!-- 当城市选择改变时，调用handleCityChange方法 -->
    <p-cascader :adcode="adcode" />
    <!-- 根据当前adcode渲染地图 -->
  </div>
</template>


<script>
import SCascader from "./Cascader/s.vue";
import PCascader from "./Cascader/p.vue";

export default {
  components: { 
    's-cascader': SCascader, 
    'p-cascader': PCascader
  },
  data() {
    return {
      adcode: "", // 当前选择的城市的adcode
    };
  },
  methods: {
    handleCityChange(adcode) {
      this.adcode = adcode; // 更新adcode
    },
  },
};
</script>

