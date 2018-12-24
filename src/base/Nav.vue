<template>
  <div>
    <b-navbar fixed="top" toggleable="md" type="light" variant="light">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">NavBar</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item>
            <b-button size="sm" class="my-2 my-sm-0" type="button" variant="light" @click="go_home">Home</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button size="sm" class="my-2 my-sm-0" type="button" variant="light" @click="go_performer">Performer
            </b-button>
          </b-nav-item>
          <b-nav-form>
            <b-form-input size="sm" v-model="keyword" class="mr-sm-2" type="text" placeholder="Search" @keyup.enter.native="search"/>
            <b-button size="sm" class="my-2 my-sm-0" @click="search">Search</b-button>
          </b-nav-form>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <template v-if="login">
              <b-dropdown-item href="#" @click="$router.push('/moviecol')">Moviecol</b-dropdown-item>
              <b-dropdown-item href="#" @click="$router.push('/follow')">Follow</b-dropdown-item>
              <b-dropdown-item href="#" v-b-modal.profile>Profile</b-dropdown-item>
              <b-dropdown-item href="#" v-b-modal.logout>Logout</b-dropdown-item>
              <b-dropdown-item href="#" v-if="username==='xiaoxin'" @click="$router.push('/recyle')">回收站</b-dropdown-item>
            </template>
            <template v-else>
              <b-dropdown-item href="#" v-b-modal.login>Login</b-dropdown-item>
              <b-dropdown-item href="#" @click="$router.push('/register')">Register</b-dropdown-item>
            </template>

          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

      <b-modal style="text-align: left;" id="login" title="用户登录" @ok="Login" ok-title="Login">
        <b-form-group id="exampleInputGroup1"
                      label="Email address:"
                      label-for="exampleInput1"
                      description="We'll never share your email with anyone else.">
          <b-form-input id="exampleInput1"
                        type="email"
                        v-model="username"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      label="Your Name:"
                      label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="text"
                        v-model="password"
                        required
                        placeholder="Enter name">
          </b-form-input>
        </b-form-group>
      </b-modal>
      <b-modal id="logout" title="退出登录" @ok="logout" ok-title="Logout">
        <p class="my-4">Are you sure you want to logout ?</p>
      </b-modal>
      <b-modal id="profile" title="用户信息">
        <p class="my-4">Hello from modal!</p>
      </b-modal>

    </b-navbar>
    <div class="nav-phone">
      <ul>
        <li>
          <!--<a @click="go_home">Home</a>-->
          <b-button size="sm" class="my-2 my-sm-0" variant="light" @click="go_home">Home</b-button>
        </li>
        <!--<li><a @click="go_performer">Performer</a></li>-->
        <li>
          <!--<Button>Performer</Button>-->
          <b-button size="sm" class="my-2 my-sm-0" variant="light" @click="go_performer">Performer</b-button>
        </li>
        <li>
          <!--<b-form-input size="sm" v-model="keyword" class="mr-sm-2" type="text" placeholder="Search" @keyup.enter.native="search"/>-->
          <Input v-model="keyword" placeholder="search.." @keyup.enter.native="server" clearable style="width: 150px;"/>
        </li>
        <li>
          <b-button size="sm" class="my-2 my-sm-0" variant="light" @click="search">Search</b-button>
        </li>
        <li style="margin-left: 5px;">
          <a href="javascript:void(0)" @blur="user_model=false" style="color: #000;background: transparent;margin: 0; padding: 0;">
            <Icon type="ios-contact-outline" size="23" @click="user_model=!user_model" />
          </a>

        </li>
        <transition name="fade">
        <ul class="user-oper" v-if="user_model">
          <template v-if="login">
            <li @click="$router.push('/moviecol')">收藏</li>
            <li @click="$router.push('/follow')">关注</li>
            <li @click="logout">Logout</li>
            <li>修改密码</li>
            <li v-if="username==='xiaoxin'">回收站</li>
          </template>
          <template v-else>
            <li><a @click="login_model=true">Login</a></li>
            <li @click="register_model=true">Register</li>
          </template>
        </ul>
        </transition>
      </ul>
    </div>
    <Modal v-model="login_model" class="login-modal"
      title="Login"
      @on-ok="Login"
      @on-cancel="cancel">
      <span style="margin: auto; text-align: left;">
        <p style="margin-bottom: 5px;">用户名：</p>
        <Input v-model="username" style="width: 200px;margin-bottom: 15px;" clearable/>
        <p style="margin-bottom: 5px;">密码：</p>
        <Input v-model="password" style="width: 200px;" clearable/>
      </span>
    </Modal>

    <Drawer title="Basic Drawer" :closable="false" v-model="register_model">
      <p>用户名</p>
      <Input v-model="form.name" style="width: 200px;margin-bottom: 15px;" clearable/>
      <p>密码</p>
      <Input v-model="form.pwd" style="width: 200px;margin-bottom: 15px;" clearable/>
      <p>重复密码</p>
      <Input v-model="confirm_pwd" style="width: 200px;margin-bottom: 15px;" clearable/>
      <p>邮箱</p>
      <Input v-model="form.email" style="width: 200px;margin-bottom: 15px;" clearable/>
      <Button @click="register_model=false">取消</Button>
      <Button @click="register" type="primary">注册</Button>
    </Drawer>

  </div>

</template>
<script>
  import {setCookie, getCookie, delCookie} from '../assets/js/cookie.js'
  import {getUser, checkUser, register, Login, logout, getServer} from '../api/index.js'

  export default {
    data() {
      return {
        keyword: null,
        data: null,
        login: null,
        user_model:null,

        // 登录使用
        username:null,
        password:null,
        login_model:false,

        // 注册属性
        register_model: false,
        form:{
          name:null,
          pwd:null,
          email:null,
          phone:null,
        },
        confirm_pwd: null,



      }
    },
    created() {
      this.getData();
    },
    mounted(){
      console.log('nav');
      this.getIp();
    },
    methods: {
      // 获取用户信息
      async getData() {
        /*let resp = getUser();
        if (resp.state === 1) {
          this.data = resp.data[0];
          this.login = true;
          this.username = getCookie('username');
        }*/

        this.username = getCookie('username');
        if(this.username){
          this.login = true;
        }
      },
      async getIp(){
        let resp = await getServer();
        console.log(resp);
        this.$global.setServerIp(resp.server);
      },
      clicktest(){
        this.login_model = true;
      },

      cancel(){
        this.login_model = false;
      },

      // 注册
      async register(){
        if(this.confirm_pwd!==this.form.pwd){
          alert('两次密码不一致');
          return
        }
        console.log(this.form);
        let resp = await register(this.form);
        if(resp.state === 1){
          this.$Message.success('注册成功');
          this.$router.push('/')
        }else if(resp.state === 2){
          this.$Message.warning('用户已存在')
        }else{
          this.$Message.warning('注册失败')
        }
      },

      // 切换页面
      toNext(name) {
        console.log(name);
        this.$router.push(name)
      },
      go_home() {
        this.$router.push('/')
      },
      // 通过url改变当前选中项
      changeIndex(path) {
        console.log(path);
        this.active = path.split('/').slice(0, 3).join('/');
      },

      search() {
        this.$router.push(`/search/${this.keyword}`)
      },

      go_performer() {
        this.$router.push('/performer')
      },
      // 取消添加用户模态框
      reset_data() {
        this.password = '';
        this.new_password = '';
        this.confirm_password = '';
      },

      // 登录
      async Login(){
        let json_data = {
          username: this.username,
          password: this.password,
        };
        let resp = await Login(json_data);
        if(resp.state === 1){
          this.data = resp.data[0];
          setCookie('username',this.username, 1000 * 60);
          this.login = true;
          this.$Message.success('login successful!');
          window.reload()
        }else{
          this.$Message.warning('login failed!')
        }
      },


      // 退出登录
      async logout(){
        /*let resp = await logout();
        if(resp.state===1){
          this.data = null;
          this.login = false;
          this.$Message.success('Logout successful!')
        }else{
          this.$Message.warning('Logout failed!')
        }*/
        delCookie('username');
        this.$Message.success('Logout successful!')
      },

      // 修改用户密码
      async edit_pass() {
        let password = this.password.trim();
        let new_password = this.new_password.trim();
        let confirm_password = this.confirm_password.trim();
        if (!password) {
          this.$Message.info('请输入用户密码');
          return
        }
        if (!new_password) {
          this.$Message.info('请输入新密码');
          return
        }
        if (!confirm_password || confirm_password !== new_password) {
          this.$Message.info('密码输入不一致，请重新输入');
          return
        }

        let json_data = {
          username: this.user,
          password: password,
          new_password: new_password
        };
        let resp = await EditPass(json_data);
        if (resp.state === 1) {
          this.modalCancel();
          this.$Message.success('密码修改成功')
        } else if (resp.state === 0) {
          this.$Message.warning('原密码错误')
        } else {
          this.$Message.warning('发生未知错误，密码修改失败')
        }
      },

    },
    components: {},

    filters: {
      // 转换为字符串
      goString(data) {
        return String(data)
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
    },

  }
</script>
<style>
  .login-modal .ivu-modal{
    width: 80%!important;
    margin: auto;
  }
  .login-modal .ivu-modal .ivu-modal-body{
    text-align: center;
  }

</style>
