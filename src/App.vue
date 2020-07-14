<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>


export default {
  components: {
  },
  data:function(){
    return{
      record:['eric','peggy','jack'],
      isAdmin:false
    }
  }
}
</script>
<style>
html,body,#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  height: 100%;
  margin-bottom: 10dp;
  overflow: hidden;

}
body { margin: 0; }


body{
  background-color: #FFFFFF;
}
</style>
