<template>
  <div class="main">
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="index-body">
      <div class="clear-float">
        <div class="performer-data" v-for="data in base_data">
          <div style="padding:8px;background-color: #fff;">

              <div class="performer-item-img" style="overflow: hidden;">
                <img style="height: 324px;float: right;" :src="'/static/image/performer/' + data.name + '.jpg' + '?' + Math.random()" :alt="data.name">
              </div>
            </div>

          <div class="performer-item-text">
            <div class="title">{{data.name}} <Button @click="addFollow(data.id)" size="small" style="margin-left: 10px;">关注</Button> </div>
          </div>
          <div class="performer-info">
            <div v-if="data.birthday">生日：{{$formatDate(data.birthday)}}</div>
            <div v-if="data.age">年龄：{{data.age}}</div>
            <div v-if="data.length">身高：{{data.length}}</div>
            <div v-if="data.cup">罩杯：{{data.cup}}</div>
            <div v-if="data.bust">胸围：{{data.bust}}</div>
            <div v-if="data.waist">腰围：{{data.waist}}</div>
            <div v-if="data.hips">臀围：{{data.hips}}</div>
            <div v-if="data.hometown">出生地：{{data.hometown}}</div>
            <div v-if="data.hobby">爱好：{{data.hobby}}</div>
          </div>
        </div>
        <CheckboxGroup v-model="id_list">
        <div class="performer-detail-item" v-for="(data, index) in data_list">
            <div @click="show(data.title)" class="item-img">
              <div style="height: 260px;width: 183px;overflow: hidden;">
              <img style="float: right;height: 259px;" :src="seturl(data.title)" :alt="data.title">
              </div>
            </div>
            <div class="item-text">

              <!--<div class="item-text-title" v-if="data.info">{{data.info}}</div>-->
              <div class="item-text-name">{{settext(data.title)}}/{{$formatDate(data.release_time)}}</div>
              <Checkbox :label="data.id"><span></span></Checkbox>
              <Button @click="addMoviecol(data.id)" size="small">收藏</Button>
              <Button @click="setData(data.id)" size="small">设为封面</Button>
            </div>
        </div>
        </CheckboxGroup>
        <div style="position: absolute;top:16px;left: 524px;width: 110px;z-index:2000">
          <b-button size="sm" @click="delData">删除</b-button>
          <b-button size="sm" @click="changeState">更改</b-button>
        </div>

      </div>
    </div>

    <Page style="margin-bottom: 25px;" :total="total" :current="page" :page-size="page_size" :page-size-opts="[20,50,100,200,500]" @on-change="changePage" @on-page-size-change="changePagesize" show-elevator show-sizer />

  </div>
</template>

<script>
  import {getPerformerDetail, delMovie, putPerformerLogo, changeState, delPerformer, addMoviecol, addFollow} from '../api/index.js';
    export default {
      data(){
        return{
        total:0,          // 总条数
          page_size:100,      // 每页条数
          page:1,            // 当前页
          data_list: [],     // 标签列表
          base_data:[],
          loading:true,
          id_list:[],
      }
    },
      components:{
      },
      computed:{
        name() {
          return this.$route.params.bid
        }
      },
      created(){
        console.log(this.name);
        this.getData()
      },
      methods: {
        async getData() {
          this.loading = true;
          let jsonData = {
            name: this.name,
            page: this.page,
            page_size: this.page_size,
            total: this.total,
          };
          let resp = await getPerformerDetail(jsonData);
          console.log(resp);
          this.total = resp.total;
          this.base_data = resp.base_data;
          this.data_list = resp.data;
          this.loading = false;
        },

        // 删除电影
        async delData(){
          let resp = await delMovie({id_list:array(this.id_list)});
          if (resp.state === 1){
            this.$Message.success('删除成功')
          }else{
            this.$Message.warning('删除失败')
          }
          this.id_list = [];
          this.getData();
        },

        // 删除角色
        async delPerformer(){
          let resp = await delPerformer({ids: [this.base_data[0].id]});
          if(resp.state === 1){
            this.$Message.success('角色删除成功');
            this.$router.go(-1)
          }else{
            this.$Message.warning('角色删除失败')
          }
        },

        // 设置封面
        async setData(movie_id){
          let id = this.base_data[0].id;
          let resp = await putPerformerLogo({id:id,movie_id:movie_id});
          if (resp.state === 1){
            this.$Message.success('设置成功')
          }else{
            this.$Message.warning('设置失败')
          }
          this.getData();
        },

        // 更换封面
        async changeState(){
          let resp = await changeState({ids: this.ids});
          if(resp.state === 1){
            this.$Message.success('设置成功')
          }else{
            this.$Message.warning('设置失败')
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

        //关注演员
        async addFollow(id){
          let resp = await addFollow({id:id});
          if(resp.state === 0){
            this.$Message.warning('用户未登录')
          }else if(resp.state === 1){
            this.$Message.success('关注成功')
          }else{
            this.$Message.success('关注失败')
          }
        },
        // 查看电影
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

<style scoped>
  .performer-detail-item{
    margin: 10px;
    width: 191px;
    float: left;
    background-color: #fafafa;
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
  }
  .item-text{
    font-size: 14px;
    color: #000;
  }
  .item-text-title{
    height: 40px;
    overflow: hidden;
  }
  .performer-data{
    margin: 10px;
    width: 242px;
    background-color: #fafafa;
    float: left;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  .performer-data .title{
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    font-size: 15px;

  }
  .performer-info{
    text-align: left;
    padding: 0 10px 10px 10px;
    font-size: 14px;
  }
  .performer-info>div{
    margin-bottom: 5px;
  }
  .item-img{
    width: 191px;
    overflow: hidden;
    padding: 4px;
    background: #fff;
  }

</style>
