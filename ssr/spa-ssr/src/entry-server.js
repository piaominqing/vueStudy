import { createApp } from './main'

// 返回一个函数，接受请求上下文，返回创建的vue实例
export default context => {
  // 这里返回一个Promise, 确保路由或组件准备就绪
  return new Promise((resolve, reject) => {
    // 拿出store和router实例
    const { app, router, store } = createApp(context);
    router.push(context.url);
    router.onReady(() => {
      // 获取匹配的路由组件数组
      const matchedComponents = router.getMatchedComponents();
      // 若无匹配则抛出异常
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      // 对所有匹配的路由组件调用可能存在的`asyncData()`
      Promise.all(
        matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute,
            });
          }
        }),
      ).then(() => {
        // 所有预取钩子 resolve 后
        // store 已经填充入渲染应用所需状态
        // 将状态附加到上下文，且 `template` 选项用于 renderer 时
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject);
  })
}