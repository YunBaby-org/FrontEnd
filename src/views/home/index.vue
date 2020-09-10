<template>
    <div class="app-container">
        <h1>this is home page </h1>
        <el-button @click="protect">protect value</el-button>
    </div>
</template>
<script>

import {GetUserProtect} from '@/apis/user'
export default {
  methods:{
    protect:function(){
      GetUserProtect().then(res=>{
        window.alert(res.data)
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  
  }    
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card{
    background: red;
    width: 80%;
  }

</style>