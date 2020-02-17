const express = require('express')
const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')

const app = express()
const renderer = createRenderer()

const vm = new Vue({
  data: {
    name: 'ssr'
  },
  template: `
  <div>
    <h1>{{name}}</h1>
  </div>
  `
})

app.get('/', async function (req, res) {
  try {
    const html = await renderer.renderToString(vm)
    res.send(html)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000, ()=>{
  console.log('服务器启动')
})