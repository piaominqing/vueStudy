<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  asyncData ({ store }) {
    // 约定预取逻辑编写在预取钩子asyncData中
    // 触发 action 后，返回 Promise 以便确定请求结果
    return store.dispatch("getCount");
  }
}
</script>