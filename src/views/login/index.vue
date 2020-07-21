<template>
    <div class="login-container">
        <el-form ref="loginForm" class="login-form"  label-width="80px" auto-complete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">
                    使用者登入
                </h3>
            </div>

            <!-- email -->
            <el-form-item style="margin-left:0px">
                <span class="svg-container">
                    <i class="el-icon-user"></i>
                </span>

                <el-input v-model="LoginInfo.email" placeholder="Enter your email"></el-input>
            </el-form-item>

            <!-- password -->
            <el-form-item>
                <span class="svg-container">
                    <i class="el-icon-lock"></i>
                </span>
                <el-input type="password" v-model="LoginInfo.password" placeholder="Enter your password"></el-input>
            </el-form-item>
            <el-button round style="width:100%">登入</el-button>
            <div class="tips" style="width:100%;text-align:center; margin-top:30px;">
                <span>Create an account</span>
            </div>
        </el-form>
    </div>
</template>


<script>
export default {
    data:function(){
        return {
            LoginInfo:{
                email:"",
                password:""
            }
        }
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
    background: rgba(0, 0, 0, 0.1);
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
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
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
      font-size: 26px;
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