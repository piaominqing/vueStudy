export let _Vue
export default function install(Vue){
  _Vue = Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        console.log(this.$options.store)
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}