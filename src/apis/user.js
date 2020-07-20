import request from '../utils/request'

const base_url = process.env.VUE_APP_BASE_URL
export function UserLogin(data){
    let config = {
        url:base_url+'/user/login',
        method:'POST',
        data
    }
    console.log('data',data)
    return request(config)
}