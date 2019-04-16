
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios';
import axios from 'axios';
import routes from './routes.js'
import BootstrapVue from 'bootstrap-vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import Vuelidate from 'vuelidate'

Vue.use(VuejsDialog);
Vue.use(Vuelidate);

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(Snotify, options)
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(Loading);
Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes: routes
});
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
