// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {formatDate} from "./base/date.js";
import './base/index.css';


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
//Vue.use(Router);

Vue.prototype.$format = function (time) {
  if(!time)return null;
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
};
Vue.prototype.$formatDate = function (time) {
  if(!time)return null;
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd');
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
