import View from './components/view'
import Link from './components/link'
let _Vue
class VueRouter {
  constructor(options){
    this.options = options
    
    const initial = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'current', initial)
    // 监听url变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

    // // 创建一个路由映射表
    // this.routeMap = {}
    // options.routes.forEach(route => {
    //   this.routeMap[route.path] = route
    // })

  }
  onHashChange(){
    this.current = window.location.hash.slice(1)
  }
}

VueRouter.install = function (Vue){
  _Vue = Vue
  //需要把根组件传入的router挂载到$router上
  Vue.mixin({
    beforeCreate(){
      if(this.$options.router){
        _Vue.prototype.$router = this.$options.router
      }
    }
  })
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
}

export default VueRouter