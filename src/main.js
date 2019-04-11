
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import VueAxios from 'vue-axios';
import axios from 'axios';
import Routes from './routes.js'
import BootstrapVue from 'bootstrap-vue'
Vue.config.productionTip = false

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue)

const router = new VueRouter({
  routes: Routes,
  mode: "history"
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')