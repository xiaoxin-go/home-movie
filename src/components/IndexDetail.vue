<template>
  <div class="main">
    <Spin size="large" fix v-if="loading"></Spin>
    <div v-show="image_detail" @click="image_detail=false" class="image-detail">
      <img style="position: relative;" :src="image_detail" @click="image_detail=false" />
    </div>
    <div class="index-body">
      <div class="index-body-info" v-for="data in base_data">
        <div class="index-title">{{data.title + ' ' + data.info}}
        </div>
        <div v-if="data.video" style="padding: 8px; background: #fff;margin-bottom: 15px;">
          <video-player class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true" :options="playerOptions">
          </video-player>
        </div>
        <div class="index-detail-data clear-float">
          <div class="index-detail-data-img"><img :src="seturl_base()" :alt="data.title"></div>
          <div class="index-detail-data-info">
            <p><b>名称：</b><span style="color: orangered;margin-right: 10px;">{{title}}</span>
              <Button @click="del(data.id, null)" v-if="username==='xiaoxin'" size="small">删除</Button>
              <Button @click="addMoviecol(data.id)" size="small">收藏</Button>
            </p>
            <p><b>发行日期：</b><span>{{ $formatDate(data.release_time)}}</span></p>
            <p><b>长度：</b><span>{{data.length}}</span></p>
            <p v-if="data.director"><b>导演：</b><span class="tag" @click="$router.push(`/genre/${data.director}`)">{{data.director}}</span></p>
            <p v-if="data.vender"><b>制作商：</b><span class="tag" @click="$router.push(`/vender/${data.vender}`)">{{data.vender}}</span></p>
            <p v-if="data.studio"><b>发行商：</b><span class="tag" @click="$router.push(`/studio/${data.studio}`)">{{data.studio}}</span></p>
            <p v-if="data.series"><b>系列：</b><span class="tag" @click="$router.push(`/series/${data.series}`)">{{data.series}}</span></p>
            <p><b>类别：</b>
            </p>
            <p>
              <template v-for="tag in setgenre(data.genre)">
                <span class="tag" style="margin-right: 10px;"
                                                                  @click="go_genre(tag)">{{tag}}</span>
              </template>
            </p>
            <p><b>演员：</b></p>
            <p>
              <template v-for="performer in setgenre(data.performer)">
                <span class="tag" style="margin-right: 10px;" @click="go_performer(performer)" @mouseenter="show_performer=performer" @mouseleave="show_performer=null">{{performer}}</span>
                <div style="position: absolute; padding: 5px; background-color:#ccc; border-radius:5px" v-if="show_performer===performer">
                  <div style="width: 212px; overflow: hidden;">
                    <img :src="$global.server_ip + '/image/performer/' + performer + '.jpg?' + Math.random()" style="height: 300px; float: right;" alt="">
                  </div>
                </div>
              </template>

            </p>
          </div>
        </div>

        <!--磁力部分-->
        <p class="class-title">磁力链接</p>
        <table class="link-table">
          <tr>
            <template v-for="data in link_title">
              <th :style="'width:' + data.width">
                {{data.label}}
              </th>
            </template>
          </tr>
          <template v-for="value in links">
            <tr>
              <td>
                <a :href="value.url">
                  {{value.name}}</a>
              </td>
              <td>
                <a :href="value.url">{{value.size}}</a>
              </td>
              <td>
                <a :href="value.url">{{$formatDate(value.share_date)}}</a>
              </td>
            </tr>
          </template>
        </table>

        <!--电影截图部分-->
        <div class="clear-float">
          <p class="class-title">影片图像</p>
          <div class="index-detail-item" v-for="data in data_list">
            <div>
              <img style="width: 100%;" :src="seturl(data.url)" @click="show_image(seturl(data.url))" :alt="data.name">
            </div>
          </div>
        </div>

        <!--同类影片部分-->
        <div class="clear-float">
          <p class="class-title">同类影片</p>
          <div class="performer-detail-item" v-for="(data,index) in other_data">
            <div @click="show(data.title)" class="other-item-img">
              <div style="overflow: hidden;">
                <img :src="seturl_genre(data.title)" :alt="data.title">
              </div>
            </div>
            <div class="item-text">
              <div class="item-text-title" v-if="data.info">{{data.info}}</div>
              <div class="item-text-name">{{data.title}}/{{$formatDate(data.release_time)}}
                <Button @click="addMoviecol(data.id)" size="small">收藏</Button>
                <Button v-if="username==='xiaoxin'" @click="del(data.id,index)" size="small">删除</Button>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 40px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getMovieDetail, delMovie, addMoviecol} from '../api/index.js';
  import {getCookie} from "../assets/js/cookie";

  export default {
    data() {
      return {
        total: 0,          // 总条数
        page_size: 10,      // 每页条数
        page: 1,            // 当前页
        keyword: null,
        base_data: null,
        data_list: [],     // 标签列表
        other_data:[],    // 同类影片
        link_title: [{width: '60%', label: '名称'}, {width: '20%', label: '大小'}, {width: '20%', label: '分享日期'}],
        links: [],
		    image_detail: null,
        loading:true,
        show_performer:null,
        playerOptions:{},
        username: getCookie('username')
      }
    },
    computed: {
      title() {
        return this.$route.params.bid
      }
    },
    components: {
    },
    created() {
      console.log('name:', this.title);
      this.getData();
    },
    methods: {
      async getData() {
        this.loading = true;
        let jsonData = {
          title: this.title
        };
        let resp = await getMovieDetail(jsonData);
        console.log(resp);
        this.base_data = resp.base_data;
        this.data_list = resp.data;
        this.other_data = resp.other_data;
        this.links = resp.links;
        this.loading = false;
        this.playerOptions = {
          autoplay: false,
          muted: true,
          loop: false,
          preload: 'auto',
          language: 'zh-CN',
          aspectRatio: '16:9',
          fluid: true,
          poster: this.seturl_base(),
          width:document.documentElement.clientWidth,
          sources:[{
            type:'video/mp4',
            src:this.setvideo()
          }]
        }
      },
	  
	  show_image(image_url){
		  this.image_detail = image_url
	  },
      showPerformer(){
        alert('...');
        this.show_performer = true;
      },

      // 查看电影
      show(title){
        let name = title.split(' ')[0];
        this.$router.push({path:`/${name}`})
      },

      setvideo(){
        return this.$global.server_ip +  '/video/' + this.base_data[0].video
      },

      // 添加收藏
      async addMoviecol(id){
        let resp = await addMoviecol({id:id, username: this.username});
        if(resp.state === 0){
          this.$Message.warning('用户未登录')
        }else if(resp.state === 1){
          this.$Message.success('收藏成功')
        }else{
          this.$Message.success('收藏失败')
        }
      },
      //删除单个数据
      async del(id,index){
        let json_data = {
          id:id,
          username: this.username
        };
        console.log(json_data);
        let resp = await delMovie(json_data);
        if(resp.state===1){
          this.$Message.success('删除成功');
          console.log(index);
          if(index){
            this.data_list.splice(index,1);
          }else{
            console.log('...');
            this.$router.go(-1)
          }
        }else{
          this.$Message.warning('删除失败')
        }
      },

	  // 解析标签
      setgenre(genre){
        if(genre){
          genre = genre.split(',');
        }
        return genre;
      },
	  
      // 跳转演员详情页
      go_performer(name) {
        this.$router.push(`/performer/${name}`)
      },
	  // 跳转标签页
      go_genre(genre) {
        this.$router.push(`/genre/${genre}`)
      },
	    // 解析主标签
      seturl_base() {
        let title = this.title.split(' ')[0];
        return this.$global.server_ip + '/image/movie/' + title + '.jpg'
      },
	    // 解析标签
      seturl(title) {
        let titles = title.split('/');
        return this.$global.server_ip + '/image/movie/' + titles[titles.length - 1].split('.')[0] + '.jpg?' + Math.random();
      },

      seturl_genre(title) {
        let titles = title.split('/');
        title = titles[titles.length - 1].split('.')[0];
        return this.$global.server_ip + '/image/movie/' + title + '.jpg?' + Math.random();
      },
    },
    watch:{
      "$route":function(){
        this.getData();
      }
    }
  }
</script>

<style scoped>
  .index-body {
    height: 80%;
    width: 100%;
    overflow-y: auto;
    font-family: "Helvetica Neue", Helvetica, Arial, STHeiti-Light, STHeiti-Medium, "Microsoft YaHei", "Microsoft JhengHei", STHeiti, MingLiu;
  }
  .index-title{
    text-align: left;
    margin: 10px 0;
    font-size: 24px;
  }
  .image-detail{
    position:fixed;
    background-color:rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    padding-top: 10px;
  }
  .index-body>div{
    width: 70%;
  }
  .performer-detail-item{
    margin: 0.2%;
    width: 16.2%;
    min-width: 190px;
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

  .class-title{
    text-align: left;
    font-size: 16px;
    margin:20px 0 10px 5px
  }

  .clear-float:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }

  .clear-float {
    zoom: 1
  }

  .index-detail-data {
    padding: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    margin-bottom: 15px;
    background-color: #fff;
  }

  .index-detail-data-img {
    float: left;
    padding-right: 15px;
    border-right: 1px solid #f0f0f0;
    width: 69%;
  }
  .index-detail-data-info {
    float: left;
    padding: 15px;
    font-size: 13px;
    text-align:left;
    width: 31%;
  }
  .index-detail-data-info p{
    height: 30px;
    line-height: 30px;
  }
  .index-detail-data-info .tag{
    margin-right: 10px;
  }

  .index-detail-item {
    float: left;
    margin: 0.2%;
    width: 19.5%;
    min-width: 200px;
    padding: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    background: #fff;
  }

  .index-detail-item > div {
    height: 149px;
    overflow: hidden;
  }

  .tag:hover {
    cursor: pointer;
  }
  .link-table{
    padding: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    background-color: #fff;
    width: 100%;
    font-size: 14px;
    text-align: left;
    margin-bottom: 10px;
  }
  .link-table tr,.link-table td{
    border-top: 1px solid #f0f0f0;
  }
  .link-table td,.link-table th{
    padding: 8px;
  }
  .link-table th{
    background-color: #f5f5f5;
  }
  .link-table a{
    color: #000;
    text-decoration: none;
  }
  .link-table tr:hover{
    background-color:#f5f6f7;
  }
  .other-item-img{
    width: 100%;
    padding: 4px;
    background: #fff;
  }
  .other-item-img:hover{
    cursor: pointer;
  }
  .other-item-img > div{
    width: 100%;
    overflow: hidden;
  }
  .other-item-img > div > img{
    float: right;
    height: 293px;
  }

  @media screen and (max-width: 500px){
    .index-title{
      text-align: left;
      margin: 5px 0;
      font-size: 14px;
    }
    .index-body>div{
      width: 96%;
    }
    .index-body-info{
      width: 100%;
    }
    .index-detail-data-info{
      width: 100%;
      font-size: 12px;
    }
    .index-detail-data-info p{
      height: 25px;
      line-height: 25px;
    }
    .class-title{
      font-size: 14px;
      margin:15px 0 3px 5px
    }
    .link-table{
      font-size: 12px;
    }
    .index-detail-data-img>img{
      width: 100%;
    }
    .index-detail-data-img{
      width: 100%;
      padding: 0;
      border: none;
    }
    .index-detail-item{
      width: 49%;
      margin: 0.5%;
      min-width: auto;
    }
    .index-detail-item > div{
      height: auto;
    }
    .performer-detail-item{
      width: 49%;
      margin: 0.2%;
      min-width: auto;
    }
    .item-text-title{
      height: 36px;
      font-size: 12px;
    }
    .image-detail{
      overflow: auto;
    }
    .image-detail>img{
      height: 90%;
    }
    .other-item-img > div > img{
      height: 265px;
    }
  }
  @media screen and (max-width:375px){
    .other-item-img > div > img{
      height: 224px;
    }
  }

  /*.index-item:hover{*/
  /*width: 60%;*/
  /*}*/

</style>
