
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import VueAxios from 'vue-axios';
import axios from 'axios';
import routes from './routes.js'
import BootstrapVue from 'bootstrap-vue'
// Vue.config.productionTip = false
import VueFlashMessage from 'vue-flash-message';
Vue.use(VueFlashMessage);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue)

const router = new VueRouter({
  mode: "history",
  routes: routes
});
Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
