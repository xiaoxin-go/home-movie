import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    // 首页
    {path:'/', component:()=>import('../components/Index.vue')},
    {path:'/page/:bid', component:()=>import('../components/Index.vue')},

    // 搜索
    {path:'/search/:bid', component:()=>import('../components/Search.vue')},

    // 角色
    {path:'/performer', component:()=>import('../components/Performer.vue')},
    {path:'/performer/page/:bid', component:()=>import('../components/Performer.vue')},
    {path:'/performer/:bid', component:()=>import('../components/PerformerDetail.vue')},

    // 系列
    {path:'/genre/:bid', component:()=>import('../components/Genre.vue')},

    // 收藏
    {path:'/moviecol', component:()=>import('../components/Moviecol.vue')},
    {path:'/moviecol/page/:bid', component:()=>import('../components/Moviecol.vue')},

    // 关注
    {path:'/follow', component:()=>import('../components/Follow.vue')},
    {path:'/follow/page/:bid', component:()=>import('../components/Follow.vue')},

    // {path:'/index', component:()=>import('../components/Index.vue')},
    {path:'/:bid', component:()=>import('../components/IndexDetail.vue')},
  ]
})
