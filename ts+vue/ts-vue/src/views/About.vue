<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Test msg="first"/>
  </div>
</template>
<script>
// @ is an alias to /src
import Test from '@/components/Test.vue'

export default {
  name: 'Home',
  components: {
    Test
  }
}
</script>
