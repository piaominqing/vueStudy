import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import store from './store'

Vue.config.productionTip = false
export function createApp(context){
  const router = createRouter()
  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App)
  })
  return {app, router}
}