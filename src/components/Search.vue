<template>
  <div class="main">
    <Nav></Nav>
    <div class="index-body">
      <div style="
    text-align: center;
    margin: auto;">
        <div class="index-item" v-for="(data, index) in data_list">
          <b-link >
            <div class="item-img" @click="show(data.title)">
              <img style="width: 100%;" :src="seturl(data.title)" :alt="data.title">
            </div>
            <div class="item-text">
              <div class="item-text-title">{{data.info}}</div>
              <div class="item-text-name">{{settext(data.title)}}/{{$formatDate(data.release_time)}}</div>
              <Button v-if="username==='xiaoxin'" @click="del(index,data.id)" size="small">删除</Button>
            </div>
          </b-link>
        </div>
        <Page style="margin-bottom: 25px;" :total="total" :current="page" :page-size="page_size" :page-size-opts="[20,50,100,200]" @on-change="changePage" @on-page-size-change="changePagesize" show-elevator show-sizer />
      </div>

    </div>
  </div>
</template>

<script>
  import Nav from '../base/Nav.vue'
  import {getMovie} from '../api/index.js';
  import {getCookie} from "../assets/js/cookie";

  export default {
      data(){
        return{
        total:0,          // 总条数
          page_size:20,      // 每页条数
          page:1,            // 当前页
          data_list: [],     // 标签列表
          username:getCookie('username')
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
            total: this.total,
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

        //删除单个数据
        async del(index, id){
          let resp = await delMovie({id:id});
          if(resp.state===1){
            this.data_list.splice(index,1);
            this.total -= 1;
            this.$Message.success('删除成功')
          }else{
            this.$Message.warning('删除失败')
          }
        },
        seturl(title){
          title = title.split(' ')[0];
          return this.server_ip +  '/image/movie/' + title + '/' + title + '.jpg'
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
      },
      watch:{
        "$route":function(){
            this.getData();
        }
      }
    }
</script>

<style>

</style>
