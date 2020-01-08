class Compiler {
  constructor(el, vm){
    this.$el = document.querySelector(el)
    this.$vm = vm

    if(this.$el){
      this.compile(this.$el)
    }
  }
  compile(el){
    const childNodes = el.childNodes
    Array.from(childNodes).forEach((childNode)=>{
      if(this.isElement(childNode)){
        this.compileElement(childNode)
      }else if(this.isTextContent(childNode)){
        this.compileTextContent(childNode)
      }
    })
  }
  isElement(node){
    return node.nodeType === 1
  }
  isTextContent(node){
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileTextContent(node){
    this.update(node,RegExp.$1, 'text')
  }
  update(node, key, type){
    // 初始化
    const fn = type + 'Updater'
    fn && fn(node,this.$vm[key])

    // 更新处理
    new Watcher(this.$vm,key,function(val){
      fn && fn(node,val)
    })
    
  }
  textUpdater(node,val){
    node.textContent = val
  }
}