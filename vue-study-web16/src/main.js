import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import create from './utils/create'
import extendsCreate from './utils/extendsCreate'
import router from './router'
import store from './store'
import {Observer, Watcher} from './utils/reactive'

let data = {
  name: 'cjg',
  obj: {
    name: 'zht',
  },
};

new Observer(data);
// 监听data对象的name属性，当data.name发现变化的时候，触发cb函数
new Watcher(data, 'name', (oldValue, newValue) => {
  console.log(oldValue, newValue);
})

// data.name = 'zht';

// // 监听data对象的obj.name属性，当data.obj.name发现变化的时候，触发cb函数
// new Watcher(data, 'obj.name', (oldValue, newValue) => {
//   console.log(oldValue, newValue);
// })

// data.obj.name = 'cwc';
// data.obj.name = 'dmh';

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
