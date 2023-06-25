<template>
  <el-cascader v-model="selected" :options="options" @change="emitCityChange" clearable />
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      options: [], // 城市的选项
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // 假设你已经在 chinaout.json 里保存了你的数据
      this.$http.get("chinaout.json").then(response => {
        this.options = this.processData([response.data]);
      });
    },
    processData(data) {
      return data.map(item => ({
        value: item.adcode,
        label: item.name,
        children: item.cities ? this.processData(item.cities) : null,
      }));
    },
    emitCityChange(value) {
      this.$emit("change", value); // 当城市选择改变时，触发一个事件
    },
  },
};
</script>
