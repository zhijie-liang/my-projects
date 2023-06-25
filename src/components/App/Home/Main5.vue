<template>
  <div class="content">
    <div ref="charts" style="width: 100%; height: 100%"></div>
    <div class="legend-table">
      <el-table :data="tableData" style="width: 100%" size="mini">
        <el-table-column type="index" label="排名" width="100" align="center"></el-table-column>
        <el-table-column prop="name" label="省份" width="100" align="center"></el-table-column>
        <el-table-column prop="value" label="人口数量(人)" align="center"></el-table-column>
      </el-table>
      <el-pagination
        size="mini"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40, 100]"
        :total="totalRows"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios"; // 引入 axios 库
import chinamap from "../../map/dtsj/100000副";
export default {
  data() {
    return {
      mapName: "chinamap",
      mapJson: chinamap,
      charts: null,
      option: {
        backgroundColor: "transparent",
        series: [
          {
            map: "chinamap",
            type: "map",
            zlevel: 5,
            label: {
              show: true,
              fontSize: 10,
              color: "#a3c36a",
            },
            itemStyle: {
              color: "transparent",
              borderWidth: "2",
              borderColor: "#579bd3",
              opacity: 0.8,
              shadowBlur: "100",
            },
          },
        ],
      },
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      totalRows: 0,
    };
  },
  mounted() {
    this.initCharts();
    this.fetchtableData();
  },
  methods: {
    initCharts() {
      this.charts = echarts.init(this.$refs["charts"]);
      this.registerMap();
      this.charts.setOption(this.option);
    },
    registerMap() {
      echarts.registerMap(this.mapName, this.mapJson);
    },
    async fetchtableData() {
      try {
        const response = await axios.get("http://localhost:3000/data");
        const data = response.data;
        // 根据分页信息过滤出当前页的数据
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const tableData = data.slice(start, end).map(item => ({
          name: item.name,
          value: item.value,
        }));
        // 更新表格数据和总条数等分页信息
        this.tableData = tableData;
        this.totalRows = data.length;
        // 更新图表数据和配置
        this.updateOption();
      } catch (error) {
        console.log(error);
      }
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 切换每页行数时重置当前页码
      this.fetchtableData();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.fetchtableData();
    },
    updateOption() {
      this.option.series[0].data = this.tableData;
      this.charts.setOption(this.option);
    },
  },
};
</script>
<style scoped>
.content {
  background-image: url("../../../assets/R-C.jpg");
  background-size: cover;
  height: 100%;
}
.legend-table {
  opacity: 0.5;
  position: absolute;
  right: 80px;
  bottom: -90px;
}
</style>
