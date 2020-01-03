import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '@/plugins/my-vuex/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters:{
    doubleCounter(state){
      return state.counter * 2
    }
  },
  mutations: {
    add(state){
      state.counter++
    }
  },
  actions: {
    add({commit}){
      setTimeout(()=>{
        commit('add')
      }, 2000)
    }
  },
  modules: {
  }
})
