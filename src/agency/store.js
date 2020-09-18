import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navigation: null,
    title: '',
    view_instance: null,
  },
  mutations: {
    transition(state, title, navs) {
      state.title = title;
      state.navigation = navs;
    },
    select_instance(state, value) {
      state.view_instance = value;
    }

  },
  actions: {

  }, 
  modules: {},
})