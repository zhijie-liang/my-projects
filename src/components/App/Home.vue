<template>
  <div class="container">
    <!-- <h1>欢迎来到我们的网站</h1>
    <p>这里是你想要的最新最全面的信息。我们致力于提供最专业、最优质的服务。</p> -->
    <el-container>
      <el-aside style="width: 220px; height: 100vh; border-right: 1px solid #b3c0d1">
        <Aside style="margin-top: 30px"></Aside>
      </el-aside>
      <el-container style="height: 100vh">
        <el-header style="height: 180px; border-bottom: 1px solid #b3c0d1"><Header></Header></el-header>
        <el-main style="">
          <!-- <Main></Main> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Home/Aside.vue";
import Header from "./Home/Header.vue";
// import Main from "./Home/Main.vue";
export default {
  components: {
    Aside,
    Header,
    // Main,
  },
};
</script>

<style></style>
