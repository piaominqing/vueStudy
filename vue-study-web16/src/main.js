import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import create from './utils/create'
import extendsCreate from './utils/extendsCreate'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$create = create
Vue.use(extendsCreate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
