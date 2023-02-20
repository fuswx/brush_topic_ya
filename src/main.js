import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入路由
import router from "@/router/router";
//引入仓库
import store from "@/store";

import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
window.jQuery=$;
window.$=$;

import 'animate.css';
Vue.use(ElementUI);


new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库：组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
