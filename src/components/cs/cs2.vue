<template>
  <div>
    <div class="table" style="width: 100%; height: 50%; border: 1px solid #ebeef5">
      <el-button @click="exportData">导出数据</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
        size="mini"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column prop="RANK" label="排名" width="50" align="center"></el-table-column>
        <el-table-column prop="ID" label="ID" width="70" align="center"></el-table-column>
        <el-table-column prop="NAME" label="公司名" width="120" align="center"></el-table-column>
        <el-table-column prop="FOUNDERS" label="创始人" width="150" align="center"></el-table-column>
        <el-table-column prop="HLW_CATE_NAME" label="类别" width="80" align="center"></el-table-column>
        <el-table-column prop="RANK_CHANGE" label="公司排名变化" width="100" align="center"></el-table-column>
        <el-table-column prop="YEAR" label="年份" width="50" align="center"></el-table-column>
        <el-table-column prop="COUNTRY" label="国家" width="50" align="center"></el-table-column>
        <el-table-column prop="INVERSTORS" label="投资人" width="300" align="center"></el-table-column>
        <el-table-column prop="VALUATION" label="市值" width="80" align="center"></el-table-column>
        <el-table-column prop="QUIT_REASON" label="退出原因" width="80" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { saveAs } from "file-saver";

export default {
  name: "demo",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    exportData() {
      let csvContent =
        "序号,ID,公司名,创始人,类别,公司排名变化,年份,国家,投资人,市值,退出原因\n" +
        this.tableData
          .map(
            (item, index) =>
              `${index + 1},"${item.ID}","${item.NAME}","${item.FOUNDERS}","${item.HLW_CATE_NAME}","${
                item.RANK_CHANGE
              }","${item.YEAR}","${item.COUNTRY}","${item.INVERSTORS}","${item.VALUATION}","${item.QUIT_REASON}"`
          )
          .join("\n");
      let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "data.csv");
    },
  },
  created() {
    axios
      .get("http://localhost:5000/api/companies")
      .then(response => {
        this.tableData = response.data.result.list.map(item => {
          return {
            ID: item.ID,
            HLW_CATE_NAME: item.HLW_CATE_NAME,
            RANK_CHANGE: item.RANK_CHANGE,
            FOUNDERS: item.FOUNDERS,
            YEAR: item.YEAR,
            COUNTRY: item.COUNTRY,
            INVERSTORS: item.INVERSTORS,
            RANK: item.RANK,
            QUIT_REASON: item.QUIT_REASON,
            VALUATION: item.VALUATION,
            NAME: item.NAME,
          };
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
