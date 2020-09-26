<template>
    <el-card style="width:100%" shadow="hover"> 
        <div slot="header" class="clearfix">
            <span>使用者資訊</span>
        </div>
        <div>
          <center>
            <el-image style="width: 250px; height:250px" :src="ImageURL" fit="cover"></el-image>
          </center>
        </div>
        <div class="userinfo">
          <div class="userinfo-header">
            <i class="el-icon-user"></i><span>個人資料</span>
          </div>
          <div class="userinfo-content">
            <div class="userinfo-content-item">
              <el-row :gutter="10" type="flex">
                <el-col :span="8"><div style="width:100%;font-weight: bold;"><i class="el-icon-phone-outline"></i>姓名:</div></el-col>
                <el-col :span="16"><div style="width:100%">{{current_user.name}}</div></el-col>    
              </el-row>
            </div>

             <div class="userinfo-content-item">
              <el-row :gutter="10" type="flex">
                <el-col :span="8"><div style="width:100%;font-weight: bold;"><i class="el-icon-phone-outline"></i>手機號碼:</div></el-col>
                <el-col :span="16"><div style="width:100%">{{current_user.phone}}</div></el-col>    
              </el-row>
            </div>

            <div class="userinfo-content-item">
              <el-row :gutter="10" type="flex">
                <el-col :span="8"><div style="width:100%;font-weight: bold;"><i class="el-icon-phone-outline"></i>電子信箱:</div></el-col>
                <el-col :span="16"><div style="width:100%">{{current_user.email}}</div></el-col>    
              </el-row>
            </div>          

          </div>
        </div>

    </el-card>
</template>
<script>
import {GetUserInfo} from '@/apis/user.js'
export default {
    data:function(){
      return {
        ImageURL:"https://i.imgur.com/7ZGZwX9.jpeg",
        current_user:{"name":"","phone":"","email":""}
      }
    },
    created(){
      GetUserInfo().then(res=>{
        let info = res.data.data 
        this.current_user.name = info.username
        this.current_user.phone = info.phone 
        this.current_user.email = info.email 
      }).catch(err=>{
        console.log("GET USERINFO ERROR")
        console.log(err)
        this.$message("取得使用者資訊錯誤")
      })
    }
}
</script>
<style lang="scss">
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

  .box-card {
    width: 480px;
  }
  .el-card__header{
      background-color: #2286c3;
      color: white;
  }
  .el-card__body{
      background:whitesmoke;
  }
  .userinfo{
    span{
      padding-left: 4px;
    }
    color: #606266;
    margin-top: 10px;
    .userinfo-header{
      font-weight: bold;
      border-bottom: 1px solid #dfe6ec;
      font-size: 20px;
      padding-bottom: 5px;
      margin-bottom: 5px;
    }
    .userinfo-content{
      margin-top: 15px;
      .userinfo-content-item{
        margin-bottom: 10px;
      }
    }
  }
</style>