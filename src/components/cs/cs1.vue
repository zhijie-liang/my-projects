<template>
  <div>
    <el-button @click="exportData">导出数据</el-button>
  </div>
</template>

<script>
export default {
  name: "demo",
  methods: {
    exportData() {
      // var str = "Hello World";
      // var arr = str.toLowerCase().split(/ /i); // 使用正则表达式/i设置不区分大小写
      // console.log(arr); // ["hello", "world"]
      var str = "Hello where World WHERE hello Where xiaoxin";
      var arr = str.split(/where/i); // 使用正则表达式/i设置不区分大小写
      console.log(arr);
    },
  },
};
</script>

<style scoped></style>
var str = "Hello where World WHERE hello Where xiaoxin"; var arr = str.split(/where/i); //
使用正则表达式/i设置不区分大小写 console.log(arr);
