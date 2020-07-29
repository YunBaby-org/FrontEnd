import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' 
import * as VueGoogleMaps from 'vue2-google-maps'
//import './permission.js'




Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAzCmhQf0yflZJWG3FbMbv0gwjop0qBVrE',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

