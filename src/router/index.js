import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {path:'/', component:()=>import('../components/Index.vue')},
    {path:'/search/:bid', component:()=>import('../components/Search.vue')},
    {path:'/performer', component:()=>import('../components/Performer.vue')},
    {path:'/performer/:bid', component:()=>import('../components/PerformerDetail.vue')},
    {path:'/genre/:bid', component:()=>import('../components/Genre.vue')},
    // {path:'/index', component:()=>import('../components/Index.vue')},
    {path:'/:bid', component:()=>import('../components/IndexDetail.vue')},
  ]
})
