<template>
  <div id="app">
    <Header></Header>
    <div class='main_container'>
      <router-view />
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
import Header from './components/header/index.vue'
import Footer from './components/footer/index.vue'

export default {
  components: {
    Header,Footer
  },
  data:function(){
    return{
      record:['eric','peggy','jack']
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body { margin: 0; }
.main_container{
  min-height: calc(100vh - 200px);
  
  padding-top: 100px;
}
Footer{
  color:red;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body{
  background-color: #FFFFFF;
}
</style>
