import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
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
