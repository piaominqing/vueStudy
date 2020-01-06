import View from './components/view'
import Link from './components/link'
let _Vue
class VueRouter {
  constructor(options){
    this.$options = options
    
    this.current = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'matched', [])
    this.match()
    // 监听url变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

  }
  onHashChange(){
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()
  }
  match(router){
    let routes = router || this.$options.routes
    for (const route of routes) {
      if(route.path === '/' && this.current === '/'){
        this.matched.push(route)
        return
      }

      if(route.path !== '/' && this.current.indexOf(route.path) !== -1){
        this.matched.push(route)
        if(route.children){
          this.match(route.children)
        }
        return
      }
    }
  }
}

VueRouter.install = function (Vue){
  _Vue = Vue
  //需要把根组件传入的router挂载到$router上
  Vue.mixin({
    beforeCreate(){
      if(this.$options.router){
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
}

export default VueRouter