import request from '../utils/request'

const base_url = process.env.VUE_APP_BASE_URL
export function UserLogin(data){
    let config = {
        url:base_url+':5001/auth/login',
        method:'POST',
        data
    }
    //axios instance看到這個config裡面的method，就會自動發出POST
    console.log('data',data)
    return request(config)
    //接收這個參數後 可以使用.then()
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

export function TestGCP(){
    let config = {
        url:'https://b10617046.nctu.me/hello',
        method:'POST',
    }
    //axios instance看到這個config裡面的method，就會自動發出POST
    return request(config)
}