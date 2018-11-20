<template>
  <div class="main">
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="index-body">
      <div style="
    text-align: center;
    margin: auto;">
        <CheckboxGroup v-model="id_list">
        <div class="performer-item" v-for="(data, index) in data_list">
            <div style="padding:8px;background-color: #fff;" @click="show(data.name)">
              <div class="performer-item-img">
              <img :src="server_ip + '/image/performer/' + data.name + '.jpg?' + Math.random()" :alt="data.name">
              </div>
            </div>
            <div class="performer-item-text">
              <div class="performer-text-title">
                <Checkbox v-if="username==='xiaoxin'" :label="data.id"><span style="margin: 0;padding: 0;"></span></Checkbox>
                {{data.name}}
                <Button @click="addFollow(data.id)" size="small">关注</Button>
              </div>
            </div>
        </div>
        </CheckboxGroup>
      </div>

      <div v-if="username==='xiaoxin'" style="position: fixed;top:5px;left: 524px;width: 120px;z-index:2000">
        <b-button size="sm"  @click="delData">删除</b-button>
        <b-button size="sm"  @click="selectAll">全选</b-button>
      </div>
    </div>
    <Page :total="total" :current="get_page" :page-size="page_size" :page-size-opts="[30,60,120,240,480]" @on-change="changePage" @on-page-size-change="changePagesize" show-total show-elevator show-sizer />

  </div>
</template>

<script>
  import {getPerformer,delPerformer, addFollow} from '../api/index.js';
  import {getCookie} from "../assets/js/cookie";
    export default {
      data(){
        return{
        total:0,          // 总条数
          page_size:30,      // 每页条数
          page:1,            // 当前页
          data_list: [],     // 标签列表
          loading:true,
          id_list:[],
          username: getCookie('username')
      }
    },
      components:{
      },
      computed:{
        // 获取当前页数
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
          this.loading = true;
          let jsonData = {
            page: this.get_page,
            page_size: this.page_size,
            total: this.total,
          };
          let resp = await getPerformer(jsonData);
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

        // 删除数据
        async delData(){
          console.log(this.id_list);
          let len = this.id_list.length;
          if (len === 0){this.$Message.warning('Please select performer.');return}
          let resp = await delPerformer({id_list:Array(this.id_list), username: this.username});
          if (resp.state === 1){
            this.total -= len;
            this.$Message.success('演员删除成功')
          }else{
            this.$Message.warning('演员删除失败')
          }
          this.id_list = [];
          this.getData();
        },
        //关注演员
        async addFollow(id){
          let resp = await addFollow({id:id, username: this.username});
          if(resp.state === 0){
            this.$Message.warning('用户未登录')
          }else if(resp.state === 1){
            this.$Message.success('关注成功')
          }else{
            this.$Message.success('关注失败')
          }
        },

        // 全选
        selectAll(){
          if(this.id_list.length === this.data_list.length){
            this.id_list = []
          }else{
            this.id_list = this.data_list.map(item=>item.id);
          }
        },


        changePage(index){
          this.$router.push(`/performer/page/${index}`)
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

<style scoped>
  .performer-item{
    background-color: #fafafa;
    display: inline-block;
    margin: 5px;
    width: 244px;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
  }
  .performer-item-text{
    font-size: 14px;
    color: #000;
  }
  .performer-text-title{
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }
  .performer-item-img{
    width: 227px;
    height: 324px;
    overflow: hidden;
  }
  .performer-item-img>img{
    height: 324px;
    float: right;
  }
  .performer-item-img:hover{
    cursor: pointer;
  }

  @media screen and (max-width:500px){
    .index-body>div{
      width: 100%;
    }
    .performer-item{
      width: 49%;
      margin: 0.5%;
    }
    .performer-item-img{
      width: auto;
      height: auto;
    }
    .performer-item-img>img{
      height: 267px;
    }
    .performer-item-text{
      font-size: 12px;
    }
    .performer-text-title{
      height: 34px;
      line-height: 34px;
    }
  }
  /*.index-item:hover{*/
    /*width: 60%;*/
  /*}*/

</style>
