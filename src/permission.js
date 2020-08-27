import router from './router'
//import store from './store'
//import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({showSpinner:false})
import axios from 'axios'
//const whiteList = ['/login','/register'] 

/* 
    router beforeeach，簡單講就是導航守衛，可以用來
    做一些保護，例如未拿到驗證token，就不能往下
*/

router.beforeEach(async(to,from,next)=>{
    /*
        每次要切換route的時候，先去取得token 
        然後nprogress開始跑
        若你沒有token，就把你push到/login這個route 
    */

    NProgress.start()
 
    //const token = getToken()
    console.log('to: '+to.path)
    console.log('from: '+from.path)
    axios.get('/api/v1/resources/users/me').then((res)=>{
        console.log(res)
        next()
    }).catch(err=>{
        console.log('enter catch')
        console.log(err)
        if(to.path!=='/login'){
            next('/login')
        }
        else{
            next()
        }
    })

})

router.afterEach(()=>{
    //到了目的地後，nprogess結束
    NProgress.done()
})