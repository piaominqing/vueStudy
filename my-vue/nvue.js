
class ObServer {
  constructor(value) {
    this.value = value
    // 判断其类型
    if (Array.isArray(value)) {
      this.observeArray(value)
    }else{
      this.walk(value)
    }
  }
  walk (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data;

    // 响应化数据
    observe(this.$data)

    //代理data的数据到this下
    proxy(this, '$data')

    //创建编译器
    new Compiler(this.$options.el, this)
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub (wacher) {
    this.subs.push(wacher)
  }
  notify () {
    this.subs.forEach(wacher => {
      wacher.update()
    })
  }
}

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // Dep.target静态属性上设置为当前watcher实例
    Dep.target = this
    this.vm[this.key] // 读取触发了getter
    Dep.target = null // 收集完就置空
  }
  update () {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

function defineReactive (obj, key, val) {
  // 递归
  observe(val)

  // 创建一个Dep和当前key一一对应
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get () {
      Dep.target && dep.addSub(Dep.target)
      return val
    },
    set (newVal) {

      if (newVal !== val) {
        observe(newVal)
        val = newVal
        dep.notify()
      }
    }
  })
}

function observe (obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }
  // 创建Observer实例
  new Observer(obj)
}

function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

function proxy (vm, sourceKey) {
  Object.keys(vm[sourceKey]).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm[sourceKey][key]
      },
      set(val) {
        vm[sourceKey][key] = val
      }
    })
  })
}