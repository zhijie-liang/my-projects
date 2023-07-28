<template>
<div>
  <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form>
      <div class="item-top">
        <el-form-item label="新闻来源:">
          <span style="">asdxgh</span>
        </el-form-item>
        <el-form-item label="新闻来源:">
          <span style="">asdxgh</span>
        </el-form-item>
        <!-- 其他 el-form-item 和 span 元素 -->
      </div>
    </el-form>
  </el-dialog>
</div>


</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
