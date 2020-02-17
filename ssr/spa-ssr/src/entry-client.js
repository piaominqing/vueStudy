import {createApp} from './main'

const {app, router} = createApp()
// 路由就绪，执行挂载
router.onReady(()=>{
  app.$mount('#app')
})