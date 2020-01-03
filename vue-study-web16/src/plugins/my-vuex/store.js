import { _Vue } from "./install";
export default class Store {
  constructor(options){
    this._mutations = options.mutations || {}
    this._actions = options.actions || {}
    // state 响应化处理
    this.state = new _Vue({
      data:options.state
    })

    // 异步执行会丢失 this (commit,dispatch)
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  commit(type, payload){
    const mutation = this._mutations[type]
    if(!mutation){
      console.error(`unknown mutation type:${type}`);
      return
    }
    mutation(this.state, payload)
  }
  dispatch(type, payload){
    const action = this._actions[type]
    if(!action){
      console.error(`unknown mutation type:${type}`);
      return
    }
    action(this, payload)
  }
}