<template>
    <div class="login">
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-card shadow='always'>
                    <h2>Login Page</h2>
                    <el-form v-on:submit.native="onSubmit">
                        <el-form-item>
                            <el-input prefix-icon="el-icon-user" v-model="account" placeholder="請輸入帳號"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input prefix-icon="el-icon-lock" v-model="password" placeholder="請輸入密碼" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button native-type="submit" type="primary" v-bind:loading="loading">login</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name:"Login",
    methods:{
        onSubmit:function(){
            window.alert('submit')
            this.loading = true
        }
    },
    props:['record']
    ,
    data:function(){
        return {
            account:"",
            password:"",
            logosrc:"",
            loading:false
        }
    },
    components:{

    }
}
</script>
<style scoped>
    h2{
        padding-bottom: 50px;
        font-size: 50px;
    }
</style>
<style>
    .login .el-input__inner:hover{
        border-color:black;
    }
    .login .el-card{
        justify-content: center;/* 居中排列 */
        display: flex;

    }
    .login .el-input input {
        padding-left: 40px;
    }
    .login img{
        padding: 50px;
    }
    .login .el-card{
        background: #006666;
    }
    .login .el-button{
        width:100%;
    }
</style>
