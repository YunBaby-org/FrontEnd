import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name:'/',
    component:Layout,
    hidden:true
    

  },
  {
    path:'/home',
    component:Layout,
    children:[
      {
        path:'index',
        name:'Home',
        component:()=>import('@/views/home/index')
      }
    ],
    meta: { title: 'Home', icon: 'el-icon-s-home' },
  },
  {
    path:'/setting',
    component:Layout,
    children:[
      {
        path:'index',
        name:"Setting",
        component:()=>import('@/views/setting/index')
      }
    ],
    meta: { title: 'Setting', icon: 'el-icon-setting' },
  },
  {
    path:'/map',
    component:Layout,
    meta:{title:'Map',icon:'el-icon-map-location'},
    children:[
      {
        path:'index',
        name:'Map',
        component:()=>import('@/views/map/index.vue')
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('@/views/login/index.vue'),
    hidden:true
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import('@/views/register/index.vue'),
    hidden:true
  }
]

const router = new VueRouter({
  
  base: process.env.BASE_URL,
  routes
})

export default router
