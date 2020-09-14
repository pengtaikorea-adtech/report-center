import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify);

// import global components - by A La Carte:
import globalComponents from '@/components/globals'

globalComponents.forEach((comp) => {
  Vue.component(comp.name, comp);
})



export default new Vuetify({
  componets: globalComponents,

});