<template>
  <div>
    <div>
      用户名：<input type="text" v-model="username">
    </div>
    <div>
      密码：<input type="text" v-model="password">
    </div>
    <button @click="login">提交</button>

  </div>
</template>

<script>
  import {setCookie, getCookie} from '../assets/js/cookie.js';
  import {Login} from '../api/index.js'
  export default {
    data(){
      return {
        username:null,
        password:null,
      }
    },
    mounted(){
      if(getCookie('username')){
        this.$router.push('/index')
      }
    },
    methods:{
      async login(){
        if (!this.username || !this.username.trim()){this.$Message.warning('用户名不能为空！');return}
        if (!this.password || !this.password.trim()){this.$Message.warning('密码不能为空！');return}
        let json_data = {
          username: this.username,
          password: this.password
        };
        let resp = await Login(json_data);
        if (resp.state === 1){
          setCookie('username', this.username, 1000*60);
          //this.$User.setName(this.username);
          this.$router.push('/index')
        }else{
          this.$Message.warning('用户名或密码错误！')
        }
      }
    }
  }
</script>

<style scoped>

</style>
