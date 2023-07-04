<template>
  <div>
    <div id="fullscreen-container" style="background-color: #fff">
      这里的内容会被全屏！
      <button id="fullscreen-btn">进入全屏</button>
    </div>
    <div>这里的不会被全屏</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    /**
     * 全屏指定元素
     */
    function fullScreen(element) {
      const runfullScreen =
        element.requestFullscreen ||
        element.mozRequestFullScreen ||
        element.webkitRequestFullScreen ||
        element.msRequestFullscreen;

      if (runfullScreen) runfullScreen.call(element);
      else {
        console.error("当前浏览器不支持部分全屏！");
      }
    }

    /**
     * 退出全屏
     */
    function exitFullScreen() {
      const runExit =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;

      if (runExit) runExit.call(document);
      else {
        console.error("当前浏览器不支持退出全屏！");
      }
    }

    let isFullScreen = false;
    const button = document.getElementById("fullscreen-btn");

    button.addEventListener("click", () => {
      if (isFullScreen) {
        exitFullScreen();
        button.innerText = "进入全屏";
      } else {
        fullScreen(document.getElementById("fullscreen-container"));
        button.innerText = "退出全屏";
      }
      isFullScreen = !isFullScreen;
    });
  },
};
</script>
