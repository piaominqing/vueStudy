<template>
  <div>
    <p @click="add">{{counter}}</p>
    <input type="text" placeholder="修改title" @keyup.enter="updateTitle">
    <p>{{msg}}</p>
    <input type="text" placeholder="输入新特性" @keyup.enter="addFeature">
    <ul>
      <li v-for="feature in features" :key="feature.id">{{feature.name}}</li>
      <li>{{'特性个数为：'+count}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { Feature } from "@/types/index";
@Component
export default class Test extends Vue {
  // vue中的prop需要使用Prop装饰器
  @Prop({type: String, required: true}) private msg!: string;
  @Emit()
  updateTitle(e: KeyboardEvent) { //自定义事件名需为 update-title
    return (e.target as HTMLInputElement).value
  }
  @Watch('msg')
  onWatchChange(oldValue: string, newValue: string){
    console.log(oldValue, newValue)
  }
  // 类的属性即vu中的data
  features: Feature[] = [];
  // 类的方法即为vue中的method
  addFeature(e: KeyboardEvent) {
    // e.target是EventTarget类型，需要断言为HTMLInputElement
    const inp = e.target as HTMLInputElement;
    this.features.push({ id: this.features.length + 1, name: inp.value });
    inp.value = "";
  }
  // 生命周期钩子
  created() {
    this.$axios.get<Feature[]>('/api/list').then(res => {
      this.features = res.data;
    });
  }
  // 利用getter设置计算属性
  get count() {
    return this.features.length;
  }
  @State counter!: number
  @Action('addCounter') add!: number
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
