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
import './assets/js/hivideo.js'
import './assets/css/hivideo.css'
import 'iview/dist/styles/iview.css';
import {Button, Page, Spin, Message, CheckboxGroup, Checkbox} from 'iview';


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.component('Button', Button);
Vue.component('Page',Page);
Vue.component('Spin',Spin);
Vue.component('CheckboxGroup',CheckboxGroup);
Vue.component('Checkbox',Checkbox);
Vue.prototype.$Message = Message;

Vue.prototype.server_ip = 'http://127.0.0.1:5500';

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
