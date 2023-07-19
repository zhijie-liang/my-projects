<template>
  <div>
    <el-select v-model="selectedValue" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div class="table" style="width: 100%; height: 50%; border: 1px solid #ebeef5">
      <el-table
        :data="tableData"
        style="width: 100%"
        size="mini"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column type="index" label="排名" width="200"></el-table-column>
        <el-table-column prop="sf" label="省份" width="200"></el-table-column>
        <el-table-column prop="rks" label="人口数" width="220"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "demo",
  data() {
    return {
      selectedValue: '1',
      options: [
        {
          value: '1',
          label: '简称'
        },
        {
          value: '2',
          label: '全称'
        }
      ],
      tableData: []
    };
  },
  watch: {
    selectedValue: {
      immediate: true,
      handler(newValue) {
        let url;
        if (newValue === '1') {
          url = 'http://localhost:3000/data';
        } else if (newValue === '2') {
          url = 'http://localhost:4000/data';
        }

        if (url) {
          axios.get(url)
            .then(response => {
              this.tableData = response.data.map(item => {
                return {
                  sf: item.name,
                  rks: item.value,
                };
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  }
};
</script>

<style scoped></style>
