import Vue from 'vue'
import App from './App.vue'

import Vuetify from '@/plugins/vuetify'
import VueRouter from '@/plugins/router'

Vue.config.productionTip = false

new Vue({
  vuetify: Vuetify,
  router: VueRouter,
  render: h => h(App),
}).$mount('#app')
