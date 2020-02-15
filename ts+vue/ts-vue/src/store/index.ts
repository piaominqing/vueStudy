import Vue from 'vue'
import Vuex from 'vuex'
import {RouteState} from '@/types'
Vue.use(Vuex)

export default new Vuex.Store<RouteState>({
  state: {
    counter: 1,
  },
  mutations: {
    add(state){
      state.counter += 1
    }
  },
  actions: {
    addCounter({ commit }){
      commit('add')
    }
  },
  modules: {
  }
})
