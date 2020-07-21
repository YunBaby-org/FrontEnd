import request from '../utils/request'

const base_url = process.env.VUE_APP_BASE_URL
export function UserLogin(data){
    let config = {
        url:base_url+'/user/login',
        method:'POST',
        data
    }
    //axios instance看到這個config裡面的method，就會自動發出POST
    console.log('data',data)
    return request(config)
}
export function GetUserInfo(token){
    console.log("api = "+token)
    let config = {
        url:base_url+'/user/info',
        method:'GET',
        params:{
            "token":token,
            "name":"eric",
            "age":18
        }
    }
    return request(config)
}