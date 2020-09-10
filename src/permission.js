import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {GetLoginStatus} from '@/utils/auth'
NProgress.configure({showSpinner:false})


/* 
    router beforeeach，簡單講就是導航守衛，可以用來
    做一些保護，例如未拿到驗證token，就不能往下
*/

router.beforeEach(async(to,from,next)=>{

    NProgress.start()
 
    console.log('to: '+to.path)
    console.log('from: '+from.path)
    if(GetLoginStatus()){
        next()
    }
    else{
        console.log('please login first')
        if(to.path!=='/login'){
            next('/login')
        }
        else{
            next()
        }
        
    }


})

router.afterEach(()=>{
    //進度條
    
    NProgress.done()
})