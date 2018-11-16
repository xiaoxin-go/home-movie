<template>
  <div class="main">
    <Spin size="large" fix v-if="loading"></Spin>
    <div v-show="image_detail" @click="image_detail=false" style="position:fixed;background-color:rgba(0, 0, 0, 0.5);width: 100%;height: 100%;">
      <img style="position: relative;top: 6%;" :src="image_detail" @click="image_detail=false" />
    </div>
    <div class="index-body">
      <div v-for="data in base_data" style="width: 70%;">
        <div style="text-align: left;margin: 10px 0;font-size: 20px;">{{data.title}}
        </div>
        <div class="index-detail-data clear-float">
          <div class="index-detail-data-img"><img style="width: 900px;" :src="seturl_base(data.title)" :alt="data.title"></div>
          <div class="index-detail-data-info">
            <p><b>名称：</b><span style="color: orangered;">{{title}}</span><Button @click="del(index, id)" size="small">删除</Button></p>
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
                    <img :src="'/static/image/performer/' + performer + '.jpg?' + Math.random()" style="height: 300px; float: right;" alt="">
                  </div>
                </div>
              </template>

            </p>
          </div>
        </div>
        <p style="text-align: left;margin-bottom: 5px;">磁力链接</p>
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
        <div class="clear-float">
          <p style="text-align: left;">影片图像</p>
          <div class="index-detail-item" v-for="data in data_list">
            <div>
              <img style="width: 100%;" :src="seturl(data.url)" @click="show_image(seturl(data.url))" :alt="data.name">
            </div>
          </div>
        </div>
        <div style="margin-bottom: 40px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getMovieDetail, delMovie} from '../api/index.js';

  export default {
    data() {
      return {
        total: 0,          // 总条数
        page_size: 10,      // 每页条数
        page: 1,            // 当前页
        keyword: null,
        base_data: null,
        data_list: [],     // 标签列表
        link_title: [{width: '60%', label: '名称'}, {width: '20%', label: '大小'}, {width: '20%', label: '分享日期'}],
        links: [],
		    image_detail: null,
        loading:true,
        show_performer:null,
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
        let jsonData = {
          title: this.title
        };
        let resp = await getMovieDetail(jsonData);
        console.log(resp);
        this.base_data = resp.base_data;
        this.data_list = resp.data;
        this.links = resp.links;
        this.loading = false;
      },
	  
	  show_image(image_url){
		  this.image_detail = image_url
	  },
      showPerformer(){
        alert('...');
        this.show_performer = true;
      },

      //删除单个数据
      async del(index, id){
        let resp = await delMovie({id:id});
        if(resp.state===1){
          this.$Message.success('删除成功');
          this.$router.go(-1);
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
      seturl_base(title) {
        title = title.split(' ')[0];
        return '/static/image/movie/' + title + '/' + title + '.jpg'
      },
	    // 解析标签
      seturl(title) {
        let titles = title.split('/');
        return '/static/image/movie/' + this.title + '/' + titles[titles.length - 1].split('.')[0] + '.jpg'
      },
    }
  }
</script>

<style>
  .index-body {
    height: 80%;
    width: 100%;
    overflow-y: auto;
    font-family: "Helvetica Neue", Helvetica, Arial, STHeiti-Light, STHeiti-Medium, "Microsoft YaHei", "Microsoft JhengHei", STHeiti, MingLiu;
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
    /*width: 73%;*/
  }

  .index-detail-data-info {
    float: left;
    width: 260px;
    padding: 15px;
    font-size: 14px;
    text-align:left
  }
  .index-detail-data-info p{
    line-height: 25px;
  }
  .index-detail-data-info .tag{
    margin-right: 10px;
  }

  .index-detail-item {
    float: left;
    margin: 3px;
    width: 262.1px;
    padding: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    background: #fff;
  }

  .index-detail-item > div {
    height: 168px;
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


  /*.index-item:hover{*/
  /*width: 60%;*/
  /*}*/

</style>
