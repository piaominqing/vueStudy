let Vue
function install(_Vue){
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
class Store {
  constructor(options){
    // state 响应化处理
    this.state = new Vue({
      date:options.state
    })
  }
  commit(){

  }
  dispatch(){

  }
}
export default {
  Store,
  install
}