import Vue from 'vue'

function extendsCreate(Comp,props){
  const fn = Vue.extend({
    render: h => h(Comp, {props})
  });
  const vm = new fn().$mount()
  // 获取真实dom
  document.body.appendChild(vm.$el)
  const comp = vm.$children[0]

  // 删除
  comp.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp
}

export default extendsCreate