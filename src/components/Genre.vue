<template>
  <div class="main">
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="index-body">
      <div>
        <div class="index-item" v-for="(data, index) in data_list">
            <div class="item-img" @click="show(data.title)">
              <img style="width: 100%;" :src="seturl(data.title)" :alt="data.title">
            </div>
            <div class="item-text">
              <div class="item-text-title">{{data.info}}</div>
              <div class="item-text-name">{{settext(data.title)}}/{{$formatDate(data.release_time)}}</div>
              <Button @click="delData(data.id)" size="small"></Button>
            </div>
        </div>
        <Page style="margin-bottom: 25px;" :total="total" :current="page" :page-size="page_size" :page-size-opts="[20,50,100,200]" @on-change="changePage" @on-page-size-change="changePagesize" show-elevator show-sizer />
      </div>

    </div>
  </div>
</template>

<script>
  import {getGenre} from '../api/index.js';
    export default {
      data(){
        return{
        total:0,          // 总条数
          page_size:20,      // 每页条数
          page:1,            // 当前页
          data_list: [],     // 标签列表
          loading:true,
      }
    },
      components:{
      },
      created(){
        this.getData()
      },
      computed:{
        genre() {
          return this.$route.params.bid
        }
      },
      methods: {
        async getData() {
          let jsonData = {
            page: this.page,
            page_size: this.page_size,
            genre: this.genre,
            total: this.total,
          };
          let resp = await getGenre(jsonData);
          this.total = resp.total;
          console.log(resp);
          if (this.total > 0) {
            this.data_list = resp.data;
          }
          this.loading = false;
        },

        async delData(id){
          let resp = await delMovie({id:id});
          if (resp.state === 1){
            this.$Message.success('删除成功')
          }else{
            this.$Message.warning('删除失败')
          }
          this.getData();
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

</style>
