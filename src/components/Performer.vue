<template>
  <div class="main">
    <Nav></Nav>
    <div class="index-body">
      <div>
        <div class="performer-item" v-for="(data, index) in data_list">
          <b-link @click="show(data.name)">
            <div style="padding:8px;background-color: #fff;"><div class="performer-item-img">
              <img style="height: 324px;float: right;" :src="'/static/image/performer/' + data.name + '.jpg'" :alt="data.name">
            </div>
            </div>

            <div class="performer-item-text">
              <div class="performer-text-title">{{data.name}}</div>

            </div>
          </b-link>
          <button @click="del(index)">删除</button>
        </div>
          <b-pagination  size="md" align="center" @change="changePage" :total-rows="total"  v-model="page"  :per-page="page_size" ></b-pagination >

      </div>

    </div>
  </div>
</template>

<script>
  import Nav from '../base/Nav.vue'
  import {getPerformer,delPerformer} from '../api/index.js';
    export default {
      data(){
        return{
        total:0,          // 总条数
          page_size:20,      // 每页条数
          page:1,            // 当前页
          data_list: [],     // 标签列表
      }
    },
      components:{
        Nav
      },
      created(){
        console.log(this.keyword);
        this.getData()
      },
      methods: {
        async getData() {
          let jsonData = {
            page: this.page,
            page_size: this.page_size,
          };
          let resp = await getPerformer(jsonData);
          this.total = resp.total;
          console.log(resp);
          if (this.total > 0) {
            this.data_list = resp.data;
          }
        },

        show(name){
          this.$router.push({path:`/performer/${name}`})
        },
        async del(index){
          let id = this.data_list[index].id;
          let resp = await delPerformer({id:id});
          if (resp.state === 1){
            this.getData();
            alert('演员删除成功')
          }else{
            alert('演员删除失败')
          }
        },
        // 改变页数
        changePage(index){
          this.page = index;
          console.log('page:',this.page);
          this.getData();
        },

        // 改变每页显示的条数
        changePagesize(index){
          this.page_size = index;
          console.log('page_size:',this.page_size);
          this.getData();
        }
      }
    }
</script>

<style>
  .performer-item{
    background-color: #fafafa;
    display: inline-block;
    margin: 10px;
    width: 20%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
  }
  .performer-item-text{
    font-size: 14px;
    color: #000;
  }
  .performer-text-title{
    height: 40px;
    line-height: 30px;
    overflow: hidden;
  }
  .performer-item-img{
    width: 228px;
    height: 324px;
    overflow: hidden;
  }
  .bottom{
    width: 80%;
  }
  /*.index-item:hover{*/
    /*width: 60%;*/
  /*}*/

</style>
