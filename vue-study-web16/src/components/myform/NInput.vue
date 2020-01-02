<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
import emitter from '../../mixins/emitter';
export default {
  mixins: [emitter],
  props:{
    type:{
      type:String,
      default:'text'
    },
    value:{
      type: String,
      default: ''
    }
  },
  methods:{
    onInput(e){
      this.$emit('input', e.target.value)
      this.dispatch('NFormItem', 'validate', [this.value])
    }
  }
}
</script>

<style>

</style>