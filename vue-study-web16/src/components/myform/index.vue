<template>
  <div>
    <NForm :model="userInfo" :rules="rules" ref="loginForm">
      <NFormItem label="用户名" prop="username">
        <NInput v-model="userInfo.username" />
      </NFormItem>
      <NFormItem label="密码" prop="password">
        <NInput v-model="userInfo.password" />
      </NFormItem>
      <NFormItem >
        <button @click="login">登录</button>
      </NFormItem>
    </NForm>
  </div>

</template>

<script>
import NForm from './NForm'
import NFormItem from './NFormItem'
import NInput from './NInput'
export default {
  data () {
    return {
      userInfo: {
        username: "tom",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    }
  },
  components: {
    NInput,
    NFormItem,
    NForm
  },
  methods:{
    login(){
      this.$refs["loginForm"].validate(valid => {
        // const notice = this.$create(Notice, {
        //   title: "社会你杨哥喊你来搬砖",
        //   message: valid ? "请求登录!" : "校验失败!",
        //   duration: 2000
        // });
        // notice.show();
        if (valid) {
          alert("submit");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }

}
</script>

<style>
</style>