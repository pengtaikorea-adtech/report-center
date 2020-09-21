import Vue from 'vue'
import App from './agency.vue'

import Vuetify from '@/plugins/vuetify'
import store from './store'
import Router from '@/plugins/router'
import routes from './routes';
import VueApexChart from 'vue-apexcharts'

Vue.config.productionTip = false

Vue.component('apexchart', VueApexChart);

new Vue({
  vuetify: Vuetify,
  store,
  router: Router({
    routes,
  }),
  render: h => h(App),
}).$mount('#app')
