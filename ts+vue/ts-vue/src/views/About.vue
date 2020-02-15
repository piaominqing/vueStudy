<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <Test :msg="msg" @update-title="updateTitle"/> -->
    <Test2 :msg="msg" @update-title="updateTitle"/>
  </div>
</template>
<script>
// @ is an alias to /src
import Test from '@/components/Test.vue'
import Test2 from '@/components/Test2.vue'

export default {
  name: 'Home',
  data(){
    return {
      msg: 'first'
    }
  },
  components: {
    // Test,
    Test2
  },
  methods:{
    updateTitle(title){
      this.msg = title
    }
  }
}
</script>
