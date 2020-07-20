import axios from 'axios'
import {Message} from 'element-ui'

/*
    create error handler 
*/
const ErrorHandler = (msg)=>{
    
    Message.error('Error Handler: '+msg)
    
}
/*
    create axios instance 
*/

/* declare const */
const axios_instance = axios.create({
    baseURL:process.env.BASE_API_URL,
    timeout:5000
})

/*
    set request interceptors 
    簡單來說就是送到http request前會先來這邊
    可以再這邊做一些加上token的動作
*/

axios_instance.interceptors.request.use((config)=>{
    // do something before request is sent
    return config 
},(error)=>{
    console.log("ERRROR in request interceptors")
    return Promise.reject(error)
})

/*
    set response interceptores 
    簡單來說就是收到http response後會先來這邊，再到使用者那邊
*/
axios_instance.interceptors.response.use((response)=>{
    return response
},(error)=>{
    console.log("ERRROR in response interceptors")
    ErrorHandler("errrrrrror")
    return new Promise.reject(error)
})

export default axios_instance