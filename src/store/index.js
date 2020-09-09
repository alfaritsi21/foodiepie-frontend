import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Product from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Product
  },
  state: {
    name: 'Arqi Alfaritsi'
  },
  mutations: {},
  actions: {},
  getters: {}
})
