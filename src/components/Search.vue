<template>
  <div class="main">
    <Nav></Nav>
    <div class="index-body">
      <div>
        <div class="index-item" v-for="(data, index) in data_list">
          <b-link @click="show(data.title)">
            <div class="item-img">
              <img style="width: 100%;" :src="seturl(data.title)" :alt="data.title">
            </div>
            <div class="item-text">
              <div class="item-text-title">{{settitle(data.title)}}</div>
              <div class="item-text-name">{{settext(data.title)}}/{{$formatDate(data.release_time)}}</div>
            </div>
          </b-link>
        </div>
        <b-pagination  size="md" align="center" @change="changePage" :total-rows="total"  v-model="page"  :per-page="page_size" ></b-pagination >
      </div>

    </div>
  </div>
</template>

<script>
  import Nav from '../base/Nav.vue'
  import {getMovie} from '../api/index.js';
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
      computed:{
        keyword() {
          return this.$route.params.bid
        }
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
            keyword: this.keyword,
          };
          let resp = await getMovie(jsonData);
          this.total = resp.total;
          console.log(resp);
          if (this.total > 0) {
            this.data_list = resp.data;
          }
        },

        show(title){
          let name = title.split(' ')[0];
          this.$router.push({path:`/${name}`})
        },

        seturl(title){
          title = title.split(' ')[0];
          return '/static/image/movie/' + title + '/' + title + '.jpg'
        },
        settitle(title){
          title = title.split(' ').slice(1,).join(' ');
          return title
        },
        settext(title){
          title = title.split(' ')[0];
          return title
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
.index-body{
  margin-top: 60px;
  height: 80%;
  width: 100%;
  overflow-y: auto;
  background-color: #f5f6f7;
}
.index-body>div{
  width: 80%;
  margin: auto;
}
  .index-item{
    display: inline-block;
    margin: 10px;
    width: 20%;
  }
  .item-text{
    font-size: 14px;
    color: #000;
  }
  .item-text-title{
    height: 40px;
    overflow: hidden;
  }
  /*.index-item:hover{*/
    /*width: 60%;*/
  /*}*/

</style>
