<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="LoginInfo" :rules="LoginRules" class="login-form"  label-width="80px" auto-complete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">
                    失智長輩追蹤與協尋關懷系統
                </h3>
            </div>
            <div class="test">
              <!-- email -->
              <el-form-item  prop="email">
                  <span class="svg-container">
                      <i class="el-icon-user"></i>
                  </span>

                  <el-input v-model="LoginInfo.email" placeholder="請輸入您的信箱"></el-input>
              </el-form-item>

              <!-- password -->
              <el-form-item prop="password">
                  <span class="svg-container">
                      <i class="el-icon-lock"></i>
                  </span>
                  <el-input type="password" v-model="LoginInfo.password" placeholder="請輸入您的密碼"></el-input>
              </el-form-item>
              <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="HandleLogin" style="width:100%; margin-top:20px;background-color:#337ab7;color:white;font-size:16px;">登入</el-button>
              <div class="tips" style="width:100%;text-align:center; margin-top:30px; font-size:16px;">
                  <router-link to="register">註冊帳號</router-link>
              </div>
            </div>
        </el-form>
    </div>
</template>


<script>

import {UserLogin} from '@/apis/user'
import {SetCookie} from '@/utils/auth'
export default {
  data:function(){
    const ValidEmail = (rule,value,callback)=>{
      callback()
    }
    const ValidPassword = (rule,value,callback)=>{
      if(value.length<6){
        callback(new Error('密碼長度必須大於6個字元'))
      }
      else{
        callback()
      }
    }
    return {
      LoginInfo:{
        email:"",
        password:""
      },
      LoginRules:{
        email:[{validator:ValidEmail}],
        password:[{validator:ValidPassword}]
      },
      fullscreenLoading:false
    }
  },
  methods:{
    HandleLogin:function(){
      this.fullscreenLoading = true

      let form_data = new FormData()
      form_data.append("email",this.LoginInfo.email)
      form_data.append("password",this.LoginInfo.password)


      UserLogin(form_data).then(res=>{
        console.log('login response')
        console.log(res)

        SetCookie('login-status')

        this.$message('登入成功!')
        this.fullscreenLoading = false
        this.$router.push('/home/index')
      }).catch(err=>{
        console.log('login error catch ')
        console.log(err.response)
        this.$message("登入失敗!")
        this.fullscreenLoading = false
      })
    
      

    }
  },
  created(){
    //let timestamp = 1599711039
    //let data = new Date(timestamp*1000)
    //let data2 = new Date()

    
  }
}
</script>

<style lang="scss">


$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background: url('../../assets/yuntech3.jpg') #132533  no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;

  background-size: cover;
  height: 100vh;

  .el-input {
    
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    color: #454545;
  
  }
  .el-form-item__content{
    margin-left:0px !important;
    
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:white;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  font-size: 16px;
  .login-form {
    position: relative;
    width: 800px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  
  }

  .tips {
    font-size: 16px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 36px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
<style>
  .test{
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
 
    padding: 5% 5% 10%;
  }
</style>