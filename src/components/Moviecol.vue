<template>
  <div class="main">
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="index-body">
      <div>
        <div class="index-item" v-for="(data, index) in data_list">
            <div class="item-img" @click="show(data.title)">
              <img style="height: 212.3px;width: 315.3px;" :src="seturl(data.title)" :alt="data.title">
            </div>
            <div class="item-text">
              <div class="item-text-title">{{data.info}}</div>
              <div class="item-text-name">{{settext(data.title)}}/{{$formatDate(data.release_time)}}
                <Button @click="delData(data.id)" size="small" style="margin-left: 5px;">取消收藏</Button>
              </div>

            </div>
        </div>
      </div>
    </div>
    <Page style="margin-bottom: 25px;" :total="total" :current="page" :page-size="page_size" :page-size-opts="[20,50,100,200,500]" @on-change="changePage" @on-page-size-change="changePagesize" show-total show-elevator show-sizer />

  </div>
</template>

<script>
  import {getMoviecol, delMoviecol} from '../api/index.js';
  import {getCookie} from "../assets/js/cookie";
    export default {
      data(){
        return{
        total:0,          // 总条数
          page_size:100,      // 每页条数
          page:1,
          data_list: [],     // 标签列表
          loading:true,
          ids:[],
          username: getCookie('username')
      }
    },
      components:{
      },
      computed:{
        get_page() {
          let page = this.$route.params.bid;
          if(page){
            return parseInt(page);
          }
          return 1
        },
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
            total: this.total,
            username: this.username
          };
          let resp = await getMoviecol(jsonData);
          this.total = resp.total;
          console.log(resp);
          if (this.total > 0) {
            this.data_list = resp.data;
          }
          this.loading = false
        },

        async delData(id ){
          //let id = this.data_list[index].id;
          let resp = await delMoviecol({id:id, username: this.username});
          if (resp.state === 1){
            //this.data_list.splice(index, 1);    // 从原数组中移除
            //this.total -= 1;
            this.$Message.success('取消收藏成功')
          }else if(resp.state === 0){
            this.$Message.warning('请先登录')
          }else{
            this.$Message.warning('取消收藏失败')
          }
          this.getData();
        },

        show(title){
          let name = title.split(' ')[0];
          this.$router.push({path:`/${name}`})
        },

        seturl(title){
          title = title.split(' ')[0];
          return 'http://192.168.0.104:8000/image/movie/' + title + '/' + title + '.jpg?' + Math.random()
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
        /*changePage(index){
          this.page = index;
          console.log('page:',this.page);
          this.getData();
        },*/
        changePage(index){
          this.$router.push(`/moviecol/${index}`)
        },

        // 改变每页显示的条数
        changePagesize(index){
          this.page_size = index;
          console.log('page_size:',this.page_size);
          this.getData();
        }
      },
      watch:{
        "$route":function(to, from){
          if(this.page !== this.get_page){
            this.page = this.get_page;
          }
          this.getData();
        }
      }
    }
</script>

<style>

</style>
