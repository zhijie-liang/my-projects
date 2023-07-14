<template>
  <div style="background-color: white">
    <!-- 顶部导航栏 -->
    <nav
      style="
        padding: 1rem;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1;
      "
    >
      <div style="display: flex; justify-content: space-between; align-items: center">
        <!-- <a href="/" style="font-size: 2rem; font-weight: bold; color: #333; text-decoration: none">LOGO</a> -->
        <img src="./assets/LYYDB.jpg" alt="Logo" width="100" height="50" style="margin-left: 30px" />
        <img />
        <a href="https://www.google.com.hk">谷歌</a>
        <ul style="list-style: none; display: flex" class="nav-links">
          <li>
            <router-link
              to="/Home"
              style="
                color: #333;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
              "
            >
              首页
            </router-link>
          </li>
          <li>
            <router-link
              to="/Map_Penetration"
              style="
                color: #333;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
              "
            >
              中国地图(穿透)
            </router-link>
          </li>
          <li>
            <router-link
              to="/Map_Penetration_3D"
              style="
                color: #333;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
              "
            >
              中国地图(穿透)（副本）
            </router-link>
          </li>
          <li>
            <router-link
              to="/Map_3D"
              style="
                color: #333;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
              "
            >
              中国地图(3D)
            </router-link>
          </li>
          <li>
            <router-link
              to="/CityComponent"
              style="
                color: #333;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
              "
            >
              城市选择器
            </router-link>
          </li>
          <li>
            <router-link
              to="/CityMap"
              style="
                color: #333;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
              "
            >
              城市选择地图
            </router-link>
          </li>
          <li>
            <router-link
              to="/ColorPicker"
              style="
                color: #333;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
              "
            >
              ColorPicker颜色选择器
            </router-link>
          </li>
          <!-- <li>
            <router-link
              to="/Cascader"
              style="
                color: #333;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
              "
            >
            Cascader级联选择器
            </router-link>
          </li> -->
          <li>
            <router-link
              to="/ContactUs"
              style="
                color: #333;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
              "
            >
              搜索
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main style="min-height: calc(100vh - 80px); display: flex; justify-content: center" class="main-container">
      <div style="width: 100%; text-align: center" class="container">
        <router-view></router-view>
      </div>
    </main>

    <!-- 底部版权信息 -->
    <footer style="padding: 1rem; background-color: #f5f5f5; text-align: center" class="footer">
      <div style="display: flex; justify-content: center; align-items: center" class="container">
        <p>&copy; 版权所有 LZJ 公司</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
