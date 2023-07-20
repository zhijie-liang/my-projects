<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index)" type="text">编辑</el-button>
          <el-button @click="handleDelete(scope.$index)" type="text" class="red-text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SimpleTable",
  data() {
    return {
      tableData: [
        { name: "张三", age: 20, gender: "男" },
        { name: "李四", age: 25, gender: "女" },
        { name: "王五", age: 30, gender: "男" },
        { name: "赵六", age: 28, gender: "女" },
      ],
    };
  },
  methods: {
    handleEdit(index) {
      // 处理编辑逻辑
      console.log("点击了编辑按钮，索引：" + index);
    },
    handleDelete(index) {
      // 处理删除逻辑
      console.log("点击了删除按钮，索引：" + index);
    },
  },
};
</script>

<style scoped>
.red-text {
  color: red;
}
</style>
