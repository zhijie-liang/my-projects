<template>
  <div style="width: 100%; height: 100%">
    <div style="width: 100%; height: 50%; display: flex">
      <div style="width: 50%; height: 100%">
        <span>{{ selectedName }}</span>
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
          />
        </div>
      </div>
      <div ref="map" id="map" style="width: 50%; height: 100%; margin: 0 auto"></div>
    </div>
    <div style="width: 100%; height: 70%; display: flex">
      <div ref="bar" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ChinaMap",
  data() {
    return {
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      totalRows: 0,
      chart: null,
      mapData: null,
      selectedName: "中华人民共和国",
      mapStack: [],
      cs: true,
    };
  },
  mounted() {
    this.getMapData().then(() => {
      this.renderMap();
    });
    this.fetchtableData();
    this.fetchData();
  },
  beforeDestroy() {
    if (this.chart != null) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    //////地图
    getMapData() {
      return axios.get("/map/dtsj3/china/100000副.json").then(res => {
        this.mapData = res.data;
      });
    },
    renderMap() {
      let chart = echarts.init(this.$refs.map);
      echarts.registerMap("chinamap", this.mapData);
      let option = {
        title: [
          {
            text: this.selectedName,
            subtext: "地区",
            left: "center",
          },
        ],
        tooltip: {
          formatter: "{b}<br/>{c}",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            myReturnMap: {
              show: true,
              title: "先取消选中再返回上级地图",
              icon: "M0 0h24v24H0z",
              onclick: () => {
                if (this.mapStack.length > 0) {
                  console.log("先取消选中再返回上级地图");
                  const lastMapState = this.mapStack.pop();
                  this.mapData = lastMapState.data;
                  this.selectedName = lastMapState.name;
                  this.renderMap();
                } else {
                  Swal.fire({
                    title: "没有上级地图了",
                    timer: 300,
                    showConfirmButton: false,
                  });
                }
              },
            },
          },
        },
        series: [
          {
            map: "chinamap",
            type: "map",
            label: {
              show: true,
              fontSize: 8,
              color: "red",
            },
            itemStyle: {
              areaColor: "#9dc49f",
              color: "transparent",
              borderWidth: "0.5",
              borderColor: "#579bd3",
            },
            data: this.mapData.features.map(item => {
              return {
                name: item.properties.name,
                value: parseInt(item.properties.adcode),
              };
            }),
          },
        ],
      };
      chart.setOption(option, true);
      chart.on("click", this.handleMapClick); // 添加点击事件处理器
      this.chart = chart;
    },
    async handleMapClick(params) {
      let selectedName = params.name;
      let adcode = params.value;
      try {
        let res = await axios.get(`/map/dtsj3/provinces/${adcode}.json`);
        let newMapData = res.data;

        if (selectedName !== this.selectedName) {
          console.log("添加");
          // 只有在进入新的地图时, m才会添加新的状态到apStack 中
          this.mapStack.push({
            data: this.mapData,
            name: this.selectedName,
          });
        } else {
          console.log("错了");
          Swal.fire({
            title: "没有下级地图了",
            timer: 300,
            showConfirmButton: false,
          });
          return;
        }
        echarts.registerMap(selectedName, newMapData);
        this.selectedName = selectedName;
        let title = [
          {
            text: this.selectedName,
            subtext: "地区",
            left: "center",
          },
        ];
        let tooltip = {
          formatter: "{b}<br/>{c}",
        };
        let toolbox = {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            myReturnMap: {
              show: true,
              title: "先取消选中再返回上级地图",
              icon: "M0 0h24v24H0z",
              onclick: () => {
                if (this.mapStack.length > 0) {
                  console.log("先取消选中再返回上级地图");
                  const lastMapState = this.mapStack.pop();
                  this.mapData = lastMapState.data;
                  this.selectedName = lastMapState.name;
                  this.renderMap();
                }
              },
            },
          },
        };
        let series = {
          map: selectedName,
          type: "map",
          label: {
            show: true,
            fontSize: 8,
            color: "red",
          },
          itemStyle: {
            areaColor: "#9dc49f",
            color: "transparent",
            borderWidth: "0.5",
            borderColor: "#579bd3",
          },
          data: newMapData.features.map(feature => ({
            name: feature.properties.name,
            value: feature.properties.adcode,
          })),
        };
        this.chart.setOption({ title, tooltip, toolbox, series }, true);
        this.mapData = newMapData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Swal.fire({
            title: "没有下级地图了",
            timer: 300,
            showConfirmButton: false,
          });
        } else {
          console.error(error);
        }
      }
      this.chart.on("click", this.handleMapClick);
    },
    ///////表格
    async fetchtableData() {
      try {
        if (this.cs === true) {
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
        } else {
          const response = await axios.get("http://localhost:4000/data");
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
        }
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
    /////////柱状图
    fetchData() {
      if (this.cs === true) {
        axios
          .get("http://localhost:3000/data")
          .then(response => {
            this.chartData = response.data;
            this.renderChart();
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        axios
          .get("http://localhost:4000/data")
          .then(response => {
            this.chartData = response.data;
            this.renderChart();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    renderChart() {
      if (!this.chartData) return;

      var myChart = echarts.init(this.$refs.bar);
      var option = {
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: this.chartData.map(item => item.name),
          axisLabel: {
            rotate: 60, // 旋转标签文本
            formatter: function (value) {
              // 自定义标签格式
              return value.substring(0, 4) + "..."; // 只显示前四个字符
            },
          },
        },
        yAxis: {
          type: "value",
          name: "（人）",
        },
        series: [
          {
            data: this.chartData.map(item => item.value),
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              normal: {
                label: {
                  // show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 10,
                  },
                },
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
