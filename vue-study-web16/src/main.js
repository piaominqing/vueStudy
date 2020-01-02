import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import create from './utils/create'
import extendsCreate from './utils/extendsCreate'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$create = create
Vue.prototype.$extendsCreate = extendsCreate

new Vue({
  render: h => h(App),
}).$mount('#app')
