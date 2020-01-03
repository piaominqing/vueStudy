// <a herf="..">abc</a>
export default {
  props:{
    to: {
      type:String,
      required:true
    }
  },
  render(h){
    // 标签名称, data, 子节点数组
    return h('a', {attrs:{href:`#${this.to}`}},this.$slots.default)
  }
}