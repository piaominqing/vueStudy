export default {
  render(h){
    const comp = this.$router.options.routes.filter(route => route.path === this.$router.current)[0].component
    
    return h(comp)
  }
}