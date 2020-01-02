<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods:{
    validate(cb) {

      const tasks = this.field.map(item => item.validate());

      // 统一处理所有Promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  },
  created(){
    this.field = []
    this.$on('addFormItem', function(vm){
      this.field.push(vm)
    })
  }
}
</script>

<style>

</style>