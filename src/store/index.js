/**
 * @description vuex主入口文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
import aslide from './modules/aslide'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    aslide
  },
  getters
})

 export default store
