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

    // 类别
    {path:'/genre/:bid', component:()=>import('../components/Genre.vue')},
    {path:'/genre/:bid/:page', component:()=>import('../components/Genre.vue')},

    {path:'/series/:bid', component:()=>import('../components/Series.vue')},
    {path:'/series/:bid/:page', component:()=>import('../components/Series.vue')},

    {path:'/vender/:bid', component:()=>import('../components/Vender.vue')},
    {path:'/vender/:bid/:page', component:()=>import('../components/Vender.vue')},

    {path:'/studio/:bid', component:()=>import('../components/Studio.vue')},
    {path:'/studio/:bid/:page', component:()=>import('../components/Studio.vue')},

    {path:'/director/:bid', component:()=>import('../components/Director.vue')},
    {path:'/director/:bid/:page', component:()=>import('../components/Director.vue')},

    // 收藏
    {path:'/moviecol', component:()=>import('../components/Moviecol.vue')},
    {path:'/moviecol/page/:bid', component:()=>import('../components/Moviecol.vue')},

    // 关注
    {path:'/follow', component:()=>import('../components/Follow.vue')},
    {path:'/follow/page/:bid', component:()=>import('../components/Follow.vue')},

    // 注册
    {path:'/register', component:()=> import('../components/Register.vue')},
    {path:'/recyle', component:()=> import('../components/Recyle.vue')},
    {path:'/recyle/page/:bid', component:()=>import('../components/Recyle.vue')},
    // {path:'/index', component:()=>import('../components/Index.vue')},
    {path:'/:bid', component:()=>import('../components/IndexDetail.vue')},
  ]
})
