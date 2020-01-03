import { _Vue } from "./install";
export default class Store {
  constructor(options){
    // state 响应化处理
    this.state = new _Vue({
      data:options.state
    })
  }
  commit(){

  }
  dispatch(){

  }
}