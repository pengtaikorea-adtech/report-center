import Vue from 'vue'
import VueRouter from 'vue-router'

export default (function(options) {
  Vue.use(VueRouter);
  return new VueRouter(options);
});