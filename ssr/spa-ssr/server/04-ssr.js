// 加载文件系统工具
const fs = require('fs')
// 处理url
const path = require('path')
const express = require('express')
const server = express()

// 获取绝对路径
const resolve = dir => {
  return path.resolve(__dirname, dir)
}

// 第一步：开放dist/client目录,关闭默认下载index页的选项，不然到不了后面的路由
// /index.html
server.use(express.static(resolve('../dist/client'),{index:false}))

// 第二步: 获得一个createBundleRenderer
const {createBundleRenderer} = require('vue-server-renderer')

// 第三步： 导入服务端打包文件
const bundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'))

// 第四步： 创建渲染器
const template = fs.readFileSync(resolve('../public/index.html'), 'utf-8')
const clientManifest = require(resolve('../dist/client/vue-ssr-client-manifest.json'))
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, //https://ssr.vuejs.org/zh/api/#runinnewcontext
  template, // 宿主文件
  clientManifest // 客户端清单
})

// 路由是通配符，表示所有url都接受
server.get('*', async (req, res)=>{
  console.log(req.url)
  const context = {
    title: 'ssr test',
    url:req.url //首屏地址
  }
  const html = await renderer.renderToString(context)
  res.send(html)
})

server.listen(3000, function(){
  console.log(`server started at localhost:3000`)
})