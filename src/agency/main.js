import Vue from 'vue'
import App from './agency.vue'

import Vuetify from '@/plugins/vuetify'
import Router from '@/plugins/router'
import routes from './routes';

Vue.config.productionTip = false

new Vue({
  vuetify: Vuetify,
  router: Router({
    routes,
  }),
  render: h => h(App),
}).$mount('#app')
