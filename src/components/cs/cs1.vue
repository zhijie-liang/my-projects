<template>
  <div class="content">
    <draggable :list="tableList" draggable=".el-table__row">
      <el-table :data="tableData">
        <el-table-column prop="name" label="省份"></el-table-column>
        <el-table-column prop="value" label="人口数量(人)"></el-table-column>
      </el-table>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import axios from "axios";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      tableData: [],
      tableList: [],
    };
  },
  mounted() {
    this.fetchtableData();
  },
  methods: {
    async fetchtableData() {
      try {
        const response = await axios.get("http://localhost:3000/data");
        const data = response.data;
        this.tableData = data.map(item => ({
          name: item.name,
          value: item.value,
        }));
        this.tableList = [...this.tableData]; // 初始化列表顺序
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.content {
  /* background-image: url("../../../assets/R-C.jpg"); */
  background-size: cover;
  height: 100%;
}
.el-table__row.is-dragging {
  background-color: #e6f7ff; /* 被拖拽元素的背景色 */
}
</style>
