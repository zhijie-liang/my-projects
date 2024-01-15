<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="24">
        <h1>DPM {{ id }}的数据详情</h1>
        <span>各探头的温度数据：{{ dpm }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!-- <el-col :span="24" v-for="(probe, index) in probes" :key="index">  -->
      <el-col :span="24">
        <!-- 图表展示 -->
        <div v-for="(chart, index) in chartsArrays" :key="index">
          <div ref="charts" :id="'chart' + index" style="width: 100%; height: 400px"></div>
        </div>
        <!-- <div  ref="charts[index]" :id="'chart' + index" style="width: 600px;height:400px;">            </div>  -->
        <!-- 使用ref属性绑定图表元素 -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  // props: ["id", "dpm"],
  data() {
    return {
      probes: [1, 2, 3, 4, 5, 6, 7, 8, 9], // 九个探头的id
      id: this.$route.params.id, // 获取路由参数中的id
      dpm: [], // 存储dpm数据
      charts: [], // 存放九个图表的实例
      chartsArrays: Array(9).fill(null),
      options: [], // 存放九个图表的配置项
    };
  },
  mounted() {
    this.drawChart();
    this.initCharts(); // 初始化图表
    this.updateCharts(); // 定时更新图表
  },
  created() {
    this.initWebSocket(); // 初始化websocket连接
  },
  methods: {
    initWebSocket() {
      this.global.ws.onmessage = res => {
        try {
          console.log("详情页面websocket开始~！");
          let data = JSON.parse(res.data);
          if (data.dpmid === this.id) {
            // 如果数据的dpmId与当前页面的id相同
            this.dpm = Object.values(data.temp); // 更新dpm数据
          }
          // 根据数据的dpmId，更新dpms对象的属性和值
          // console.log("DPM的ID：" +data.dpmid)
          // console.log("DPM的温度数据：" +data.temp);
          // this.$set(this.dpms, data.dpmid, Object.values(data.temp));
          // console.log("当前的dpms数组内容：" + JSON.stringify(this.dpms));
        } catch (error) {
          // 如果解析失败，说明数据不是JSON格式的，直接忽略或者做其他处理
          console.log("数据不是JSON格式的，无法解析");
        }
      };
    },
    drawChart() {
      this.chartsArrays.forEach((chart, index) => {
        const dom = document.getElementById("chart" + index);
        if (dom) {
          const myChart = echarts.init(dom);
          const option = {
            title: { text: "探头" + index },
            tooltip: {},
            xAxis: {}, // 这里填充时间数据
            yAxis: {
              name: "温度数据", // 在Y轴上标识为温度数据
              min: 0, // 设置Y轴的最小值
              max: 100, // 设置Y轴的最大值
            },
            series: [
              {
                name: "温度",
                type: "line",
                smooth: true, // 设置为曲线图
                lineStyle: {
                  // 修改曲线的颜色为红色
                  color: "red",
                  opacity: 0.8, // 曲线透明度为70%
                  width: 5, // 曲线宽度为2像素
                },

                data: [], // 这里填充温度数据
              },
            ],
          };
          myChart.setOption(option);
        }
      });
    },
    initCharts() {
      console.log("初始化开始");
      // 初始化图表，创建九个图表实例，设置基本的配置项
      for (let i = 0; i < 9; i++) {
        console.log("for循环绘图开始");
        let chart = echarts.init(this.$refs.charts[i]); // 使用$refs属性获取图表元素
        if (chart) {
          // 成功获取到图表元素
          console.log("获取DOM成功！");
        } else {
          // 获取图表元素失败
          console.log("获取DOM失败！");
        }
        let option = {
          title: {
            text: "探头" + (i + 1),
            left: "center",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: { type: "time", splitLine: { show: true } },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"], //坐标轴两端留白设置
            splitLine: { show: true },
          },
          series: [
            {
              name: "温度",
              type: "line",
              showSymbol: false,
              hoverAnimation: false,
              data: [],
              lineStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#ff0000" },
                  { offset: 1, color: "#ffffff" },
                ]), // 设置渐变的淡红色
              },
            },
          ],
        };
        chart.setOption(option); // 设置图表配置项
        this.charts.push(chart); // 将图表实例添加到数组中
        this.options.push(option); // 将图表配置项添加到数组中
      }
    },
    updateCharts() {
      console.log("更新图开始！");
      // 定时更新图表，每秒更新四次，每次更新一个探头的数据
      let index = 0;
      setInterval(() => {
        let now = new Date(); // 获取当前时间
        // console.log(index +'当前的dpm为：'  + this.dpm);
        let value = this.dpm[index]; // 获取对应探头的温度值
        let data = this.options[index].series[0].data; // 获取对应图表的数据数组
        data.push({ name: now.toString(), value: [now, value] }); // 将当前时间和温度值添加到数据数组中
        if (data.length > 10) {
          data.shift(); // 如果数据数组长度超过60，删除第一个元素，保持最多显示15秒的数据
        }
        this.charts[index].setOption(this.options[index]); // 更新对应图表的配置项
        index = (index + 1) % 9;
      }, 250);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 20px;
}
.chart {
  height: 300px;
}
</style>
