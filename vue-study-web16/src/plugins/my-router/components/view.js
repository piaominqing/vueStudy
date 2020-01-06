export default {
  render (h) {
    this.$vnode.data.routerView = true

    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++
        }
      }
      parent = parent.$parent
    }
    let comp = null
    const route = this.$router.matched[depth]
    if(route){
      comp = route.component
    }

    return h(comp)
  }
}