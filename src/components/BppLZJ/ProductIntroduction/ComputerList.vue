<template>
  <div style="">
    <el-table :data="tableData" style="background-color: #0e2975">
      <el-table-column type="index" label="" width="50" align="center"></el-table-column>
      <el-table-column prop="region" label="地区" width="70" align="center"></el-table-column>
      <el-table-column prop="computersnum" label="地区" width="70" align="center"></el-table-column>
      <el-table-column prop="tag" label="估值（亿元）" width="120" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   tag: "家",
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1517 弄",
        //   tag: "公司",
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1519 弄",
        //   tag: "家",
        // },
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄",
        //   tag: "公司",
        // },
      ],
    };
  },
  methods: {},
};
</script>

<style></style>
