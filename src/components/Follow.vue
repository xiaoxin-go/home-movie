<template>
  <div class="main">
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="index-body">
      <div>
        <div class="performer-item" v-for="(data, index) in data_list">
            <div style="padding:8px;background-color: #fff;" @click="show(data.name)"><div class="performer-item-img">
              <img style="height: 324px;float: right;" :src="'/static/image/performer/' + data.name + '.jpg?' + Math.random()" :alt="data.name">
            </div>
            </div>
            <div class="performer-item-text">
              <div class="performer-text-title">{{data.name}}</div>
              <button @click="delData(data.id)">取消关注</button>
            </div>
        </div>
      </div>
    </div>
    <Page style="margin-bottom: 25px;" :total="total" show-total :current="page" :page-size="page_size" :page-size-opts="[20,50,100,200,500]" @on-change="changePage" @on-page-size-change="changePagesize" show-elevator show-sizer />

  </div>
</template>

<script>
  import {getFollow,delFollow} from '../api/index.js';
    export default {
      data(){
        return{
        total:0,          // 总条数
          page_size:200,      // 每页条数
          page:1,            // 当前页
          data_list: [],     // 标签列表
          loading:true,
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
          };
          let resp = await getFollow(jsonData);
          this.total = resp.total;
          console.log(resp);
          if (this.total > 0) {
            this.data_list = resp.data;
          }
          this.loading = false
        },

        show(name){
          this.$router.push({path:`/performer/${name}`})
        },
        async delData(id){
          let resp = await delFollow({id:id});
          if (resp.state === 1){
            this.$Message.success('取消关注成功')
          }else{
            this.$Message.warning('取消关注失败')
          }
          this.getData();
        },
        // 改变页数
        /*changePage(index){
          this.page = index;
          console.log('page:',this.page);
          this.getData();
        },*/

        changePage(index){
          this.$router.push(`/follow/${index}`)
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
