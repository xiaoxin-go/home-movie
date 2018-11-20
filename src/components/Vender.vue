<template>
  <div class="main">
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="index-body">
      <div style="
    text-align: left;
    margin: auto;">
        <CheckboxGroup v-model="id_list">
          <div class="index-item" v-for="(data, index) in data_list">
            <div class="item-img" @click="show(data.title)">
              <div style="width: 315.3px;height: 212.3px;">
                <img style="height: 212.3px;width: 315.3px;" :src="seturl(data.title)" :alt="data.title">
              </div>
            </div>
            <div class="item-text">
              <div class="item-text-title">{{data.info}}</div>
              <div class="item-text-name">
                <Checkbox :label="data.id"><span style="margin: 0;padding: 0;"></span></Checkbox>
                {{settext(data.title)}}/{{$formatDate(data.release_time)}}
                <Button @click="addMoviecol(data.id)" size="small">收藏</Button>
                <Button v-if="username==='xiaoxin'" @click="del(index,data.id)" size="small">删除</Button>
              </div>
            </div>
          </div>
        </CheckboxGroup>
      </div>
      <div v-if="username==='xiaoxin'" style="position: fixed;top:5px;left: 524px;width: 110px;z-index:2000">
        <b-button size="sm" @click="delData">删除</b-button>
        <b-button size="sm" @click="changeState">更改</b-button>
      </div>

    </div>
    <Page style="margin-bottom: 25px;" show-total :total="total" :current="get_page" :page-size="page_size" :page-size-opts="[20,50,100,200,500]" @on-change="changePage" @on-page-size-change="changePagesize" show-elevator show-sizer />

  </div>
</template>

<script>
  import {getMovie, delMovie, addMoviecol,changeState, getGenre} from '../api/index.js';
  import {getCookie} from "../assets/js/cookie";
  export default {
    data(){
      return{
        total:0,          // 总条数
        page_size:20,      // 每页条数
        //page:1,            // 当前页
        data_list: [],      // 标签列表
        loading:true,
        id_list: [],
        username: getCookie('username')
      }
    },
    components:{
    },
    computed:{
      get_page() {
        let page = this.$route.params.page;
        if(page){
          return parseInt(page);
        }
        return 1
      },
      vender(){
        return this.$route.params.bid
      }
    },
    created(){
      this.getData()
    },
    methods: {
      async getData() {
        let jsonData = {
          page: this.get_page,
          page_size: this.page_size,
          data: {vender:this.vender},
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
      // 删除数据
      async delData(){
        console.log(Array(this.id_list));
        let len = this.id_list.length;
        if(len===0){this.$Message.warning('please select movie.');return}
        let json_data = {
          id_list: Array(this.id_list),
          username: this.username
        };
        let resp = await delMovie(json_data);
        if (resp.state === 1){
          this.total -= len;
          this.$Message.success('删除成功')
        }else{
          this.$Message.warning('删除失败')
        }
        this.id_list = [];
        this.getData();
      },

      //删除单个数据
      async del(index, id){
        let resp = await delMovie({id:id, username: this.username});
        if(resp.state===1){
          this.data_list.splice(index,1);
          this.$Message.success('删除成功')
        }else{
          this.$Message.warning('删除失败')
        }
      },

      // 添加收藏
      async addMoviecol(id){
        let resp = await addMoviecol({id:id});
        if(resp.state === 0){
          this.$Message.warning('用户未登录')
        }else if(resp.state === 1){
          this.$Message.success('收藏成功')
        }else{
          this.$Message.success('收藏失败')
        }
      },

      show(title){
        let name = title.split(' ')[0];
        this.$router.push({path:`/${name}`})
      },

      seturl(title){
        title = title.split(' ')[0];
        return this.server_ip +  '/image/movie/' + title + '/' + title + '.jpg?' + Math.random()
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
      // 更换封面
      async changeState(){
        let resp = await changeState({id_list: this.id_list});
        if(resp.state === 1){
          this.$Message.success('设置成功');
          this.id_list = [];
        }else{
          this.$Message.warning('设置失败')
        }
      },

      changePage(index){
        this.id_list = [];
        this.page = index;
        this.$router.push(`/vender/${this.vender}/${index}`);
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
        this.getData();
      }
    }
  }
</script>

<style>
  .index-item{
    display: inline-block;
    margin: 10px;
    width: 324px;
    background: #fafafa;
    padding-bottom: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    text-align: center;
  }
  .item-text{
    font-size: 14px;
    color: #000;
  }
  .item-text-title{
    height: 40px;
    overflow: hidden;
  }

</style>
