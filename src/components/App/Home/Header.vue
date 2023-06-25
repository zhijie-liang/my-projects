<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between">
      <div
        style="
          display: flex;
          width: 35%;
          align-items: center;
          background-color: #fff;
          border-radius: 30px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          padding: 10px;
          margin-top: 20px;
          margin-left: 60px;
        "
      >
        <input
          type="text"
          placeholder="搜索..."
          style="flex: 1; border: none; outline: none; font-size: 16px; border-radius: 30px; padding: 10px 20px"
        />
        <button
          style="
            background-color: #b3c0d1;
            color: #fff;
            border: none;
            cursor: pointer;
            margin-left: 10px;
            padding: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          "
        >
          <i class="el-icon-search" style="font-size: 18px; line-height: 40px; margin-left: 1px"></i>
        </button>
      </div>
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        style="margin-right: 20px"
      ></el-avatar>
    </div>
    <div style="margin-top: 40px; margin-left: -15px; display: flex; align-items: center">
      <router-link v-for="item in buttonList" :key="item.name" :to="item.router">
        <el-button
          style="
            margin-left: 10px;
            height: 30px;
            font-size: 10px;
            border-radius: 10px;
            border: none;
            background-color: aliceblue;
          "
        >
          {{ item.name }}
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonList: [
        { name: "Main", router: "/Home/Main" },
        { name: "Main2", router: "/Home/Main2" },
        { name: "Main3", router: "/Home/Main3" },
        { name: "Main4", router: "/Home/Main4" },
        { name: "Main5", router: "/Home/Main5" },
        { name: "Main6", router: "/Home/Main6" },
        { name: "Main7", router: "/Home/Main7" },
        { name: "Main8", router: "/Home/Main8" },
        { name: "Main9", router: "/Home/Main9" },
        { name: "Main10", router: "/Home/Main10" },
      ],
    };
  },
};
</script>

<style></style>
