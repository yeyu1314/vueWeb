/**
 * @description vuex主入口文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
import aslide from './modules/aslide'
import getters from './getters'

import state from './state'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    aslide
  },
  getters,
  state,
  mutations,
  actions
})
