/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

// 创建根据id获取innerHTML的方法
// cached 将获取结果存入cache
// query document.querySelector
const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

// 存一下Vue的原型方法$mount
const mount = Vue.prototype.$mount
// 重写Vue的原型方法$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  const options = this.$options
  // resolve template/el and convert to render function
  // 当Vue构造函数中不存在不存在render函数时
  if (!options.render) {
    let template = options.template
    // 当template存在时
    if (template) {
      // 当template为string时
      if (typeof template === 'string') {
        // 当template为id选择器时
        if (template.charAt(0) === '#') {
          // 根据id获取template
          template = idToTemplate(template)
        }
      // 当template存在nodeType时 
      } else if (template.nodeType) {
        // 直接取innerHTML为tempalate
        template = template.innerHTML
      // 否则 报错
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    // 当el存在时
    } else if (el) {
      // 取outerHTML为template
      template = getOuterHTML(el)
    }
    // 以上获取到template时
    if (template) {
      // 待深入了解
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

    }
  }
  // 执行原Vue $mount 方法并返回
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
