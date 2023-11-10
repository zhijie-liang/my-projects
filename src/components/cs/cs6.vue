<template>
  <div class="chart-container">
    <div class="chart-header">
      <span class="chart-title">营业收入及利润</span>
      <div class="chart-controls">
        <select v-model="selectedYear">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
        <select v-model="selectedType">
          <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
        <button @click="closeChart">X</button>
      </div>
    </div>
    <div class="chart">
      <!-- 这里可以使用如Chart.js或者ECharts等图表库来渲染图表 -->
      <!-- 示例中的图表只是一个静态的占位符 -->
      <div class="chart-placeholder">图表占位符</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalesChart",
  data() {
    return {
      selectedYear: 2020,
      selectedType: "全部",
      years: [2020, 2019, 2018],
      types: ["全部", "类型1", "类型2"],
    };
  },
  methods: {
    closeChart() {
      // 这里可以定义关闭图表的逻辑
      console.log("图表已关闭");
    },
  },
};
</script>

<style scoped>
.chart-container {
  font-family: "Arial", sans-serif;
  width: 100%;
  max-width: 600px;
  margin: auto;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
}
.chart-title {
  font-size: 18px;
  font-weight: bold;
}
.chart-controls {
  display: flex;
  align-items: center;
}
.chart-controls select {
  margin: 0 5px;
}
.chart-placeholder {
  height: 300px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
