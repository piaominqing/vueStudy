<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
function Component(options: any){
  return function(target: any){
    return Vue.extend(options)
  }
}
@Component({
  props:{
    msg:{
      type:String,
      required:true
    }
  }
})
export default class Test extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
