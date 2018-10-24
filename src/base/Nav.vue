<template>
  <b-navbar fixed="top" toggleable="md" type="light" variant="light">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="/">NavBar</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item>
          <b-button size="sm" class="my-2 my-sm-0" type="button" variant="light" @click="go_home">Home</b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button size="sm" class="my-2 my-sm-0" type="button" variant="light" @click="go_performer">Performer</b-button>
        </b-nav-item>
        <b-nav-form>
          <b-form-input size="sm" v-model="keyword" class="mr-sm-2" type="text" placeholder="Search"/>
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
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>
<script>
  export default {
    data() {
      return {
        keyword:null,
      }
    },
    methods: {
      // 切换页面
      toNext(name){
        console.log(name);
        this.$router.push(name)
      },
      go_home(){
        this.$router.push('/')
      },
      // 通过url改变当前选中项
      changeIndex(path){
        console.log(path);
        this.active = path.split('/').slice(0,3).join('/');
      },

      search(){
        this.$router.push(`/search/${this.keyword}`)
      },

      go_performer(){
        this.$router.push('/performer')
      },
      // 取消添加用户模态框
      reset_data(){
        this.password = '';
        this.new_password = '';
        this.confirm_password = '';
      },

      // 修改用户密码
      async edit_pass(){
        let password = this.password.trim();
        let new_password = this.new_password.trim();
        let confirm_password = this.confirm_password.trim();
        if(!password){this.$Message.info('请输入用户密码');return}
        if(!new_password){this.$Message.info('请输入新密码');return}
        if(!confirm_password || confirm_password !== new_password){this.$Message.info('密码输入不一致，请重新输入');return}

        let json_data = {
          username:this.user,
          password:password,
          new_password:new_password
        };
        let resp = await EditPass(json_data);
        if(resp.state===1){
          this.modalCancel();
          this.$Message.success('密码修改成功')
        }else if(resp.state===0){
          this.$Message.warning('原密码错误')
        }else{
          this.$Message.warning('发生未知错误，密码修改失败')
        }
      },

    },
    components:{
    },

    filters:{
      // 转换为字符串
      goString(data){
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


</style>
