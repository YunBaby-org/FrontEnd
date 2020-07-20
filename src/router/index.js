import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/index.vue'
import Admin from '../views/Admin.vue'
import Home from '../views/Home.vue'
import Layout from '../layout/index.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name:'/',
    component:Layout

  },
  {
    path:'/home',
    name:'Home',
    component:Home,
    children:[
      {
        path:'',
        redirect:{
          name:'Setting'
        }
      },
      {
        path:'/setting',
        name:'Setting',
        component:()=>import('../menu/setting.vue')
      },
      {
        path:'/map',
        name:'Map',
        component:()=>import('../menu/map.vue')
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
