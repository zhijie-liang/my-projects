import Vue from 'vue'
import App from './App.vue'
// import App from './BppLZJ.vue'
// import App from './cpp.vue'
//添加
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
//

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
