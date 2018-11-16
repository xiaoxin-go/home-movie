<template>
  <div class="register">
    <b-form @submit="register" @reset="reSet">
      <b-form-group id="exampleInputGroup1"
                    label="Your Name:"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      type="text"
                      v-model="form.name"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Your Password:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="password"
                      v-model="form.pwd"
                      required>
        </b-form-input>
      </b-form-group>

      <b-form-group id="exampleInputGroup3"
                    label="Confirm Password:"
                    label-for="exampleInput3">
        <b-form-input id="exampleInput3"
                      type="password"
                      v-model="confirm_pwd"
                      required>
        </b-form-input>
      </b-form-group>

      <b-form-group id="exampleInputGroup4"
                    label="Email address:"
                    label-for="exampleInput4">
        <b-form-input id="exampleInput4"
                      type="email"
                      v-model="form.email">
        </b-form-input>
      </b-form-group>

      <b-form-group id="exampleInputGroup5"
                    label="Phone Number:"
                    label-for="exampleInput5">
        <b-form-input id="exampleInput5"
                      type="number"
                      v-model="form.phone">
        </b-form-input>
      </b-form-group>

      <b-form-group id="exampleInputGroup6"
                    label="Your info:"
                    label-for="exampleInput6">
        <b-form-textarea id="exampleInput6"
                         :rows="3"
                         v-model="form.info">
        </b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Your Face:" label-for="upload_face">
        <b-form-file id="upload_face" class="mt-3" plain @change="upload"></b-form-file>
      </b-form-group>


      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>
<script>
  import {register} from '../api/index.js'
  export default {
    data() {
      return {
        confirm_pwd:null,
        // 注册属性
        form:{
          name:null,
          pwd:null,
          email:null,
          phone:null,
          info:null,
          face:null,
        },

      }
    },
    methods: {
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
        }else{
          this.$Message.warning('注册失败')
        }
      },
      upload(){
        let upload_face = document.getElementById('upload_face');

      },
      reSet(){
        this.form = {
          name:null,
          pwd:null,
          email:null,
          phone:null,
          info:null,
          face:null,
        };
      },


    },
    components:{
    },
  }
</script>
<style scoped>
  .register{
    width: 600px;
    margin: auto;
    background: #ffffff;
    padding: 40px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
  }
</style>
