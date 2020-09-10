import request from '../utils/request'


//const base_url = process.env.VUE_APP_BASE_URL
export function UserLogin(data){
    //let form_data = new FormData()

    let config = {
        url:'/api/v1/auth/login',
        method:'POST',
        data
    }
    //axios instance看到這個config裡面的method，就會自動發出POST
    
    return request(config)

}

export function UserLogout(){
    let config = {
        url:'/api/v1/auth/logout',
        method:'GET'
    }

    return request(config)
}
export function UserRegister(data){

    let config= {
        url:' /api/v1/auth/signup',
        method:'POST',
        data
    }

    return request(config)
}

export function GetUserInfo(){
    let config = {
        url:'/api/v1/resources/users/information',
        method:'GET'
    }
    return request(config)
}

export function GetUserProtect(){
    let config = {
        url:'/api/v1/auth/protect',
        method:'GET'
    }

    return request(config)
}