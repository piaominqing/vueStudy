<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Test :msg="msg" @update-title="updateTitle"/>
  </div>
</template>
<script>
// @ is an alias to /src
import Test from '@/components/Test.vue'

export default {
  name: 'Home',
  data(){
    return {
      msg: 'first'
    }
  },
  components: {
    Test
  },
  methods:{
    updateTitle(title){
      this.msg = title
    }
  }
}
</script>
