/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type => {
    // Vue.component = function(id, definition){}
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        // Vue.component('comp', {data(){}})
        // def是对象
        if (type === 'component' && isPlainObject(definition)) {
          // 定义组件name
          definition.name = definition.name || id
          // extend创建组件的构造函数， definition变成构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 注册this.options.components.comp = Ctor
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
