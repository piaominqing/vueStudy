import Vue from 'vue'
import Notice from '@/components/Notice'
function extendsCreate(Comp,props){
  // 获取组件构造函数
  const Fn = Vue.extend(Comp);
  // 创建组件实例
  const comp = new Fn({propsData:props})
  comp.$mount()
  // 获取真实dom
  document.body.appendChild(comp.$el)

  // 删除
  comp.remove = function() {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }

  return comp
}

export default {
  install(Vue){
    Vue.prototype.$alert = function(options){
      return extendsCreate(Notice, options)
    }
  }
}