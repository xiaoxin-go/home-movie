<template>
  <div class="main">
    <Nav></Nav>
    <div class="index-body">
      <div class="clear-float">
        <div class="performer-data" v-for="data in base_data">
          <div style="padding:8px;background-color: #fff;">
            <div class="performer-item-img" style="overflow: hidden;">
            <img style="height: 324px;float: right;" :src="'/static/image/performer/' + data.name + '.jpg'" :alt="data.name">
          </div>
          </div>

          <div class="performer-item-text">
            <div class="title">{{data.name}}</div>
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
        <div class="performer-detail-item" v-for="(data, index) in data_list">
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

      </div>
      <b-pagination  size="md" align="center" @change="changePage" :total-rows="total"  v-model="page"  :per-page="page_size" ></b-pagination >
    </div>
  </div>
</template>

<script>
  import Nav from '../base/Nav.vue'
  import {getPerformerDetail} from '../api/index.js';
    export default {
      data(){
        return{
        total:0,          // 总条数
          page_size:20,      // 每页条数
          page:1,            // 当前页
          data_list: [],     // 标签列表
          base_data:[],
      }
    },
      components:{
        Nav
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
          let jsonData = {
            name: this.name,
            page: this.page,
            page_size: this.page_size,
          };
          let resp = await getPerformerDetail(jsonData);
          console.log(resp);
          this.total = resp.total;
          this.base_data = resp.base_data;
          this.data_list = resp.data;
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
  .performer-detail-item{
    margin: 10px;
    width: 20%;
    float: left;
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
    width: 20%;
    background-color: #fafafa;
    float: left;
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
  /*.index-item:hover{*/
    /*width: 60%;*/
  /*}*/

</style>
