
import Vue from "vue";
import { AxiosInstance } from "axios";
import VueRouter from "vue-router"; 
import { Store } from "vuex";
// 对文件名后缀为.vue文件的处理
declare module '*.vue' {
  // import Vue from 'vue'
  export default Vue
}
// 扩展vue实例属性
declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosInstance;
  }
}
// 扩展ComponentOptions
declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    router?: VueRouter;
    store?: Store<any>;
  }
}

