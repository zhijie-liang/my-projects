<template>
  <div style="display: flex; background-color: #010a38">
    <div style="width: 25%">
      <div style="height: 33%"><NetCheck></NetCheck></div>
      <div style="height: 33%"><MobileTerminal></MobileTerminal></div>
      <div style="height: 33%"><IoTDevice></IoTDevice></div>
    </div>
    <div style="width: 50%">
      <Maps></Maps>
    </div>
    <div style="width: 25%"></div>
  </div>
</template>

<script>
import Maps from "./ProductIntroduction/Maps.vue";
import NetCheck from "./ProductIntroduction/NetCheck.vue";
import MobileTerminal from "./ProductIntroduction/MobileTerminal.vue";
import IoTDevice from "./ProductIntroduction/IoTDevice.vue";

export default {
  components: {
    Maps,
    NetCheck,
    MobileTerminal,
    IoTDevice,
  },
};
</script>

<style></style>
