function defineReactive(obj, key, val){
  Object.defineProperty(obj,key,{
    get(){
      return val
    },
    set(newVal){
      
      if(newVal !== val){
        observe(newVal)
        val = newVal
      }
    }
  })
}

function observe(obj){
  if(typeof obj !== 'object' || obj == null){
    return
  }
  Object.keys(obj).forEach((key)=>{
    defineReactive(obj,key,obj[key])
    observe(obj[key])
  })
}