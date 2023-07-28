<template>
  <div>
    <div class="item-top">
      <el-form-item label="新闻来源:">
        <span style="">{{ searchList.ch }}</span>
      </el-form-item>
      <el-form-item label="作者:">
        <span>{{ searchList.author }}</span>
      </el-form-item>
      <el-form-item label="板块名称:">
        <span>{{ searchList.bn }}</span>
      </el-form-item>
      <el-form-item label="网站名称:">
        <span>{{ searchList.sn }}</span>
      </el-form-item>
      <el-form-item label="评论数:">
        <span>{{ searchList.ncmms }}</span>
      </el-form-item>
      <el-form-item label="倾向性:">
        <span>{{ searchList.sentg == "中立" || searchList.sentg == "正面" ? "非负面" : "负面" }}</span>
      </el-form-item>
      <el-form-item label="发布时间:">
        <span>{{ searchList.pt }}</span>
      </el-form-item>
      <el-form-item label="关键字:">
        <span>{{ searchList.k }}</span>
      </el-form-item>
      <el-form-item label="企业名称:" style="width: 100%">
        <span
          class="entName"
          style="
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden !important;
            text-overflow: inherit !important;
            white-space: inherit !important;
          "
          :title="searchList.rtags"
        >
          {{ searchList.rtags }}
        </span>
      </el-form-item>
      <el-form-item label="原文链接:" style="width: 95%" class="url_hidden">
        <!-- <span>{{searchList.url}}</span> -->
        <a :href="searchList.url" target="_blank">{{ searchList.url }}</a>
      </el-form-item>
    </div>
  </div>
</template>

<script>

</script>

<style scoped></style>
