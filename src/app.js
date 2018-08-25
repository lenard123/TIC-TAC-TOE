/*import 'promise-polyfill/src/polyfill';

import Vue from 'vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'*/

import l from './myplugin/l.js' //My Own Plugins
import router from './routes.js' //Routes
import App from './App.vue' //Main Component
import store from './store.js' //Data

//components
import lHeader from './components/Header.vue'
Vue.component('lHeader', lHeader)


/*Plugins
Vue.use(VueRouter)
Vue.use(Vuex)*/
Vue.use(l)

new Vue({
  router,
  store: new Vuex.Store(store),
  el: '#app',
  render: h => h(App)
})