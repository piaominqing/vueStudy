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
    console.log(childNodes)
    Array.from(childNodes).forEach((childNode)=>{
      if(this.isElement(childNode)){
        this.compileElement(childNode)
      }else if(this.isTextContent(childNode)){
        this.compileTextContent(childNode)
      }

      if(childNode.childNodes){
        this.compile(childNode)
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
  compileElement(node){
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      const attrName = attr.name
      const exp = attr.value
      if(this.isDirective(attrName)){

        const dir = attrName.substring(2)
        this[dir] && this[dir](node, exp)
      }
    })
  }
  isDirective(str){
    return str.indexOf('k-') === 0
  }
  update(node, key, type){
    // 初始化
    const fn = this[type + 'Updater']
    fn && fn(node,this.$vm[key])

    // 更新处理
    new Watcher(this.$vm,key,function(val){
      fn && fn(node,val)
    })
    
  }
  textUpdater(node,val){
    node.textContent = val
  }
  htmlUpdater(node,val){
    node.innerHTML = val
  }
  html(node,val){
    this.update(node, val, 'html')
  }
}