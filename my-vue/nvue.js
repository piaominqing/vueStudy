
class ObServer {
  constructor(value) {
    this.value = value
    this.dep = new Dep();
    // 添加__ob__属性 值为当前ObServer 以便调用
    def(value, '__ob__', this);
    // 判断其类型
    if (Array.isArray(value)) {
      // 将Array修改原数组方法设置到当前实例属性上并触发更新
      copyAugment(value, arrayMethods, arrayKeys);
      // 将数组里的每个元素进行数据响应化
      this.observeArray(value);
    } else {
      this.walk(value)
    }
  }
  walk (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
  observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };
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
    if (Array.isArray(this.vm[this.key])) {
      this.vm[this.key].__ob__.dep.addSub(this)
    } else {
      Dep.target = this
      this.vm[this.key] // 读取触发了getter
      Dep.target = null // 收集完就置空
    }

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
  new ObServer(obj)
}

function proxy (vm, sourceKey) {
  Object.keys(vm[sourceKey]).forEach(key => {
    Object.defineProperty(vm, key, {
      get () {
        return vm[sourceKey][key]
      },
      set (val) {
        vm[sourceKey][key] = val
      }
    })
  })
}

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];

    // 调用原始方法
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);