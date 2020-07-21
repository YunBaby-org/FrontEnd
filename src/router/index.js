import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import Home from '../views/Home.vue'
import Layout from '../layout/index.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name:'/',
    component:Layout,
    

  },
  {
    path:'/setting',
    name:"Setting",
    component:()=>import('@/menu/setting.vue')
  },
  {
    path:'/home',
    name:'Home',
    component:Home,
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('@/views/login/index.vue')
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import('@/views/register/index.vue')
  },
  {
    path:'/admin',
    name:'Admin',
    component:Admin
  }
  ,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  
  base: process.env.BASE_URL,
  routes
})

export default router
